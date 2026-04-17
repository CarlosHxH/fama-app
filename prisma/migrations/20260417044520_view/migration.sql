-- =============================================================================
-- View: vw_responsaveis_financeiros
-- Lista todos os responsáveis financeiros com dados completos do customer,
-- contrato e jazigos sob responsabilidade.
-- =============================================================================

CREATE OR REPLACE VIEW vw_responsaveis_financeiros AS
SELECT
  -- Responsável
  rf.id                          AS responsavel_id,
  rf.motivo,

  -- Customer (responsável financeiro)
  c.id                           AS customer_id,
  c.nome                         AS responsavel_nome,
  c.cpf_cnpj                     AS responsavel_cpf,
  c.email                        AS responsavel_email,
  c.ativo                        AS responsavel_ativo,
  c.primeiro_acesso,

  -- Contrato
  ct.id                          AS contrato_id,
  ct.numero_contrato,
  ct.situacao                    AS contrato_situacao,

  -- Titular do contrato (pode ser diferente do responsável financeiro)
  ct_cust.id                     AS titular_id,
  ct_cust.nome                   AS titular_nome,
  ct_cust.cpf_cnpj               AS titular_cpf,

  -- Telefones do responsável (primeiro encontrado)
  (
    SELECT cp.numero
    FROM customer_phones cp
    WHERE cp.customer_id = c.id
    ORDER BY CASE cp.tipo
      WHEN 'WHATSAPP' THEN 1
      WHEN 'CELULAR'  THEN 2
      WHEN 'FIXO'     THEN 3
    END
    LIMIT 1
  )                              AS responsavel_telefone,

  -- Jazigos vinculados ao contrato
  (
    SELECT COUNT(*)
    FROM jazigos j
    WHERE j.contrato_id = ct.id
  )                              AS total_jazigos,

  -- Valor total de mensalidade dos jazigos
  (
    SELECT COALESCE(SUM(j.valor_mensalidade), 0)
    FROM jazigos j
    WHERE j.contrato_id = ct.id
  )                              AS valor_total_mensalidade,

  -- Pagamentos em atraso
  (
    SELECT COUNT(*)
    FROM pagamentos p
    WHERE p.contrato_id = ct.id
      AND p.status = 'ATRASADO'
  )                              AS pagamentos_atrasados,

  -- Pagamentos pendentes
  (
    SELECT COUNT(*)
    FROM pagamentos p
    WHERE p.contrato_id = ct.id
      AND p.status = 'PENDENTE'
  )                              AS pagamentos_pendentes,

  rf.synced_at,
  rf.created_at,
  rf.updated_at

FROM responsaveis_financeiros rf
INNER JOIN customers  c       ON c.id       = rf.customer_id
INNER JOIN contratos  ct      ON ct.id      = rf.contrato_id
INNER JOIN customers  ct_cust ON ct_cust.id = ct.customer_id

ORDER BY c.nome;

-- Índice de apoio para a subquery de pagamentos (se ainda não existir)
-- CREATE INDEX IF NOT EXISTS idx_pagamentos_contrato_status ON pagamentos (contrato_id, status);
