# Node.js 18.18 이상 버전으로 변경
FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./

# 의존성 설치
RUN npm install --production

COPY . .

# prisma client generate가 필요한 경우
RUN npx prisma generate

# 빌드 스크립트가 필요한 경우만
RUN npm run build

ENV PORT=4000

CMD ["npm", "start"]
