-- =============================================================================
-- prisma/sql/dashboard_views.sql
--
-- Views do dashboard alinhadas ao schema atual (customers, customer_plans, fatura).
-- Execute após migrações, por exemplo:
--   psql $DATABASE_URL -f prisma/sql/dashboard_views.sql
--
-- Enum de situação da fatura: ABERTO | QUITADO | VENCIDO | CANCELADO (Prisma: BoletoStatus).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. KPIs principais do dashboard
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_kpi AS
SELECT
  1::INT AS id,

  (SELECT COUNT(*)::INT FROM customers) AS "totalClientes",

  (SELECT COUNT(DISTINCT c.cod_cessionario)::INT
   FROM customers c
   INNER JOIN customer_plans cp ON cp.customer_id = c.cod_cessionario
   INNER JOIN fatura b ON b.plan_id = cp.cod_cessionario_plano
   WHERE (b.status)::text IN ('ABERTO', 'VENCIDO') AND b.data_liquid IS NULL
  ) AS "clientesAtivos",

  (SELECT COUNT(*)::INT FROM fatura) AS "totalBoletos",

  (SELECT COUNT(*)::INT FROM fatura b
   WHERE (b.status)::text = 'ABERTO' AND b.data_liquid IS NULL) AS "boletosAbertos",

  (SELECT COUNT(*)::INT FROM fatura b
   WHERE (b.status)::text = 'VENCIDO' AND b.data_liquid IS NULL) AS "boletosVencidos",

  (SELECT COUNT(*)::INT FROM fatura b
   WHERE (b.status)::text = 'QUITADO') AS "boletosLiquidados",

  0::INT AS "totalCobrancasManuais",

  (SELECT COALESCE(SUM(b.valor_titulo), 0)::DECIMAL(18,2) FROM fatura b
   WHERE (b.status)::text = 'ABERTO' AND b.data_liquid IS NULL) AS "valorTotalEmAberto",

  (SELECT COALESCE(SUM(b.valor_titulo), 0)::DECIMAL(18,2) FROM fatura b
   WHERE (b.status)::text = 'VENCIDO' AND b.data_liquid IS NULL) AS "valorTotalVencido",

  COALESCE((
    SELECT SUM(COALESCE(f.valor_recebido, f.valor_titulo))
    FROM fatura f
    WHERE (f.status)::text = 'QUITADO'
      AND f.data_liquid IS NOT NULL
      AND DATE_TRUNC('month', f.data_liquid::timestamp) = DATE_TRUNC('month', NOW())
  ), 0)::DECIMAL(18,2) AS "valorTotalRecebidoMes",

  COALESCE((
    SELECT SUM(COALESCE(f.valor_recebido, f.valor_titulo))
    FROM fatura f
    WHERE (f.status)::text = 'QUITADO'
      AND f.data_liquid IS NOT NULL
      AND EXTRACT(YEAR FROM f.data_liquid::timestamp) = EXTRACT(YEAR FROM NOW())
  ), 0)::DECIMAL(18,2) AS "valorTotalRecebidoAno",

  0::DECIMAL(18,2) AS "valorCobrancasManuaisAberto",

  (SELECT started_at FROM sync_runs ORDER BY started_at DESC NULLS LAST LIMIT 1) AS "ultimoSync",
  (SELECT status::TEXT FROM sync_runs ORDER BY started_at DESC NULLS LAST LIMIT 1) AS "statusUltimoSync";


-- ---------------------------------------------------------------------------
-- 2. Inadimplência por faixa de atraso (faturas em aberto/vencidas, vencimento passado)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_inadimplencia AS
WITH inadimplentes AS (
  SELECT
    b.cod_boleto,
    b.valor_titulo,
    cp.customer_id AS cod_cessionario,
    CASE
      WHEN CURRENT_DATE - b.due_date BETWEEN 1  AND 30  THEN '1-30 dias'
      WHEN CURRENT_DATE - b.due_date BETWEEN 31 AND 60  THEN '31-60 dias'
      WHEN CURRENT_DATE - b.due_date BETWEEN 61 AND 90  THEN '61-90 dias'
      ELSE '90+ dias'
    END AS faixa
  FROM fatura b
  JOIN customer_plans cp ON cp.cod_cessionario_plano = b.plan_id
  WHERE (b.status)::text IN ('ABERTO', 'VENCIDO')
    AND b.data_liquid IS NULL
    AND b.due_date < CURRENT_DATE
)
SELECT
  faixa                                                         AS "faixaAtraso",
  COUNT(cod_boleto)::INT                                        AS "totalBoletos",
  COUNT(DISTINCT cod_cessionario)::INT                          AS "totalClientes",
  COALESCE(SUM(valor_titulo), 0)::DECIMAL(18,2) AS "valorTotal"
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
-- 3. Recebimentos mensais — últimos 12 meses (faturas quitadas)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_recebimento_mensal AS
SELECT
  TO_CHAR(DATE_TRUNC('month', f.data_liquid::timestamp), 'YYYY-MM') AS "anoMes",
  COUNT(*)::INT                                              AS "totalBoletos",
  COALESCE(SUM(COALESCE(f.valor_recebido, f.valor_titulo)), 0)::DECIMAL(18,2) AS "valorRecebido",
  0::INT AS "origemAsaas",
  0::INT AS "origemSistema"
FROM fatura f
WHERE (f.status)::text = 'QUITADO'
  AND f.data_liquid IS NOT NULL
  AND f.data_liquid >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', f.data_liquid::timestamp)
ORDER BY DATE_TRUNC('month', f.data_liquid::timestamp) DESC;
