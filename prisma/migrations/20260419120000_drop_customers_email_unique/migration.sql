-- Drop unique constraint on customers.email (data has duplicates from legacy SQL Server import)
DROP INDEX IF EXISTS "customers_email_key";
