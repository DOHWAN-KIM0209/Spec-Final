import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';
import fs from 'fs';

// 현재 환경을 기준으로 경로 결정 (개발 vs 빌드)
const isCompiled = fs.existsSync(path.join(__dirname, 'routes'));
const apiPath = isCompiled
  ? path.join(__dirname, 'routes', '*.js') // 빌드된 JS 파일
  : path.join(__dirname, '..', 'src', 'routes', '*.ts'); // 개발 중 TS 파일

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Interview Backend API',
      version: '1.0.0',
      description: 'AI 면접 백엔드 API 문서입니다.',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [apiPath],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
