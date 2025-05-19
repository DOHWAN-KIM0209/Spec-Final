# Node.js 18.18 이상으로 설정 (Prisma 요구사항)
FROM node:18.18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 lock 파일 먼저 복사 → 캐시 활용
COPY package*.json ./

# 의존성 설치
RUN npm install --production

# 🔥 prisma 스키마를 명시적으로 복사
COPY prisma ./prisma

# 나머지 소스 복사
COPY . .

# Prisma client 생성
RUN npx prisma generate

# 앱 빌드 (NestJS면 build 스크립트 포함 전제)
RUN npm run build

# 앱 실행
CMD ["npm", "start"]
