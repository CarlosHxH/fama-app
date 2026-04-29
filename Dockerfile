# Estágio 1: Dependências
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia arquivos de definição de pacotes
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# AJUSTE AQUI: Copia a pasta prisma antes do install para o 'prisma generate' funcionar
COPY prisma ./prisma/

RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Estágio 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY --from=deps /app/generated ./generated

COPY . .

# AJUSTE: Declare os ARGs para as variáveis que o seu config valida
ARG ASAAS_API_KEY
ARG AUTH_SECRET
ARG DATABASE_URL
# Adicione outras que o seu src/env.js exigir...

# Desativa telemetria durante o build
ENV NEXT_TELEMETRY_DISABLED 1
# Forçamos o SKIP_ENV_VALIDATION diretamente no comando de build
RUN SKIP_ENV_VALIDATION=1 npm run build

# Executa o build
# RUN npm run build

# Estágio 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os arquivos necessários do builder para o runner
COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copia o standalone e os estáticos (resolve o erro 404)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]