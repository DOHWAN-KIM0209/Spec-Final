FROM node:18.18-alpine AS builder

WORKDIR /apps/backend

# 백엔드 관련 파일만 복사
COPY tsconfig.json ./
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src

RUN npm install
RUN npx tsc

FROM node:18.18-alpine

WORKDIR /apps/backend

COPY --from=builder dist ./dist
COPY --from=builder node_modules ./node_modules
COPY --from=builder package.json ./
COPY --from=builder package-lock.json ./

CMD ["npm", "start"]
