-- CreateTable
CREATE TABLE "responsaveis_financeiros_pessoa" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(160) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(120),
    "telefone" VARCHAR(20),
    "motivo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responsaveis_financeiros_pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "responsaveis_financeiros_pessoa_cpf_idx" ON "responsaveis_financeiros_pessoa"("cpf");

-- AlterTable
ALTER TABLE "jazigos" ADD COLUMN "responsavel_financeiro_pessoa_id" TEXT;

-- CreateIndex
CREATE INDEX "jazigos_responsavel_financeiro_pessoa_id_idx" ON "jazigos"("responsavel_financeiro_pessoa_id");

-- AddForeignKey
ALTER TABLE "jazigos" ADD CONSTRAINT "jazigos_responsavel_financeiro_pessoa_id_fkey" FOREIGN KEY ("responsavel_financeiro_pessoa_id") REFERENCES "responsaveis_financeiros_pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
