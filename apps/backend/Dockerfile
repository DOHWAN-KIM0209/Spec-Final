# --- 1단계: Build ---
FROM node:18 AS builder
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 복사
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# 타입스크립트 빌드
RUN npx tsc

# --- 2단계: Runtime ---
FROM node:18-slim
WORKDIR /app

# 빌드 산출물 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY apps/backend/package*.json ./

CMD ["node", "dist/index.js"]
