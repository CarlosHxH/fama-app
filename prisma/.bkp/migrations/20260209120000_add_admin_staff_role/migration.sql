-- CreateEnum
CREATE TYPE "AdminStaffRole" AS ENUM ('SUPER_ADMIN', 'FINANCEIRO', 'OPERACIONAL', 'VIEWER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "adminStaffRole" "AdminStaffRole";
