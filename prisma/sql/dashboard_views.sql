-- =============================================================================
-- prisma/sql/dashboard_views.sql
--
-- Cria as 3 views do dashboard no PostgreSQL.
-- Execute após `prisma migrate dev` com:
--   psql $DATABASE_URL -f prisma/sql/dashboard_views.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. KPIs principais do dashboard
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_kpi AS
SELECT
  1::INT AS id,

  COUNT(DISTINCT c.id)::INT AS "totalClientes",

  COUNT(DISTINCT CASE
    WHEN b.situacao IN ('ABERTO','VENCIDO') AND b."dataLiquidacao" IS NULL
    THEN c.id END)::INT AS "clientesAtivos",

  (COUNT(DISTINCT b.id) + COUNT(DISTINCT cm.id))::INT AS "totalBoletos",

  COUNT(DISTINCT CASE WHEN b.situacao = 'ABERTO'    AND b."dataLiquidacao" IS NULL THEN b.id END)::INT AS "boletosAbertos",
  COUNT(DISTINCT CASE WHEN b.situacao = 'VENCIDO'   AND b."dataLiquidacao" IS NULL THEN b.id END)::INT AS "boletosVencidos",
  COUNT(DISTINCT CASE WHEN b.situacao = 'LIQUIDADO' THEN b.id END)::INT                               AS "boletosLiquidados",
  COUNT(DISTINCT cm.id)::INT AS "totalCobrancasManuais",

  COALESCE(SUM(CASE
    WHEN b.situacao = 'ABERTO' AND b."dataLiquidacao" IS NULL
    THEN COALESCE(b."valorComAcrescimos", b."valorTitulo") ELSE 0 END), 0)::DECIMAL(18,2) AS "valorTotalEmAberto",

  COALESCE(SUM(CASE
    WHEN b.situacao = 'VENCIDO' AND b."dataLiquidacao" IS NULL
    THEN COALESCE(b."valorComAcrescimos", b."valorTitulo") ELSE 0 END), 0)::DECIMAL(18,2) AS "valorTotalVencido",

  COALESCE((
    SELECT SUM(COALESCE("valorRecebido", "valorTitulo"))
    FROM boletos
    WHERE situacao = 'LIQUIDADO'
      AND DATE_TRUNC('month', "dataLiquidacao") = DATE_TRUNC('month', NOW())
  ), 0)::DECIMAL(18,2) AS "valorTotalRecebidoMes",

  COALESCE((
    SELECT SUM(COALESCE("valorRecebido", "valorTitulo"))
    FROM boletos
    WHERE situacao = 'LIQUIDADO'
      AND EXTRACT(YEAR FROM "dataLiquidacao") = EXTRACT(YEAR FROM NOW())
  ), 0)::DECIMAL(18,2) AS "valorTotalRecebidoAno",

  COALESCE(SUM(CASE
    WHEN cm.situacao = 'ABERTO' AND cm."dataLiquidacao" IS NULL
    THEN cm.valor ELSE 0 END), 0)::DECIMAL(18,2) AS "valorCobrancasManuaisAberto",

  (SELECT "executadoEm" FROM sync_logs ORDER BY "executadoEm" DESC LIMIT 1) AS "ultimoSync",
  (SELECT status::TEXT  FROM sync_logs ORDER BY "executadoEm" DESC LIMIT 1) AS "statusUltimoSync"

FROM cessionarios c
LEFT JOIN cessionarios_planos cp ON cp."cessionarioId" = c.id
LEFT JOIN boletos b              ON b."cessionarioPlanoId" = cp.id
LEFT JOIN cobrancas_manuais cm   ON cm."cessionarioId" = c.id;


-- ---------------------------------------------------------------------------
-- 2. Inadimplência por faixa de atraso
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_inadimplencia AS
WITH inadimplentes AS (
  SELECT
    b.id,
    b."valorComAcrescimos",
    b."valorTitulo",
    cp."cessionarioId",
    CASE
      WHEN CURRENT_DATE - b."dataVencimento"::DATE BETWEEN 1  AND 30  THEN '1-30 dias'
      WHEN CURRENT_DATE - b."dataVencimento"::DATE BETWEEN 31 AND 60  THEN '31-60 dias'
      WHEN CURRENT_DATE - b."dataVencimento"::DATE BETWEEN 61 AND 90  THEN '61-90 dias'
      ELSE '90+ dias'
    END AS faixa
  FROM boletos b
  JOIN cessionarios_planos cp ON cp.id = b."cessionarioPlanoId"
  WHERE b.situacao IN ('ABERTO', 'VENCIDO')
    AND b."dataLiquidacao" IS NULL
    AND b."dataVencimento" < CURRENT_DATE
)
SELECT
  faixa                                                         AS "faixaAtraso",
  COUNT(id)::INT                                                AS "totalBoletos",
  COUNT(DISTINCT "cessionarioId")::INT                          AS "totalClientes",
  COALESCE(SUM(COALESCE("valorComAcrescimos", "valorTitulo")), 0)::DECIMAL(18,2) AS "valorTotal"
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
-- 3. Recebimentos mensais — últimos 12 meses
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_dashboard_recebimento_mensal AS
SELECT
  TO_CHAR(DATE_TRUNC('month', "dataLiquidacao"), 'YYYY-MM') AS "anoMes",
  COUNT(*)::INT                                              AS "totalBoletos",
  COALESCE(SUM(COALESCE("valorRecebido", "valorTitulo")), 0)::DECIMAL(18,2) AS "valorRecebido",
  COUNT(CASE WHEN "origemPagamento" = 'ASAAS'           THEN 1 END)::INT AS "origemAsaas",
  COUNT(CASE WHEN "origemPagamento" = 'SISTEMA_INTERNO' THEN 1 END)::INT AS "origemSistema"
FROM boletos
WHERE situacao = 'LIQUIDADO'
  AND "dataLiquidacao" >= NOW() - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', "dataLiquidacao")
ORDER BY DATE_TRUNC('month', "dataLiquidacao") DESC;
