# --- 1단계: Build ---
FROM node:18.18-alpine AS builder

WORKDIR /app

# tsconfig, prisma, package.json 복사
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# 의존성 설치 및 빌드
RUN npm install
RUN npm run build

# --- 2단계: Runtime ---
FROM node:18.18-alpine

WORKDIR /app

# 실행에 필요한 것만 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# ENV 설정 (선택 사항)
ENV NODE_ENV=production

# 포트 설정 (선택 사항)
EXPOSE 3000

# 시작 명령
CMD ["node", "dist/index.js"]
