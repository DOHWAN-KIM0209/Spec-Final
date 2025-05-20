# --- 1단계: Build ---
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npm install
RUN npx tsc

# --- 2단계: Runtime ---
FROM node:18

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

CMD ["node", "index.js"]
