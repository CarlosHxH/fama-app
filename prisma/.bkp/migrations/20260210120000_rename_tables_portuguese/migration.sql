-- Nomes físicos em português (legíveis, alinhados ao desenho Claude: cessionarios, sync_logs, boletos, …)
-- O cliente Prisma mantém os nomes dos modelos em inglês (User, BillingPayment, …).

ALTER TYPE "AdminStaffRole" RENAME TO "PerfilAdmin";

ALTER TABLE "User" RENAME TO "usuarios";
ALTER TABLE "Account" RENAME TO "contas_oauth";
ALTER TABLE "Session" RENAME TO "sessoes";
ALTER TABLE "BillingPayment" RENAME TO "cobrancas_asaas";
ALTER TABLE "VerificationToken" RENAME TO "tokens_verificacao";

ALTER TABLE IF EXISTS "ClientPhone" RENAME TO "telefones_cliente";
ALTER TABLE IF EXISTS "SyncRun" RENAME TO "execucoes_sincronizacao";
ALTER TABLE IF EXISTS "MssqlSyncRecord" RENAME TO "registros_sync_mssql";
