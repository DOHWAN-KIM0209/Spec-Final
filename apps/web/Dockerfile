# --- 1단계: Build ---
FROM node:18 AS builder
WORKDIR /app

COPY . .

# 의존성 설치
RUN npm install --legacy-peer-deps

# 빌드 (여기서 npx 등 다 사용 가능)
RUN npm run build


# --- 2단계: Serve ---
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
