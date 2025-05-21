# 1. Python 3.11 기반 이미지
FROM python:3.11-slim

# 2. 필수 시스템 패키지 설치 (예: ffmpeg, gcc 등)
RUN apt-get update && apt-get install -y \
    gcc \
    ffmpeg \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# 3. Poetry 설치
ENV POETRY_VERSION=1.8.2
RUN pip install "poetry==$POETRY_VERSION"

# 4. 작업 디렉토리 설정
WORKDIR /app

# 5. Poetry 설정: 가상환경 비활성화 (시스템에 설치되게)
ENV POETRY_VIRTUALENVS_CREATE=false

# 6. pyproject.toml 및 poetry.lock 복사
COPY pyproject.toml poetry.lock* /app/

# 7. 의존성 전부 설치 (dev + optional 포함해서)
RUN poetry install --no-root --with dev,ai

# 8. 나머지 소스 복사
COPY . /app

# 9. 기본 실행 명령 (예시)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]