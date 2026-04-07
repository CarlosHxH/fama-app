# fama-app

Aplicação web (portal de cobrança) em **Next.js**, com área autenticada, integração **Asaas** (PIX) e API **tRPC**. O login é feito **apenas com CPF ou CNPJ** (11 ou 14 dígitos), **sem palavra-passe** — o fluxo usa NextAuth com credenciais normalizadas no servidor.

Baseada no [T3 Stack](https://create.t3.gg/) (`create-t3-app`).

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [NextAuth.js](https://next-auth.js.org) v5
- [Prisma](https://prisma.io) + PostgreSQL
- [tRPC](https://trpc.io) + TanStack Query
- [Tailwind CSS](https://tailwindcss.com)

## Pré-requisitos

- Node.js e npm (ver `packageManager` em `package.json`)
- PostgreSQL em execução (URL em `DATABASE_URL`)

## Configuração rápida

1. Copie o ficheiro de ambiente e preencha os valores:

   ```bash
   cp .env.example .env
   ```

2. Variáveis essenciais: `DATABASE_URL`, `AUTH_SECRET` (ex.: `npx auth secret`). Para cobrança e webhooks, configure `ASAAS_*` conforme `.env.example`.

3. Base de dados e utilizador de seed:

   ```bash
   npm run db:generate
   npm run db:seed
   ```

   O seed usa `SEED_ADMIN_CPF_CNPJ` (apenas dígitos). Consulte comentários em `.env.example`.

4. Arranque em desenvolvimento:

   ```bash
   npm run dev
   ```

   Abra [http://localhost:3000](http://localhost:3000) e faça login em `/login` com o CPF/CNPJ configurado no seed.

### Textos e apoio na página de login (opcional)

Variáveis `NEXT_PUBLIC_*` em `.env.example` (`APP_NAME`, `ORG_FOOTER`, telefone/WhatsApp de suporte).

### Se o dev server falhar com erros `ENOENT` em `.next`

Limpe a pasta de build e reinicie:

```bash
npm run dev:fresh
```

## Scripts úteis

| Comando | Descrição |
| -------- | ---------- |
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run dev:clean` / `npm run dev:fresh` | Limpar `.next` e (opcionalmente) voltar a arrancar |
| `npm run build` / `npm run start` | Build e produção local |
| `npm run check` | ESLint + `tsc --noEmit` |
| `npm test` | Testes Jest |
| `npm run db:studio` | Prisma Studio |

## Documentação adicional

- [Documentação T3](https://create.t3.gg/)
- Novas variáveis de ambiente: alinhar com `src/env.js` (schema `@t3-oss/env-nextjs`)

## Deploy

Guias gerais: [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify), [Docker](https://create.t3.gg/en/deployment/docker).
