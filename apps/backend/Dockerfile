FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY . .

RUN npm install --omit=dev
RUN npx prisma generate
RUN npm run build

CMD ["npm", "start"]
