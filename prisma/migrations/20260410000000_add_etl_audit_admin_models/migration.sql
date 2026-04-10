Loaded Prisma config from prisma.config.ts.

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "OrigemPagamento" AS ENUM ('SISTEMA_INTERNO', 'ASAAS', 'MANUAL_ADMIN');

-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('FISICA', 'JURIDICA');

-- CreateEnum
CREATE TYPE "SituacaoBoleto" AS ENUM ('ABERTO', 'LIQUIDADO', 'CANCELADO', 'VENCIDO');

-- CreateEnum
CREATE TYPE "MetodoAsaas" AS ENUM ('BOLETO', 'PIX', 'CREDIT_CARD', 'UNDEFINED');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('RUNNING', 'SUCCESS', 'PARTIAL', 'FAILED');

-- CreateEnum
CREATE TYPE "PerfilAdmin" AS ENUM ('SUPER_ADMIN', 'FINANCEIRO', 'OPERACIONAL', 'VISUALIZADOR');

-- CreateEnum
CREATE TYPE "AcaoAuditoria" AS ENUM ('LOGIN', 'LOGOUT', 'CRIAR_CLIENTE', 'ATUALIZAR_CLIENTE', 'CRIAR_CONTATO', 'ATUALIZAR_CONTATO', 'REMOVER_CONTATO', 'CRIAR_COBRANCA', 'CANCELAR_COBRANCA', 'CRIAR_ADMIN', 'ATUALIZAR_ADMIN', 'DESATIVAR_ADMIN', 'SYNC_MANUAL', 'EXPORTAR_RELATORIO');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BillingPaymentStatus" AS ENUM ('PENDING', 'RECEIVED', 'OVERDUE', 'REFUNDED', 'CANCELLED', 'UNKNOWN');

