-- =============================================================================
-- prisma/sql/dashboard_views.sql
--
-- Views do dashboard alinhadas ao schema v2.0 (pagamentos, contratos, jazigos,
-- customers, sync_logs).
-- Execute após migrações, por exemplo:
--   psql $DATABASE_URL -f prisma/sql/dashboard_views.sql
--
-- Status de pagamento (enum StatusPagamento):
--   PENDENTE | PAGO | ATRASADO | CANCELADO | ESTORNADO
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. KPIs principais do dashboard
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_kpi AS
SELECT
  1::INT AS id,

  (SELECT COUNT(*)::INT FROM customers) AS "totalClientes",

  -- Clientes com ao menos uma cobrança pendente ou atrasada
  (SELECT COUNT(DISTINCT customer_id)::INT
   FROM pagamentos
   WHERE status IN ('PENDENTE', 'ATRASADO')
     AND data_pagamento IS NULL
  ) AS "clientesAtivos",

  (SELECT COUNT(*)::INT FROM pagamentos) AS "totalBoletos",

  (SELECT COUNT(*)::INT FROM pagamentos
   WHERE status = 'PENDENTE' AND data_pagamento IS NULL) AS "boletosAbertos",

  (SELECT COUNT(*)::INT FROM pagamentos
   WHERE status = 'ATRASADO' AND data_pagamento IS NULL) AS "boletosVencidos",

  (SELECT COUNT(*)::INT FROM pagamentos
   WHERE status = 'PAGO') AS "boletosLiquidados",

  0::INT AS "totalCobrancasManuais",

  (SELECT COALESCE(SUM(valor_titulo), 0)::DECIMAL(18,2) FROM pagamentos
   WHERE status = 'PENDENTE' AND data_pagamento IS NULL) AS "valorTotalEmAberto",

  (SELECT COALESCE(SUM(valor_titulo), 0)::DECIMAL(18,2) FROM pagamentos
   WHERE status = 'ATRASADO' AND data_pagamento IS NULL) AS "valorTotalVencido",

  -- Recebido no mês corrente (usa valor_pago quando disponível, fallback valor_titulo)
  COALESCE((
    SELECT SUM(COALESCE(p.valor_pago, p.valor_titulo))
    FROM pagamentos p
    WHERE p.status = 'PAGO'
      AND p.data_pagamento IS NOT NULL
      AND DATE_TRUNC('month', p.data_pagamento::timestamp) = DATE_TRUNC('month', NOW())
  ), 0)::DECIMAL(18,2) AS "valorTotalRecebidoMes",

  -- Recebido no ano corrente
  COALESCE((
    SELECT SUM(COALESCE(p.valor_pago, p.valor_titulo))
    FROM pagamentos p
    WHERE p.status = 'PAGO'
      AND p.data_pagamento IS NOT NULL
      AND EXTRACT(YEAR FROM p.data_pagamento::timestamp) = EXTRACT(YEAR FROM NOW())
  ), 0)::DECIMAL(18,2) AS "valorTotalRecebidoAno",

  0::DECIMAL(18,2) AS "valorCobrancasManuaisAberto",

  (SELECT data_inicio FROM sync_logs ORDER BY data_inicio DESC NULLS LAST LIMIT 1) AS "ultimoSync",
  (SELECT status::TEXT FROM sync_logs ORDER BY data_inicio DESC NULLS LAST LIMIT 1) AS "statusUltimoSync";


-- ---------------------------------------------------------------------------
-- 2. Inadimplência por faixa de atraso (cobranças pendentes/atrasadas com vencimento passado)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_inadimplencia AS
WITH inadimplentes AS (
  SELECT
    p.id,
    p.valor_titulo,
    p.customer_id,
    CASE
      WHEN CURRENT_DATE - p.data_vencimento BETWEEN 1  AND 30  THEN '1-30 dias'
      WHEN CURRENT_DATE - p.data_vencimento BETWEEN 31 AND 60  THEN '31-60 dias'
      WHEN CURRENT_DATE - p.data_vencimento BETWEEN 61 AND 90  THEN '61-90 dias'
      ELSE '90+ dias'
    END AS faixa
  FROM pagamentos p
  WHERE p.status IN ('PENDENTE', 'ATRASADO')
    AND p.data_pagamento IS NULL
    AND p.data_vencimento < CURRENT_DATE
)
SELECT
  faixa                                                         AS "faixaAtraso",
  COUNT(id)::INT                                                AS "totalBoletos",
  COUNT(DISTINCT customer_id)::INT                              AS "totalClientes",
  COALESCE(SUM(valor_titulo), 0)::DECIMAL(18,2)                AS "valorTotal"
FROM inadimplentes
GROUP BY faixa
ORDER BY
  CASE faixa
    WHEN '1-30 dias'  THEN 1
    WHEN '31-60 dias' THEN 2
    WHEN '61-90 dias' THEN 3
    ELSE 4
  END;


-- ---------------------------------------------------------------------------
-- 3. Recebimentos mensais — últimos 12 meses (cobranças pagas)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_recebimento_mensal AS
SELECT
  TO_CHAR(DATE_TRUNC('month', p.data_pagamento::timestamp), 'YYYY-MM') AS "anoMes",
  COUNT(*)::INT                                                          AS "totalBoletos",
  COALESCE(SUM(COALESCE(p.valor_pago, p.valor_titulo)), 0)::DECIMAL(18,2) AS "valorRecebido",
  0::INT AS "origemAsaas",
  0::INT AS "origemSistema"
FROM pagamentos p
WHERE p.status = 'PAGO'
  AND p.data_pagamento IS NOT NULL
  AND p.data_pagamento >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', p.data_pagamento::timestamp)
ORDER BY DATE_TRUNC('month', p.data_pagamento::timestamp) DESC;
