FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# prisma 디렉토리 반드시 복사
COPY prisma ./prisma

# 전체 소스 복사 (prisma 이후)
COPY . .

RUN npx prisma generate
RUN npm run build

ENV PORT=4000

CMD ["npm", "start"]
