# --- 1단계: Build ---
FROM node:18 AS builder

WORKDIR /apps/backend

# tsconfig, prisma, package.json 복사
COPY apps/backend/package*.json ./
COPY apps/backend/tsconfig.json ./
COPY apps/backend/prisma ./prisma
COPY apps/backend/src ./src

# 의존성 설치 및 빌드
RUN npm install
RUN npx tsc

# --- 2단계: Runtime ---
FROM node:18

WORKDIR /apps/backend

# 실행에 필요한 것만 복사
COPY --from=builder /apps/backend/dist ./dist
COPY --from=builder /apps/backend/node_modules ./node_modules
COPY --from=builder /apps/backend/package*.json ./

# 시작 명령
CMD ["node", "dist/index.js"]
