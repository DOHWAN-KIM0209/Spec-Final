FROM node:18.18-alpine AS builder

WORKDIR /apps/backend

COPY apps/web/dist /apps/web/dist
# prisma 폴더와 package*.json을 복사
COPY apps/backend/package*.json ./ 
COPY apps/backend/prisma ./prisma
COPY apps/backend/tsconfig.json ./
COPY apps/web/src ./src

RUN npm install

COPY . .

RUN npx tsc

FROM node:18.18-alpine

WORKDIR /apps/backend

COPY --from=builder /apps/backend/dist ./dist
COPY --from=builder /apps/backend/node_modules ./node_modules

# package.json도 최종 이미지에 복사해야 npm start가 정상 작동함
COPY --from=builder /apps/backend/package.json ./
COPY --from=builder /apps/backend/package-lock.json ./

CMD ["npm", "start"]
