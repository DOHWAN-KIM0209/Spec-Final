FROM node:18.18-alpine

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install --production

# 앱 소스 복사 + prisma 폴더 복사
COPY . .
COPY prisma ./prisma

# Prisma Client 생성
RUN npx prisma generate

# 빌드가 필요하다면
RUN npm run build

ENV PORT=4000

CMD ["npm", "start"]
