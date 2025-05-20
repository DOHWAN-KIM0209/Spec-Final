# 예: apps/backend/Dockerfile

# --- 1단계: Build ---
FROM node:18 AS builder

WORKDIR /app

# 필요한 파일 복사 (루트 기준 상대 경로)
COPY apps/backend/package*.json ./
COPY apps/backend/tsconfig.json ./
COPY apps/backend/prisma ./prisma
COPY apps/backend/src ./src

# ✅ 프론트엔드 정적 파일 포함하고 싶다면
COPY apps/web ./apps/web

RUN npm install
RUN npx tsc

# --- 2단계: Runtime ---
FROM node:18

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY apps/backend/package*.json ./

# ✅ 프론트 dist도 같이 옮기고 싶다면
COPY --from=builder /app/apps/web/dist ./apps/web/dist

CMD ["node", "dist/index.js"]
