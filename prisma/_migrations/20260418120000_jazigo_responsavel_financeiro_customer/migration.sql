-- Centraliza pagador por jazigo em `customers` (remove tabela auxiliar, FK única indexada).

ALTER TABLE "jazigos" DROP CONSTRAINT IF EXISTS "jazigos_responsavel_financeiro_pessoa_id_fkey";
DROP INDEX IF EXISTS "jazigos_responsavel_financeiro_pessoa_id_idx";
ALTER TABLE "jazigos" DROP COLUMN IF EXISTS "responsavel_financeiro_pessoa_id";

DROP TABLE IF EXISTS "responsaveis_financeiros_pessoa";

ALTER TABLE "jazigos" ADD COLUMN "responsavel_financeiro_customer_id" TEXT;

CREATE INDEX "jazigos_responsavel_financeiro_customer_id_idx" ON "jazigos"("responsavel_financeiro_customer_id");

ALTER TABLE "jazigos" ADD CONSTRAINT "jazigos_responsavel_financeiro_customer_id_fkey" FOREIGN KEY ("responsavel_financeiro_customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
