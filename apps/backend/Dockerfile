FROM node:18.18-alpine AS builder

WORKDIR /apps/backend

# 백엔드 관련 파일만 복사
COPY apps/backend/package*.json ./
COPY apps/backend/tsconfig.json ./
COPY apps/backend/prisma ./prisma
COPY apps/backend/src ./src

RUN npm install
RUN npx tsc

FROM node:18.18-alpine

WORKDIR /apps/backend

COPY --from=builder /apps/backend/dist ./dist
COPY --from=builder /apps/backend/node_modules ./node_modules
COPY --from=builder /apps/backend/package.json ./
COPY --from=builder /apps/backend/package-lock.json ./

CMD ["npm", "start"]
