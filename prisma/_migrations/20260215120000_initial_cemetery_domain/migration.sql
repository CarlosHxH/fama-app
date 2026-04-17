-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'FINANCEIRO', 'ATENDENTE');

-- CreateEnum
CREATE TYPE "TipoTelefone" AS ENUM ('CELULAR', 'FIXO', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "TipoEndereco" AS ENUM ('RESIDENCIAL', 'COMERCIAL');

-- CreateEnum
CREATE TYPE "SituacaoContrato" AS ENUM ('ATIVO', 'INATIVO', 'QUITADO');

-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDENTE', 'PAGO', 'ATRASADO', 'CANCELADO', 'ESTORNADO');

-- CreateEnum
CREATE TYPE "TipoPagamento" AS ENUM ('MANUTENCAO', 'AQUISICAO', 'TAXA_SERVICO');

-- CreateEnum
CREATE TYPE "MetodoPagamento" AS ENUM ('PIX', 'BOLETO', 'CARTAO_CREDITO', 'CARTAO_DEBITO');

-- CreateEnum
CREATE TYPE "TipoAlteracao" AS ENUM ('ENDERECO', 'TELEFONE', 'EMAIL', 'DADOS_PESSOAIS');

-- CreateEnum
CREATE TYPE "StatusAlteracao" AS ENUM ('PENDENTE', 'APROVADA', 'REJEITADA');

-- CreateEnum
CREATE TYPE "CanalNotificacao" AS ENUM ('EMAIL', 'WHATSAPP', 'SMS');

-- CreateEnum
CREATE TYPE "StatusNotificacao" AS ENUM ('ENVIADA', 'ENTREGUE', 'FALHA');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PROCESSANDO', 'SUCESSO', 'FALHA');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "nome" VARCHAR(160) NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ATENDENTE',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "sql_server_id" INTEGER,
    "cpf_cnpj" VARCHAR(14) NOT NULL,
    "nome" VARCHAR(160) NOT NULL,
    "email" VARCHAR(120),
    "senha_hash" TEXT,
    "primeiro_acesso" BOOLEAN NOT NULL DEFAULT true,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "tentativas_login" INTEGER NOT NULL DEFAULT 0,
    "bloqueado_ate" TIMESTAMP(3),
    "asaas_customer_id" VARCHAR(50),
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_addresses" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "tipo" "TipoEndereco" NOT NULL DEFAULT 'RESIDENCIAL',
    "logradouro" VARCHAR(200),
    "numero" VARCHAR(10),
    "complemento" VARCHAR(100),
    "bairro" VARCHAR(100),
    "cidade" VARCHAR(120),
    "uf" CHAR(2),
    "cep" VARCHAR(10),
    "correspondencia" BOOLEAN NOT NULL DEFAULT false,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_phones" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "tipo" "TipoTelefone" NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_refresh_tokens" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revogado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "sql_server_id" INTEGER,
    "numero_contrato" VARCHAR(30) NOT NULL,
    "situacao" "SituacaoContrato" NOT NULL DEFAULT 'ATIVO',
    "customer_id" TEXT NOT NULL,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsaveis_financeiros" (
    "id" TEXT NOT NULL,
    "contrato_id" TEXT NOT NULL,
    "nome" VARCHAR(160) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(120),
    "telefone" VARCHAR(20),
    "motivo" TEXT,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responsaveis_financeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jazigos" (
    "id" TEXT NOT NULL,
    "sql_server_id" INTEGER,
    "codigo" VARCHAR(20) NOT NULL,
    "quadra" VARCHAR(20),
    "setor" VARCHAR(20),
    "quantidade_gavetas" INTEGER NOT NULL DEFAULT 3,
    "valor_mensalidade" DECIMAL(10,2) NOT NULL,
    "contrato_id" TEXT NOT NULL,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jazigos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "sql_server_id" INTEGER,
    "asaas_id" VARCHAR(100),
    "nosso_numero" VARCHAR(50),
    "invoice_url" TEXT,
    "valor_titulo" DECIMAL(10,2) NOT NULL,
    "valor_pago" DECIMAL(10,2),
    "valor_liquido" DECIMAL(10,2),
    "gavetas_na_epoca" INTEGER,
    "valor_na_epoca" DECIMAL(10,2),
    "data_vencimento" DATE NOT NULL,
    "data_pagamento" DATE,
    "status" "StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "tipo" "TipoPagamento" NOT NULL DEFAULT 'MANUTENCAO',
    "metodo_pagamento" "MetodoPagamento",
    "webhook_data" JSONB,
    "webhook_recebido_em" TIMESTAMP(3),
    "jazigo_id" TEXT,
    "contrato_id" TEXT,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "pagamento_id" TEXT,
    "canal" "CanalNotificacao" NOT NULL,
    "status" "StatusNotificacao" NOT NULL DEFAULT 'ENVIADA',
    "assunto" VARCHAR(200),
    "mensagem" TEXT NOT NULL,
    "erro_detalhe" TEXT,
    "enviado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entregue_em" TIMESTAMP(3),

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "change_requests" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "reviewed_by_id" TEXT,
    "tipo" "TipoAlteracao" NOT NULL,
    "status" "StatusAlteracao" NOT NULL DEFAULT 'PENDENTE',
    "dado_antigo" JSONB NOT NULL,
    "dado_novo" JSONB NOT NULL,
    "justificativa" TEXT,
    "nota_revisao" TEXT,
    "revisado_em" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "change_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" TEXT NOT NULL,
    "job_name" VARCHAR(60) NOT NULL,
    "status" "SyncStatus" NOT NULL DEFAULT 'PROCESSANDO',
    "registros_novos" INTEGER NOT NULL DEFAULT 0,
    "registros_atualizados" INTEGER NOT NULL DEFAULT 0,
    "falhas" INTEGER NOT NULL DEFAULT 0,
    "erro_detalhes" JSONB,
    "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fim" TIMESTAMP(3),

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_sql_server_id_key" ON "customers"("sql_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_cnpj_key" ON "customers"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_asaas_customer_id_key" ON "customers"("asaas_customer_id");

-- CreateIndex
CREATE INDEX "customers_cpf_cnpj_idx" ON "customers"("cpf_cnpj");

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "customers"("email");

-- CreateIndex
CREATE INDEX "customer_addresses_customer_id_idx" ON "customer_addresses"("customer_id");

-- CreateIndex
CREATE INDEX "customer_phones_customer_id_idx" ON "customer_phones"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_refresh_tokens_token_key" ON "customer_refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "customer_refresh_tokens_customer_id_idx" ON "customer_refresh_tokens"("customer_id");

-- CreateIndex
CREATE INDEX "customer_refresh_tokens_expires_at_idx" ON "customer_refresh_tokens"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "contratos_sql_server_id_key" ON "contratos"("sql_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "contratos_numero_contrato_key" ON "contratos"("numero_contrato");

-- CreateIndex
CREATE INDEX "contratos_customer_id_idx" ON "contratos"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "responsaveis_financeiros_contrato_id_key" ON "responsaveis_financeiros"("contrato_id");

-- CreateIndex
CREATE UNIQUE INDEX "jazigos_sql_server_id_key" ON "jazigos"("sql_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "jazigos_codigo_key" ON "jazigos"("codigo");

-- CreateIndex
CREATE INDEX "jazigos_contrato_id_idx" ON "jazigos"("contrato_id");

-- CreateIndex
CREATE UNIQUE INDEX "pagamentos_sql_server_id_key" ON "pagamentos"("sql_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "pagamentos_asaas_id_key" ON "pagamentos"("asaas_id");

-- CreateIndex
CREATE INDEX "pagamentos_customer_id_idx" ON "pagamentos"("customer_id");

-- CreateIndex
CREATE INDEX "pagamentos_jazigo_id_idx" ON "pagamentos"("jazigo_id");

-- CreateIndex
CREATE INDEX "pagamentos_contrato_id_idx" ON "pagamentos"("contrato_id");

-- CreateIndex
CREATE INDEX "pagamentos_nosso_numero_idx" ON "pagamentos"("nosso_numero");

-- CreateIndex
CREATE INDEX "pagamentos_status_idx" ON "pagamentos"("status");

-- CreateIndex
CREATE INDEX "pagamentos_data_vencimento_idx" ON "pagamentos"("data_vencimento");

-- CreateIndex
CREATE INDEX "notificacoes_customer_id_idx" ON "notificacoes"("customer_id");

-- CreateIndex
CREATE INDEX "notificacoes_pagamento_id_idx" ON "notificacoes"("pagamento_id");

-- CreateIndex
CREATE INDEX "notificacoes_status_idx" ON "notificacoes"("status");

-- CreateIndex
CREATE INDEX "notificacoes_enviado_em_idx" ON "notificacoes"("enviado_em");

-- CreateIndex
CREATE INDEX "change_requests_customer_id_idx" ON "change_requests"("customer_id");

-- CreateIndex
CREATE INDEX "change_requests_status_idx" ON "change_requests"("status");

-- CreateIndex
CREATE INDEX "sync_logs_job_name_idx" ON "sync_logs"("job_name");

-- CreateIndex
CREATE INDEX "sync_logs_data_inicio_idx" ON "sync_logs"("data_inicio");

-- AddForeignKey
ALTER TABLE "customer_addresses" ADD CONSTRAINT "customer_addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_phones" ADD CONSTRAINT "customer_phones_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_refresh_tokens" ADD CONSTRAINT "customer_refresh_tokens_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsaveis_financeiros" ADD CONSTRAINT "responsaveis_financeiros_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contratos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jazigos" ADD CONSTRAINT "jazigos_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contratos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_jazigo_id_fkey" FOREIGN KEY ("jazigo_id") REFERENCES "jazigos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contratos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_pagamento_id_fkey" FOREIGN KEY ("pagamento_id") REFERENCES "pagamentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "change_requests" ADD CONSTRAINT "change_requests_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "change_requests" ADD CONSTRAINT "change_requests_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
