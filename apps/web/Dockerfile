# --- 1단계: Build ---
FROM node:18 AS builder
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 소스 복사
COPY apps/web .

# 타입스크립트 확인 및 Vite 빌드
RUN npm run build

# --- 2단계: Serve ---
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
