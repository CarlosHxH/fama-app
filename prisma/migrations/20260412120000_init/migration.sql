-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "BoletoStatus" AS ENUM ('ABERTO', 'QUITADO', 'VENCIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "ChangeType" AS ENUM ('ADDRESS', 'PHONE', 'PERSONAL');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "customers" (
    "cod_cessionario" BIGINT NOT NULL,
    "full_name" TEXT NOT NULL,
    "cpf_cnpj" TEXT,
    "email" TEXT,
    "password_hash" TEXT,
    "first_access" BOOLEAN NOT NULL DEFAULT true,
    "asaas_customer_id" VARCHAR(50),
    "last_sync_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("cod_cessionario")
);

-- CreateTable
CREATE TABLE "customer_plans" (
    "cod_cessionario_plano" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "status" CHAR(1),
    "has_financial_resp" BOOLEAN NOT NULL DEFAULT false,
    "setor" TEXT,
    "quadra" TEXT,
    "lote" TEXT,

    CONSTRAINT "customer_plans_pkey" PRIMARY KEY ("cod_cessionario_plano")
);

-- CreateTable
CREATE TABLE "financial_responsible" (
    "id" BIGSERIAL NOT NULL,
    "customer_plan_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "payer_customer_id" BIGINT,

    CONSTRAINT "financial_responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletos" (
    "cod_boleto" BIGINT NOT NULL,
    "plan_id" BIGINT NOT NULL,
    "due_date" DATE NOT NULL,
    "valor_titulo" DECIMAL(15,2) NOT NULL,
    "status" "BoletoStatus" NOT NULL DEFAULT 'ABERTO',
    "data_liquid" DATE,
    "valor_recebido" DECIMAL(15,2),
    "descontos" DECIMAL(15,2),
    "juros_mora" DECIMAL(15,2),
    "modo_baixa" VARCHAR(50),
    "num_banco" VARCHAR(10),
    "nosso_numero" VARCHAR(50),
    "parcela" VARCHAR(10),
    "cod_forma_pag" INTEGER,

    CONSTRAINT "boletos_pkey" PRIMARY KEY ("cod_boleto")
);

-- CreateTable
CREATE TABLE "portal_payments" (
    "id" TEXT NOT NULL,
    "invoice_id" BIGINT,
    "customer_id" BIGINT NOT NULL,
    "asaas_payment_id" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "invoice_url" TEXT,
    "bank_slip_url" TEXT,
    "pix_copy_paste" TEXT,
    "value" DECIMAL(15,2) NOT NULL,
    "net_value" DECIMAL(15,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portal_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "change_requests" (
    "id" SERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "type" "ChangeType" NOT NULL,
    "old_data" JSONB,
    "new_data" JSONB NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewed_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "change_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zip_code" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" SERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "number" TEXT NOT NULL,
    "type" TEXT,
    "observations" TEXT,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contas_oauth_provider_providerAccountId_key" ON "contas_oauth"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_sessionToken_key" ON "sessoes"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_verificacao_token_key" ON "tokens_verificacao"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_verificacao_identifier_token_key" ON "tokens_verificacao"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_cnpj_key" ON "customers"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "customers_asaas_customer_id_key" ON "customers"("asaas_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "financial_responsible_customer_plan_id_key" ON "financial_responsible"("customer_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "portal_payments_asaas_payment_id_key" ON "portal_payments"("asaas_payment_id");

-- CreateIndex
CREATE INDEX "idx_phone_customer" ON "phones"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- AddForeignKey
ALTER TABLE "contas_oauth" ADD CONSTRAINT "contas_oauth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_plans" ADD CONSTRAINT "customer_plans_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("cod_cessionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_responsible" ADD CONSTRAINT "financial_responsible_customer_plan_id_fkey" FOREIGN KEY ("customer_plan_id") REFERENCES "customer_plans"("cod_cessionario_plano") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_responsible" ADD CONSTRAINT "financial_responsible_payer_customer_id_fkey" FOREIGN KEY ("payer_customer_id") REFERENCES "customers"("cod_cessionario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boletos" ADD CONSTRAINT "boletos_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "customer_plans"("cod_cessionario_plano") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portal_payments" ADD CONSTRAINT "portal_payments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("cod_cessionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portal_payments" ADD CONSTRAINT "portal_payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "boletos"("cod_boleto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "change_requests" ADD CONSTRAINT "change_requests_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("cod_cessionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("cod_cessionario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("cod_cessionario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("cod_cessionario") ON DELETE CASCADE ON UPDATE CASCADE;
