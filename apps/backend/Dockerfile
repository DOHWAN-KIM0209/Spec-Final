FROM node:18.18-alpine AS builder
WORKDIR /apps
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.18-alpine
WORKDIR /apps
COPY --from=builder /apps/dist ./dist
COPY --from=builder /apps/node_modules ./node_modules
CMD ["npm", "start"]
