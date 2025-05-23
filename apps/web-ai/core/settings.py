from pydantic import DirectoryPath, Field, MariaDBDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    DEBUG: bool = False

    # Server variables
    API_V1_STR: str = Field("/ai")
    DATA_HOME: DirectoryPath

    TZ: str = "Asia/Seoul"

    # Analysis variables
    FPS: int = Field(1, ge=1)

    # Database variables
    MARIADB_DSN: MariaDBDsn
    MARIADB_POOL_SIZE: int = Field(10, ge=1)
    MARIADB_MAX_OVERFLOW: int = Field(5, ge=1)
    REDIS_HOST: str
    REDIS_PORT: int = Field(6379, ge=1, le=65535)
    REDIS_DB: int = Field(0, ge=0, le=15)
    REDIS_PASSWORD: str
    REDIS_MAX_CONN: int = Field(10, ge=1)
    REDIS_EXPIRE_SECOND: int = Field(60 * 60 * 24, gt=60)  # 24h

    # Build variables
    REGISTRY: str
    IMG_NAME: str

    # OpenAI API Key 추가
    OPENAI_API_KEY: SecretStr  # SecretStr을 사용하여 보안 강화

settings = Settings()  # .env 파일에서 값을 읽어 설정 객체 생성
