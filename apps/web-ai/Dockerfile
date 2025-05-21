FROM python:3.11-slim AS builder

ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY pyproject.toml poetry.lock ./

ENV POETRY_REQUESTS_TIMEOUT=120

RUN apt-get update && \
    apt-get install -y libquadmath0 libgomp1 && \
    pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

COPY . .

FROM python:3.11-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PATH="/root/.local/bin:$PATH"

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin/ /usr/local/bin/
COPY --from=builder /app /app

RUN apt-get update && \
    apt-get install -y libquadmath0 libgomp1 libgl1-mesa-glx libglib2.0-0 ffmpeg

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
