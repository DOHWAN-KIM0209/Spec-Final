FROM node:18.18-alpine AS builder
WORKDIR /apps/backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.18-alpine
WORKDIR /apps/backend
COPY --from=builder /apps/backend/dist ./dist
COPY --from=builder /apps/backend/node_modules ./node_modules
CMD ["npm", "start"]
