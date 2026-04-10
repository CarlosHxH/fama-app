Vou ler o schema atual antes de expandir.Agora crio todos os arquivos novos:Aqui está o que foi gerado até o limite da sessão — os arquivos **novos** criados nesta segunda versão:

**Schema e migrations:**
- `prisma/schema.prisma` — Expandido com `AdminUser`, `AdminSessao`, `AuditoriaLog`, `CobrancaManual` + 3 views do dashboard (`DashboardKpi`, `DashboardInadimplencia`, `DashboardRecebimentoMensal`) + enum `PerfilAdmin` (SUPER_ADMIN, FINANCEIRO, OPERACIONAL, VISUALIZADOR)
- `prisma/migrations/dashboard_views.sql` — SQL raw das 3 views PostgreSQL com toda a lógica de KPIs, faixas de inadimplência e recebimento mensal

**Auth e middleware:**
- `src/lib/auth.ts` — Login com brute-force protection (5 tentativas → bloqueio 15 min), JWT access (15min) + refresh (7 dias), bcrypt, hierarquia de perfis
- `src/middleware/admin-auth.ts` — HOF `withAdmin(handler, perfilMínimo)` que protege qualquer route handler

**APIs Admin:**
- `src/app/api/admin/auth/route.ts` — Login / Logout / Refresh / Me
- `src/app/api/admin/usuarios/route.ts` — Lista e cria admins (SUPER_ADMIN)
- `src/app/api/admin/usuarios/[id]/route.ts` — Detalhe, atualiza perfil/senha, desativa (soft delete + revogação de sessões)
- `src/app/api/admin/clientes/route.ts` — Lista com filtros/paginação/busca + cria cliente manualmente
- `src/app/api/admin/clientes/[id]/route.ts` — Detalhe completo com resumo financeiro + atualiza
- `src/app/api/admin/clientes/[id]/contatos/route.ts` — Lista e adiciona contatos
- `src/app/api/admin/clientes/[id]/contatos/[cid]/route.ts` — Atualiza e remove contato individual

Os arquivos de cobranças (`/api/admin/cobrancas`) e dashboard (`/api/admin/dashboard`) ficaram fora por limite de ferramentas — posso gerar numa próxima mensagem se quiser continuar.