FROM python:3.11-slim

# 시스템 필수 패키지 설치
RUN apt-get update && apt-get install -y \
    gcc \
    ffmpeg \
    libgl1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Poetry 설치
ENV POETRY_VERSION=1.8.2
RUN pip install "poetry==$POETRY_VERSION"

# 작업 디렉토리 설정
WORKDIR /app

# Poetry 가상환경 비활성화 (전역 설치)
ENV POETRY_VIRTUALENVS_CREATE=false

# 소스 코드 및 pyproject 파일 전체 복사
COPY . /app

# 의존성 설치 (dev, ai 포함)
RUN poetry install --no-root --with dev,ai

# 포트 설정
EXPOSE 8000

# 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]