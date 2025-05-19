FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# 사전 생성된 Prisma Client 및 schema 포함
COPY prisma apps/backend/prisma
COPY . .

# 이미 생성된 Prisma Client 사용 → generate 생략
RUN npm run build

CMD ["npm", "start"]
