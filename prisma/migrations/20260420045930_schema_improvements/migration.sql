/*
  Warnings:

  - The primary key for the `change_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "change_requests" DROP CONSTRAINT "change_requests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "change_requests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "change_requests_id_seq";

-- AlterTable
ALTER TABLE "jazigos" ALTER COLUMN "quantidade_gavetas" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tarifas_jazigo" ADD COLUMN     "vigente_ate" DATE;

-- CreateIndex
CREATE INDEX "customer_refresh_tokens_customer_id_revogado_expires_at_idx" ON "customer_refresh_tokens"("customer_id", "revogado", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE INDEX "pagamentos_customer_id_status_idx" ON "pagamentos"("customer_id", "status");

-- CreateIndex
CREATE INDEX "pagamentos_data_vencimento_status_idx" ON "pagamentos"("data_vencimento", "status");

-- CreateIndex
CREATE INDEX "pagamentos_jazigo_id_status_idx" ON "pagamentos"("jazigo_id", "status");
