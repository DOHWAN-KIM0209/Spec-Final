# --- 1단계: Build ---
FROM python:3.11-slim AS builder
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Poetry 설치 및 패키지 설치
COPY pyproject.toml poetry.lock ./
RUN apt-get update && apt-get install -y \
    libquadmath0 libgomp1 \
 && pip install --no-cache-dir poetry \
 && poetry config virtualenvs.create false \
 && poetry install --without dev,ai --no-root

# 소스 복사
COPY . .

# --- 2단계: Runtime ---
FROM python:3.11-slim
WORKDIR /app

ENV PYTHONUNBUFFERED=1

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin/poetry /usr/local/bin/poetry
COPY --from=builder /app /app

# 러닝 타임용 의존 패키지 설치
RUN apt-get update && apt-get install -y \
    libquadmath0 libgomp1 libgl1-mesa-glx libglib2.0-0 ffmpeg

CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
