import { Prisma } from "../../../generated/prisma/client";
import type { PrismaClient } from "../../../generated/prisma/client";
import type { SituacaoContrato, TipoEndereco } from "../../../generated/prisma/client";

import {
  mapLegacyBoletoToStatusPagamento,
  parseSqlServerDate,
} from "./domain-mappers";
import { resolveContratoFromPlanOrChainImpl } from "./contrato-resolve-plan-chain";
import {
  normalizeCpfCnpjDigits,
  pickRow,
  str,
  toSqlServerInt,
} from "./row-utils";

/** Verdadeiro quando o erro é P2002 no campo `field` (nome da coluna DB, ex.: "numero_contrato"). */
function isP2002On(e: unknown, field: string): boolean {
  if (!(e instanceof Prisma.PrismaClientKnownRequestError) || e.code !== "P2002") return false;
  const target = e.meta?.target;
  return Array.isArray(target) ? target.includes(field) : false;
}

function stateChar2(row: Record<string, unknown>): string {
  const cleaned = str(pickRow(row, ["Uf", "UF", "Estado", "estado"]), 8)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  if (cleaned.length >= 2) return cleaned.slice(0, 2);
  if (cleaned.length === 1) return `${cleaned}X`;
  return "SP";
}

function uf2(row: Record<string, unknown>): string {
  return stateChar2(row).slice(0, 2);
}

/** CPF/CNPJ sintético quando o legado não traz documento (campo obrigatório no Postgres). */
function placeholderCpfCnpj(sqlId: number): string {
  return `9${String(sqlId).padStart(13, "0")}`.slice(0, 14);
}

function dec(v: unknown): Prisma.Decimal | null {
  if (v === null || v === undefined) return null;
  const s = str(v, 64).replace(",", ".");
  if (!s) return null;
  try {
    return new Prisma.Decimal(s);
  } catch {
    return null;
  }
}

function decRequired(v: unknown, fallback = "0"): Prisma.Decimal {
  return dec(v) ?? new Prisma.Decimal(fallback);
}

function monthlyFromGavetas(gavetas: number): Prisma.Decimal {
  return gavetas >= 6
    ? new Prisma.Decimal("360.00")
    : new Prisma.Decimal("180.00");
}

function mapSituacaoContrato(row: Record<string, unknown>): SituacaoContrato {
  const situacao = str(
    pickRow(row, ["Situacao", "situacao", "Status", "status"]),
    4,
  );
  const c = situacao.length > 0 ? situacao.slice(0, 1).toUpperCase() : "A";
  if (c === "I") return "INATIVO";
  if (c === "Q") return "QUITADO";
  return "ATIVO";
}

function mapTipoEnderecoRow(row: Record<string, unknown>): TipoEndereco {
  const t = str(
    pickRow(row, ["TipoEndereco", "tipoEndereco", "Tipo", "tipo"]),
    40,
  ).toUpperCase();
  if (t.includes("COM")) return "COMERCIAL";
  return "RESIDENCIAL";
}

function mapPhoneTipoRow(
  row: Record<string, unknown>,
): "CELULAR" | "FIXO" | "WHATSAPP" {
  const t = str(pickRow(row, ["Tipo", "tipo"]), 40).toUpperCase();
  if (t.includes("WHAT")) return "WHATSAPP";
  if (t.includes("FIX") || t.includes("FAX")) return "FIXO";
  return "CELULAR";
}

/**
 * `true` se gravou/atualizou uma linha na base.
 */
