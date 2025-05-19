# Node.js 16 버전 알파인 이미지 사용 (경량)
FROM node:16-alpine

# 작업 디렉터리 설정
WORKDIR /app

# package.json, package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install --production

# 앱 소스 복사
COPY . .

# 환경변수 PORT 사용 가능하게 설정 (default 4000)
ENV PORT=4000

# 앱 실행
CMD ["npm", "start"]
