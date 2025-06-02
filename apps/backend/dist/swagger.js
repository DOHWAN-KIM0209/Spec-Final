"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// 현재 환경을 기준으로 경로 결정 (개발 vs 빌드)
const isCompiled = fs_1.default.existsSync(path_1.default.join(__dirname, 'routes'));
const apiPath = isCompiled
    ? path_1.default.join(__dirname, 'routes', '*.js') // 빌드된 JS 파일
    : path_1.default.join(__dirname, '..', 'src', 'routes', '*.ts'); // 개발 중 TS 파일
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
const specs = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.setupSwagger = setupSwagger;
