# 1단계: 빌드 스테이지
FROM node:18.18-alpine AS builder

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install --production

# Prisma 스키마 복사 및 Client 생성
COPY prisma ./prisma
RUN npx prisma generate

# 애플리케이션 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: 실행 스테이지
FROM node:18.18-alpine

WORKDIR /app

# 빌드된 파일과 node_modules 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# 애플리케이션 실행
CMD ["npm", "start"]