-- CreateTable
CREATE TABLE "contas_oauth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "contas_oauth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessoes" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens_verificacao" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "asaasCustomerId" TEXT,
    "cpfCnpj" TEXT,
    "legacyExternalId" INTEGER,
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "blockedUntil" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telefones_cliente" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "telefones_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cobrancas_asaas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "asaasPaymentId" TEXT NOT NULL,
    "valueCents" INTEGER NOT NULL,
    "status" "BillingPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "asaasBillingType" TEXT DEFAULT 'PIX',
    "checkoutUrl" TEXT,
    "boletoDigitableLine" TEXT,
    "pixCopyPaste" TEXT,
    "pixQrCodeBase64" TEXT,
    "nossoNumero" TEXT,
    "parcela" TEXT,
    "numBanco" TEXT,
    "legacyBoletoId" INTEGER,
    "externalRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cobrancas_asaas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senhaHash" VARCHAR(255) NOT NULL,
    "perfil" "PerfilAdmin" NOT NULL DEFAULT 'VISUALIZADOR',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "tentativasLogin" INTEGER NOT NULL DEFAULT 0,
    "bloqueadoAte" TIMESTAMP(3),
    "ultimoLogin" TIMESTAMP(3),
    "ultimoIp" VARCHAR(45),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_sessoes" (
    "id" SERIAL NOT NULL,
    "tokenId" VARCHAR(36) NOT NULL,
    "adminId" INTEGER NOT NULL,
    "ip" VARCHAR(45),
    "userAgent" VARCHAR(500),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revogado" BOOLEAN NOT NULL DEFAULT false,
    "revogarEm" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_logs" (
    "id" SERIAL NOT NULL,
    "acao" "AcaoAuditoria" NOT NULL,
    "adminId" INTEGER,
    "entidade" VARCHAR(50),
    "entidadeId" VARCHAR(100),
    "dadosAntes" JSONB,
    "dadosDepois" JSONB,
    "observacao" TEXT,
    "ip" VARCHAR(45),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cobrancas_manuais" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "valor" DECIMAL(18,2) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "metodo" "MetodoAsaas" NOT NULL DEFAULT 'PIX',
    "situacao" "SituacaoBoleto" NOT NULL DEFAULT 'ABERTO',
    "origemPagamento" "OrigemPagamento" NOT NULL DEFAULT 'MANUAL_ADMIN',
    "observacao" TEXT,
    "adminId" INTEGER NOT NULL,
    "cessionarioId" INTEGER NOT NULL,
    "asaasPaymentId" VARCHAR(50),
    "asaasInvoiceUrl" TEXT,
    "asaasPixQrCode" TEXT,
    "asaasLinhaDigitavel" TEXT,
    "dataLiquidacao" TIMESTAMP(3),
    "valorRecebido" DECIMAL(18,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cobrancas_manuais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cessionarios" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER,
    "nome" VARCHAR(80) NOT NULL,
    "cpfCnpj" CHAR(14) NOT NULL,
    "email" VARCHAR(60),
    "tipoPessoa" "TipoPessoa" NOT NULL DEFAULT 'FISICA',
    "dataNascimento" TIMESTAMP(3),
    "dataAtualizacaoLegado" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "asaasCustomerId" VARCHAR(50),
    "flagManual" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cessionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contatos" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER,
    "numero" VARCHAR(20) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "observacao" VARCHAR(30),
    "flagManual" BOOLEAN NOT NULL DEFAULT false,
    "cessionarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "tipoEndereco" VARCHAR(20) NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "complemento" VARCHAR(50),
    "setor" VARCHAR(50),
    "cep" CHAR(10) NOT NULL,
    "cidade" VARCHAR(60) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "correspondencia" BOOLEAN NOT NULL DEFAULT false,
    "cessionarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsaveis_financeiros" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "cpfCnpj" CHAR(14) NOT NULL,
    "email" VARCHAR(60),
    "tipoPessoa" "TipoPessoa" NOT NULL DEFAULT 'FISICA',
    "logradouro" VARCHAR(100),
    "complemento" VARCHAR(50),
    "setor" VARCHAR(50),
    "cep" CHAR(10),
    "cidade" VARCHAR(60),
    "uf" CHAR(2),
    "asaasCustomerId" VARCHAR(50),
    "cessionarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responsaveis_financeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cessionarios_planos" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "numPlano" VARCHAR(10) NOT NULL,
    "situacao" CHAR(1) NOT NULL,
    "diaBase" INTEGER,
    "valor" DECIMAL(18,2) NOT NULL,
    "possuiResponsavelFinanceiro" BOOLEAN NOT NULL DEFAULT false,
    "dataInclusao" TIMESTAMP(3),
    "cessionarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cessionarios_planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletos" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "nossoNumero" VARCHAR(25) NOT NULL,
    "parcela" VARCHAR(10),
    "numBanco" CHAR(3) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "dataLiquidacao" TIMESTAMP(3),
    "dataCredito" TIMESTAMP(3),
    "valorTitulo" DECIMAL(18,2) NOT NULL,
    "valorRecebido" DECIMAL(18,2),
    "jurosMora" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "multas" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "descontos" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "valorComAcrescimos" DECIMAL(18,2),
    "diasAtraso" INTEGER,
    "situacao" "SituacaoBoleto" NOT NULL DEFAULT 'ABERTO',
    "origemPagamento" "OrigemPagamento" NOT NULL DEFAULT 'SISTEMA_INTERNO',
    "metodoPreferencial" "MetodoAsaas" NOT NULL DEFAULT 'UNDEFINED',
    "codFormaPagLegado" INTEGER,
    "asaasPaymentId" VARCHAR(50),
    "asaasInvoiceUrl" TEXT,
    "asaasPixQrCode" TEXT,
    "asaasLinhaDigitavel" TEXT,
    "cessionarioPlanoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boletos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execucoes_sincronizacao" (
    "id" TEXT NOT NULL,
    "jobName" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "rowsRead" INTEGER NOT NULL DEFAULT 0,
    "rowsWritten" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,

    CONSTRAINT "execucoes_sincronizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registros_sync_mssql" (
    "id" TEXT NOT NULL,
    "sourceTable" TEXT NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_sync_mssql_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" SERIAL NOT NULL,
    "executadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SyncStatus" NOT NULL DEFAULT 'RUNNING',
    "curssorOleFloat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCessionarios" INTEGER NOT NULL DEFAULT 0,
    "totalBoletos" INTEGER NOT NULL DEFAULT 0,
    "totalContatos" INTEGER NOT NULL DEFAULT 0,
    "totalEnderecos" INTEGER NOT NULL DEFAULT 0,
    "erros" TEXT[],
    "duracaoMs" INTEGER,

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contas_oauth_provider_providerAccountId_key" ON "contas_oauth"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_sessionToken_key" ON "sessoes"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_verificacao_token_key" ON "tokens_verificacao"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_verificacao_identifier_token_key" ON "tokens_verificacao"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_asaasCustomerId_key" ON "usuarios"("asaasCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpfCnpj_key" ON "usuarios"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_legacyExternalId_key" ON "usuarios"("legacyExternalId");

-- CreateIndex
CREATE INDEX "telefones_cliente_userId_idx" ON "telefones_cliente"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cobrancas_asaas_asaasPaymentId_key" ON "cobrancas_asaas"("asaasPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "cobrancas_asaas_legacyBoletoId_key" ON "cobrancas_asaas"("legacyBoletoId");

-- CreateIndex
CREATE INDEX "cobrancas_asaas_userId_idx" ON "cobrancas_asaas"("userId");

-- CreateIndex
CREATE INDEX "cobrancas_asaas_status_idx" ON "cobrancas_asaas"("status");

-- CreateIndex
CREATE INDEX "cobrancas_asaas_createdAt_idx" ON "cobrancas_asaas"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE INDEX "admin_users_email_idx" ON "admin_users"("email");

-- CreateIndex
CREATE INDEX "admin_users_perfil_idx" ON "admin_users"("perfil");

-- CreateIndex
CREATE UNIQUE INDEX "admin_sessoes_tokenId_key" ON "admin_sessoes"("tokenId");

-- CreateIndex
CREATE INDEX "admin_sessoes_adminId_idx" ON "admin_sessoes"("adminId");

-- CreateIndex
CREATE INDEX "admin_sessoes_expiresAt_idx" ON "admin_sessoes"("expiresAt");

-- CreateIndex
CREATE INDEX "auditoria_logs_adminId_idx" ON "auditoria_logs"("adminId");

-- CreateIndex
CREATE INDEX "auditoria_logs_acao_idx" ON "auditoria_logs"("acao");

-- CreateIndex
CREATE INDEX "auditoria_logs_entidade_entidadeId_idx" ON "auditoria_logs"("entidade", "entidadeId");

-- CreateIndex
CREATE INDEX "auditoria_logs_criadoEm_idx" ON "auditoria_logs"("criadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "cobrancas_manuais_asaasPaymentId_key" ON "cobrancas_manuais"("asaasPaymentId");

-- CreateIndex
CREATE INDEX "cobrancas_manuais_cessionarioId_idx" ON "cobrancas_manuais"("cessionarioId");

-- CreateIndex
CREATE INDEX "cobrancas_manuais_adminId_idx" ON "cobrancas_manuais"("adminId");

-- CreateIndex
CREATE INDEX "cobrancas_manuais_situacao_idx" ON "cobrancas_manuais"("situacao");

-- CreateIndex
CREATE INDEX "cobrancas_manuais_dataVencimento_idx" ON "cobrancas_manuais"("dataVencimento");

-- CreateIndex
CREATE UNIQUE INDEX "cessionarios_externalId_key" ON "cessionarios"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "cessionarios_asaasCustomerId_key" ON "cessionarios"("asaasCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "cessionarios_userId_key" ON "cessionarios"("userId");

-- CreateIndex
CREATE INDEX "cessionarios_cpfCnpj_idx" ON "cessionarios"("cpfCnpj");

-- CreateIndex
CREATE INDEX "cessionarios_dataAtualizacaoLegado_idx" ON "cessionarios"("dataAtualizacaoLegado");

-- CreateIndex
CREATE UNIQUE INDEX "contatos_externalId_key" ON "contatos"("externalId");

-- CreateIndex
CREATE INDEX "contatos_cessionarioId_idx" ON "contatos"("cessionarioId");

-- CreateIndex
CREATE INDEX "enderecos_cessionarioId_idx" ON "enderecos"("cessionarioId");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_cessionarioId_tipoEndereco_key" ON "enderecos"("cessionarioId", "tipoEndereco");

-- CreateIndex
CREATE UNIQUE INDEX "responsaveis_financeiros_asaasCustomerId_key" ON "responsaveis_financeiros"("asaasCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "responsaveis_financeiros_cessionarioId_key" ON "responsaveis_financeiros"("cessionarioId");

-- CreateIndex
CREATE UNIQUE INDEX "cessionarios_planos_externalId_key" ON "cessionarios_planos"("externalId");

-- CreateIndex
CREATE INDEX "cessionarios_planos_cessionarioId_idx" ON "cessionarios_planos"("cessionarioId");

-- CreateIndex
CREATE UNIQUE INDEX "boletos_externalId_key" ON "boletos"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "boletos_asaasPaymentId_key" ON "boletos"("asaasPaymentId");

-- CreateIndex
CREATE INDEX "boletos_cessionarioPlanoId_idx" ON "boletos"("cessionarioPlanoId");

-- CreateIndex
CREATE INDEX "boletos_situacao_idx" ON "boletos"("situacao");

-- CreateIndex
CREATE INDEX "boletos_dataVencimento_idx" ON "boletos"("dataVencimento");

-- CreateIndex
CREATE INDEX "boletos_dataLiquidacao_idx" ON "boletos"("dataLiquidacao");

-- CreateIndex
CREATE INDEX "execucoes_sincronizacao_jobName_idx" ON "execucoes_sincronizacao"("jobName");

-- CreateIndex
CREATE INDEX "execucoes_sincronizacao_startedAt_idx" ON "execucoes_sincronizacao"("startedAt");

-- CreateIndex
CREATE INDEX "registros_sync_mssql_sourceTable_idx" ON "registros_sync_mssql"("sourceTable");

-- CreateIndex
CREATE UNIQUE INDEX "registros_sync_mssql_sourceTable_sourceKey_key" ON "registros_sync_mssql"("sourceTable", "sourceKey");

-- CreateIndex
CREATE INDEX "sync_logs_executadoEm_idx" ON "sync_logs"("executadoEm");

-- CreateIndex
CREATE INDEX "sync_logs_status_idx" ON "sync_logs"("status");

-- AddForeignKey
ALTER TABLE "contas_oauth" ADD CONSTRAINT "contas_oauth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telefones_cliente" ADD CONSTRAINT "telefones_cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobrancas_asaas" ADD CONSTRAINT "cobrancas_asaas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_sessoes" ADD CONSTRAINT "admin_sessoes_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_logs" ADD CONSTRAINT "auditoria_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobrancas_manuais" ADD CONSTRAINT "cobrancas_manuais_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobrancas_manuais" ADD CONSTRAINT "cobrancas_manuais_cessionarioId_fkey" FOREIGN KEY ("cessionarioId") REFERENCES "cessionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cessionarios" ADD CONSTRAINT "cessionarios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatos" ADD CONSTRAINT "contatos_cessionarioId_fkey" FOREIGN KEY ("cessionarioId") REFERENCES "cessionarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_cessionarioId_fkey" FOREIGN KEY ("cessionarioId") REFERENCES "cessionarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsaveis_financeiros" ADD CONSTRAINT "responsaveis_financeiros_cessionarioId_fkey" FOREIGN KEY ("cessionarioId") REFERENCES "cessionarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cessionarios_planos" ADD CONSTRAINT "cessionarios_planos_cessionarioId_fkey" FOREIGN KEY ("cessionarioId") REFERENCES "cessionarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boletos" ADD CONSTRAINT "boletos_cessionarioPlanoId_fkey" FOREIGN KEY ("cessionarioPlanoId") REFERENCES "cessionarios_planos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