export async function upsertCustomerFromRow(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<boolean> {
  const sqlId = toSqlServerInt(pickRow(row, ["CodCessionario", "codCessionario"]));
  if (sqlId === null) return false;

  const nome =
    str(
      pickRow(row, [
        "Cessionario",
        "cessionario",
        "Nome",
        "nome",
        "RazaoSocial",
        "razaoSocial",
      ]),
      500,
    ) || "Sem nome";
  const cpf = normalizeCpfCnpjDigits(
    pickRow(row, [
      "CPF",
      "cpf",
      "CpfCnpj",
      "cpfCnpj",
      "NumCpfCnpj",
      "numCpfCnpj",
      "CpfCgc",
    ]),
  );
  const emailRaw = str(pickRow(row, ["Email", "email"]), 320);
  const email = emailRaw.length > 0 ? emailRaw : null;

  let cpfCreate: string | null = null;
  let cpfUpdate: string | null | undefined = undefined;
  if (cpf !== null) {
    const other = await prisma.customer.findFirst({
      where: { cpfCnpj: cpf },
      select: { sqlServerId: true },
    });
    if (other && other.sqlServerId !== sqlId) {
      cpfCreate = null;
      cpfUpdate = null;
    } else {
      cpfCreate = cpf;
      cpfUpdate = cpf;
    }
  }

  /**
   * `email` é `@unique`: dois CodCessionario diferentes podem repetir o mesmo email no legado.
   * O primeiro registo mantém o email; os seguintes ficam sem email (evita P2002).
   */
  let emailCreate: string | null = null;
  let emailUpdate: string | null | undefined = undefined;
  if (email !== null) {
    const owner = await prisma.customer.findFirst({
      where: { email },
      select: { sqlServerId: true },
    });
    if (owner && owner.sqlServerId !== sqlId) {
      emailCreate = null;
      emailUpdate = null;
    } else {
      emailCreate = email;
      emailUpdate = email;
    }
  } else {
    emailUpdate = undefined;
  }

  await prisma.customer.upsert({
    where: { sqlServerId: sqlId },
    create: {
      nome,
      cpfCnpj: cpfCreate ?? placeholderCpfCnpj(sqlId),
      email: emailCreate,
      sqlServerId: sqlId,
    },
    update: {
      nome,
      ...(cpfUpdate !== undefined && cpfUpdate !== null
        ? { cpfCnpj: cpfUpdate }
        : {}),
      ...(emailUpdate !== undefined ? { email: emailUpdate } : {}),
    },
  });
  return true;
}

/**
 * Resolve `Contrato` no Postgres a partir do legado: prioriza vínculo por plano
 * (`CodCessionarioPlano`), depois cadeia `Contratos` (`CodContrato`).
 */
export async function resolveContratoFromPlanOrChain(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<{ id: string; customerId: string } | null> {
  const planSqlId = toSqlServerInt(
    pickRow(row, ["CodCessionarioPlano", "codCessionarioPlano"]),
  );
  const contratoSqlId = toSqlServerInt(
    pickRow(row, ["CodContrato", "codContrato"]),
  );
  return resolveContratoFromPlanOrChainImpl(
    { planSqlId, contratoSqlId },
    (id) =>
      prisma.contrato.findUnique({
        where: { sqlServerId: id },
        select: { id: true, customerId: true },
      }),
  );
}

/**
 * `dbo.Contratos` + `Contratos_Cessionarios` (agregado) → `Contrato` com `sqlServerId = CodContrato`.
 */
export async function upsertContratoFromContratosChainRow(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<boolean> {
  const codContrato = toSqlServerInt(pickRow(row, ["CodContrato", "codContrato"]));
  const custSqlId = toSqlServerInt(
    pickRow(row, ["CodCessionario", "codCessionario"]),
  );
  if (codContrato === null || custSqlId === null) return false;

  const customer = await prisma.customer.findUnique({
    where: { sqlServerId: custSqlId },
  });
  if (!customer) return false;

  const numeroRaw = str(
    pickRow(row, [
      "NumContrato",
      "numContrato",
      "NumeroContrato",
      "numeroContrato",
    ]),
    30,
  ).trim();
  const numeroContrato =
    numeroRaw.length > 0 ? numeroRaw.slice(0, 30) : `CTR-${codContrato}`;

  const situacao = mapSituacaoContrato(row);

  try {
    await prisma.contrato.upsert({
      where: { sqlServerId: codContrato },
      create: { customerId: customer.id, numeroContrato, situacao, sqlServerId: codContrato },
      update: { situacao }, // numero_contrato imutável após criação
    });
  } catch (e) {
    if (!isP2002On(e, "numero_contrato")) throw e;
    // NumContrato duplicado no legado — usa chave sintética única pelo CodContrato
    await prisma.contrato.upsert({
      where: { sqlServerId: codContrato },
      create: { customerId: customer.id, numeroContrato: `CTR-${codContrato}`, situacao, sqlServerId: codContrato },
      update: { situacao },
    });
  }
  return true;
}

/**
 * `Cessionarios_Planos` → `Contrato` (chave `CodCessionarioPlano` como `sqlServerId`).
 */
export async function upsertContratoFromRow(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<boolean> {
  const planSqlId = toSqlServerInt(
    pickRow(row, ["CodCessionarioPlano", "codCessionarioPlano"]),
  );
  const custSqlId = toSqlServerInt(
    pickRow(row, ["CodCessionario", "codCessionario"]),
  );
  if (planSqlId === null || custSqlId === null) return false;

  const customer = await prisma.customer.findUnique({
    where: { sqlServerId: custSqlId },
  });
  if (!customer) return false;

  const numeroContrato =
    str(
      pickRow(row, [
        "NumContrato",
        "numContrato",
        "NumeroContrato",
        "numeroContrato",
        "Contrato",
        "contrato",
      ]),
      30,
    ) || `PL-${planSqlId}`;

  const situacao = mapSituacaoContrato(row);

  try {
    await prisma.contrato.upsert({
      where: { sqlServerId: planSqlId },
      create: { customerId: customer.id, numeroContrato, situacao, sqlServerId: planSqlId },
      update: { situacao },
    });
  } catch (e) {
    if (!isP2002On(e, "numero_contrato")) throw e;
    await prisma.contrato.upsert({
      where: { sqlServerId: planSqlId },
      create: { customerId: customer.id, numeroContrato: `PL-${planSqlId}`, situacao, sqlServerId: planSqlId },
      update: { situacao },
    });
  }
  return true;
}

/**
 * `Contratos_Jazigos` + `Jazigos` (+ quadra) → `Jazigo` ligado ao `Contrato`.
 * Fallback: se não existir contrato com `sqlServerId = CodContrato`, tenta `CodCessionarioPlano`
 * derivado da cadeia cessionário/plano (dados mistos legado novo/antigo).
 */
export async function upsertJazigoFromContratosJazigosRow(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<boolean> {
  const jazigoSqlId = toSqlServerInt(pickRow(row, ["CodJazigo", "codJazigo"]));
  const contratoSqlId = toSqlServerInt(pickRow(row, ["CodContrato", "codContrato"]));
  if (jazigoSqlId === null || contratoSqlId === null) return false;

  let contrato = await prisma.contrato.findUnique({
    where: { sqlServerId: contratoSqlId },
  });
  if (!contrato) {
    const planSqlId = toSqlServerInt(
      pickRow(row, ["CodCessionarioPlano", "codCessionarioPlano"]),
    );
    if (planSqlId !== null) {
      contrato = await prisma.contrato.findUnique({
        where: { sqlServerId: planSqlId },
      });
    }
  }
  if (!contrato) return false;

  const labelJazigo = str(
    pickRow(row, ["Jazigo", "jazigo", "Codigo", "codigo", "NumeroJazigo"]),
    20,
  ).trim();

  const nomeQuadra = str(
    pickRow(row, ["NomeQuadra", "nomeQuadra", "Quadra", "quadra"]),
    20,
  ).trim();
  const codQuadra = toSqlServerInt(pickRow(row, ["CodQuadra", "codQuadra"]));
  const quadra =
    nomeQuadra.length > 0
      ? nomeQuadra
      : codQuadra !== null
        ? String(codQuadra)
        : null;

  // No SQL Server, `Jazigo` (ex.: "01") repete-se entre quadras — não é globalmente único.
  // A chave natural é (CodQuadra, Jazigo). Prefixamos com a quadra para garantir unicidade
  // no campo `codigo @unique` do Postgres. Fallback para JZ-{CodJazigo} quando sem etiqueta.
  const quadraPrefix = quadra ? `${quadra.slice(0, 8)}-` : "";
  const codigo =
    labelJazigo.length > 0
      ? `${quadraPrefix}${labelJazigo}`.slice(0, 20)
      : `JZ-${jazigoSqlId}`;

  const gavetasRaw = toSqlServerInt(
    pickRow(row, [
      "QtdGavetas",
      "qtdGavetas",
      "NroGavetas",
      "nroGavetas",
      "NrGavetas",
    ]),
  );
  const quantidadeGavetas = gavetasRaw !== null && gavetasRaw > 0 ? gavetasRaw : 3;
  const valorMensalidade = monthlyFromGavetas(quantidadeGavetas);

  const setor = str(pickRow(row, ["Setor", "setor"]), 20) || null;

  try {
    await prisma.jazigo.upsert({
      where: { sqlServerId: jazigoSqlId },
      create: { sqlServerId: jazigoSqlId, codigo, quadra, setor, quantidadeGavetas, valorMensalidade, contratoId: contrato.id },
      update: { quadra, setor, quantidadeGavetas, valorMensalidade, contratoId: contrato.id }, // codigo imutável após criação
    });
  } catch (e) {
    if (!isP2002On(e, "codigo")) throw e;
    // codigo composto ainda colide (quadra com nome repetido) — usa JZ-{CodJazigo} que é único pelo PK
    await prisma.jazigo.upsert({
      where: { sqlServerId: jazigoSqlId },
      create: { sqlServerId: jazigoSqlId, codigo: `JZ-${jazigoSqlId}`, quadra, setor, quantidadeGavetas, valorMensalidade, contratoId: contrato.id },
      update: { quadra, setor, quantidadeGavetas, valorMensalidade, contratoId: contrato.id },
    });
  }
  return true;
}

/**
 * `dbo.Jazigos` isolado (sem `Contratos_Jazigos`) não tem `contratoId` no legado — ignorado no sync de domínio.
 * Mantido para compatibilidade se a query for enriquecida no futuro.
 */
export async function upsertJazigoFromRow(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<boolean> {
  const jazigoSqlId = toSqlServerInt(pickRow(row, ["CodJazigo", "codJazigo"]));
  if (jazigoSqlId === null) return false;

  const contratoCtx = await resolveContratoFromPlanOrChain(prisma, row);
  if (!contratoCtx) return false;

  const codigo =
    str(
      pickRow(row, ["Jazigo", "jazigo", "Codigo", "codigo", "NumeroJazigo"]),
      20,
    ).trim() || `JZ-${jazigoSqlId}`;

  const gavetasRaw = toSqlServerInt(
    pickRow(row, [
      "QtdGavetas",
      "qtdGavetas",
      "NroGavetas",
      "nroGavetas",
      "NrGavetas",
    ]),
  );
  const quantidadeGavetas = gavetasRaw !== null && gavetasRaw > 0 ? gavetasRaw : 3;
  const valorMensalidade = monthlyFromGavetas(quantidadeGavetas);

  await prisma.jazigo.upsert({
    where: { sqlServerId: jazigoSqlId },
    create: {
      sqlServerId: jazigoSqlId,
      codigo,
      quadra: str(pickRow(row, ["NomeQuadra", "Quadra", "quadra"]), 20) || null,
      setor: str(pickRow(row, ["Setor", "setor"]), 20) || null,
      quantidadeGavetas,
      valorMensalidade,
      contratoId: contratoCtx.id,
    },
    update: {
      codigo,
      quadra: str(pickRow(row, ["NomeQuadra", "Quadra", "quadra"]), 20) || null,
      setor: str(pickRow(row, ["Setor", "setor"]), 20) || null,
      quantidadeGavetas,
      valorMensalidade,
      contratoId: contratoCtx.id,
    },
  });
  return true;
}

export async function upsertFinancialResponsibleFromRow(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<boolean> {
  const planSqlId = toSqlServerInt(
    pickRow(row, ["CodCessionarioPlano", "codCessionarioPlano"]),
  );
  if (planSqlId === null) return false;

  const contratoCtx = await resolveContratoFromPlanOrChain(prisma, row);
  if (!contratoCtx) return false;

  const nome =
    str(pickRow(row, ["Nome", "nome", "RazaoSocial", "razaoSocial"]), 200) ||
    "Responsável";
  const cpfRaw = normalizeCpfCnpjDigits(
    pickRow(row, ["CPF", "cpf", "CpfCnpj", "cpfCnpj", "CpfCgc", "NumCpfCnpj"]),
  );
  const cpfCnpj = (cpfRaw ?? "00000000000000").padStart(14, "0").slice(0, 14);
  const email = str(pickRow(row, ["Email", "email"]), 320) || null;
  const motivo = str(pickRow(row, ["Motivo", "motivo", "Obs", "obs"]), 500) || null;

  // ResponsavelFinanceiro v2.0: dados de contato vivem no Customer vinculado.
  // Localiza ou cria o Customer pelo CPF/CNPJ antes de gravar o vínculo.
  let customer = await prisma.customer.findUnique({ where: { cpfCnpj } });
  if (!customer) {
    // email é @unique: verificar se já pertence a outro Customer antes de criar
    let emailForCreate: string | null = email;
    if (emailForCreate !== null) {
      const emailOwner = await prisma.customer.findUnique({ where: { email: emailForCreate } });
      if (emailOwner) emailForCreate = null;
    }
    customer = await prisma.customer.create({
      data: {
        cpfCnpj,
        nome,
        email: emailForCreate,
        primeiroAcesso: true,
      },
    });
  } else if (customer.nome !== nome || customer.email !== email) {
    // email é @unique: só actualiza se não pertence a outro Customer
    let emailForUpdate: string | null | undefined = undefined;
    if (email !== null) {
      const emailOwner = await prisma.customer.findUnique({ where: { email } });
      if (!emailOwner || emailOwner.id === customer.id) emailForUpdate = email;
    }
    customer = await prisma.customer.update({
      where: { id: customer.id },
      data: {
        nome,
        ...(emailForUpdate !== undefined ? { email: emailForUpdate } : {}),
      },
    });
  }

  await prisma.responsavelFinanceiro.upsert({
    where: { contratoId: contratoCtx.id },
    create: {
      contratoId: contratoCtx.id,
      customerId: customer.id,
      motivo,
    },
    update: {
      customerId: customer.id,
      motivo,
    },
  });
  return true;
}

export async function upsertPagamentoFromRow(
  prisma: PrismaClient,
  row: Record<string, unknown>,
): Promise<boolean> {
  const boletoSqlId = toSqlServerInt(pickRow(row, ["CodBoleto", "codBoleto"]));
  const planSqlId = toSqlServerInt(
    pickRow(row, ["CodCessionarioPlano", "codCessionarioPlano"]),
  );
  if (boletoSqlId === null || planSqlId === null) return false;

  const due =
    parseSqlServerDate(row, "DataVencimento") ??
    parseSqlServerDate(row, "dataVencimento");
  if (!due) return false;

  const contratoCtx = await resolveContratoFromPlanOrChain(prisma, row);
  if (!contratoCtx) return false;

  const status = mapLegacyBoletoToStatusPagamento(
    pickRow(row, ["Situacao", "situacao", "Status"]),
  );

  const paymentDate =
    parseSqlServerDate(row, "DataLiquid") ??
    parseSqlServerDate(row, "DataLiquidacao") ??
    parseSqlServerDate(row, "dataLiquidacao");

  const jazigoSqlId = toSqlServerInt(pickRow(row, ["CodJazigo", "codJazigo"]));
  let jazigo = jazigoSqlId
    ? await prisma.jazigo.findUnique({ where: { sqlServerId: jazigoSqlId } })
    : null;
  jazigo ??= await prisma.jazigo.findFirst({
    where: { contratoId: contratoCtx.id },
    orderBy: { codigo: "asc" },
  });

  const tipo = jazigo ? "MANUTENCAO" : "TAXA_SERVICO";

  const valorTitulo = decRequired(
    pickRow(row, ["ValorTitulo", "valorTitulo", "Valor", "valor", "VlrTitulo", "vlrTitulo"]),
  );
  // Boletos zerados/cancelados no legado não têm valor cobrável — ignorar.
  if (valorTitulo.isZero()) return false;

  await prisma.pagamento.upsert({
    where: { sqlServerId: boletoSqlId },
    create: {
      sqlServerId: boletoSqlId,
      customerId: contratoCtx.customerId,
      contratoId: contratoCtx.id,
      jazigoId: jazigo?.id ?? null,
      valorTitulo,
      dataVencimento: due,
      dataPagamento: paymentDate,
      status,
      tipo,
      gavetasNaEpoca: jazigo?.quantidadeGavetas ?? null,
      valorNaEpoca: jazigo?.valorMensalidade ?? null,
      nossoNumero: str(pickRow(row, ["NossoNumero", "nossoNumero"]), 50) || null,
    },
    update: {
      valorTitulo,
      dataVencimento: due,
      dataPagamento: paymentDate,
      status,
      tipo,
      jazigoId: jazigo?.id ?? null,
      gavetasNaEpoca: jazigo?.quantidadeGavetas ?? null,
      valorNaEpoca: jazigo?.valorMensalidade ?? null,
      nossoNumero: str(pickRow(row, ["NossoNumero", "nossoNumero"]), 50) || null,
    },
  });
  return true;
}

/**
 * Substitui todos os endereços do cliente pelas linhas MSSQL recebidas.
 */
export async function replaceAddressesForCustomers(
  prisma: PrismaClient,
  rows: Record<string, unknown>[],
): Promise<number> {
  const byCustomer = new Map<number, Record<string, unknown>[]>();
  for (const row of rows) {
    const cid = toSqlServerInt(pickRow(row, ["CodCessionario", "codCessionario"]));
    if (cid === null) continue;
    const list = byCustomer.get(cid) ?? [];
    list.push(row);
    byCustomer.set(cid, list);
  }

  let written = 0;
  for (const [customerSqlId, list] of byCustomer) {
    const customer = await prisma.customer.findUnique({
      where: { sqlServerId: customerSqlId },
    });
    if (!customer) continue;

    await prisma.$transaction(async (tx) => {
      await tx.customerAddress.deleteMany({ where: { customerId: customer.id } });
      let idx = 0;
      for (const row of list) {
        const street = str(
          pickRow(row, ["Logradouro", "logradouro", "Endereco", "endereco"]),
          200,
        );
        if (!street) continue;
        const isMain =
          Boolean(
            pickRow(row, ["Correspondencia", "correspondencia", "Principal"]),
          ) || idx === 0;
        await tx.customerAddress.create({
          data: {
            customerId: customer.id,
            tipo: mapTipoEnderecoRow(row),
            logradouro: street,
            numero: str(pickRow(row, ["Numero", "numero", "Num"]), 10) || null,
            complemento:
              str(pickRow(row, ["Complemento", "complemento"]), 100) || null,
            bairro:
              str(pickRow(row, ["Setor", "setor", "Bairro", "bairro"]), 100) ||
              null,
            cidade: str(pickRow(row, ["Cidade", "cidade"]), 120) || "—",
            uf: uf2(row),
            cep:
              str(pickRow(row, ["Cep", "CEP", "CepCessionario"]), 10) || null,
            correspondencia: isMain,
          },
        });
        written++;
        idx++;
      }
    });
  }
  return written;
}

/**
 * Substitui todos os telefones do cliente pelas linhas MSSQL recebidas.
 */
export async function replacePhonesForCustomers(
  prisma: PrismaClient,
  rows: Record<string, unknown>[],
): Promise<number> {
  const byCustomer = new Map<number, Record<string, unknown>[]>();
  for (const row of rows) {
    const cid = toSqlServerInt(pickRow(row, ["CodCessionario", "codCessionario"]));
    if (cid === null) continue;
    const list = byCustomer.get(cid) ?? [];
    list.push(row);
    byCustomer.set(cid, list);
  }

  let written = 0;
  for (const [customerSqlId, list] of byCustomer) {
    const customer = await prisma.customer.findUnique({
      where: { sqlServerId: customerSqlId },
    });
    if (!customer) continue;

    await prisma.$transaction(async (tx) => {
      await tx.customerPhone.deleteMany({ where: { customerId: customer.id } });
      for (const row of list) {
        const numeroTel = str(
          pickRow(row, ["Numero", "numero", "Fone", "fone", "Telefone"]),
          20,
        );
        if (numeroTel.length < 6) continue;
        await tx.customerPhone.create({
          data: {
            customerId: customer.id,
            numero: numeroTel,
            tipo: mapPhoneTipoRow(row),
          },
        });
        written++;
      }
    });
  }
  return written;
}

export async function upsertDomainRowByMappingId(
  prisma: PrismaClient,
  mappingId: string,
  row: Record<string, unknown>,
): Promise<number> {
  switch (mappingId) {
    case "cessionarios":
      return (await upsertCustomerFromRow(prisma, row)) ? 1 : 0;
    case "cessionarios-planos":
      return (await upsertContratoFromRow(prisma, row)) ? 1 : 0;
    case "contratos":
      return (await upsertContratoFromContratosChainRow(prisma, row)) ? 1 : 0;
    case "contratos-jazigos":
      return (await upsertJazigoFromContratosJazigosRow(prisma, row)) ? 1 : 0;
    case "jazigos":
      return (await upsertJazigoFromRow(prisma, row)) ? 1 : 0;
    case "cessionarios-planos-responsavel":
      return (await upsertFinancialResponsibleFromRow(prisma, row)) ? 1 : 0;
    case "boletos":
      return (await upsertPagamentoFromRow(prisma, row)) ? 1 : 0;
    default:
      return 0;
  }
}
