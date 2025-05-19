"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = __importDefault(require("./src/routes/auth"));
const question_1 = __importDefault(require("./src/routes/question"));
const script_1 = __importDefault(require("./src/routes/script"));
const resume_1 = __importDefault(require("./src/routes/resume"));
const commonQuestion_1 = __importDefault(require("./src/routes/commonQuestion"));
const commonScript_1 = __importDefault(require("./src/routes/commonScript"));
const commonKeyword_1 = __importDefault(require("./src/routes/commonKeyword"));
const resumeQuestion_1 = __importDefault(require("./src/routes/resumeQuestion"));
const resumeScript_1 = __importDefault(require("./src/routes/resumeScript"));
const resumeKeyword_1 = __importDefault(require("./src/routes/resumeKeyword"));
const analysis_1 = __importDefault(require("./src/routes/analysis"));
const upload_1 = __importDefault(require("./src/routes/upload"));
const uploadAnalysis_1 = __importDefault(require("./src/routes/uploadAnalysis"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
const BASE_URL = process.env.BASE_URL || `https://${process.env.RAILWAY_STATIC_URL || 'localhost:4000'}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ API 라우터
app.use('/auth', auth_1.default);
app.use('/questions', question_1.default);
app.use('/scripts', script_1.default);
app.use('/resumes', resume_1.default);
app.use('/common-questions', commonQuestion_1.default);
app.use('/common-scripts', commonScript_1.default);
app.use('/common-keywords', commonKeyword_1.default);
app.use('/resume-questions', resumeQuestion_1.default);
app.use('/resume-scripts', resumeScript_1.default);
app.use('/resume-keywords', resumeKeyword_1.default);
app.use('/analyses', analysis_1.default);
app.use('/upload', upload_1.default);
app.use('/upload-analysis', uploadAnalysis_1.default);
// ✅ 기존 정적 파일
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
// ✅ 프론트엔드 정적 파일 서빙 (Vite 빌드 결과)
const frontendPath = path_1.default.join(__dirname, '../../web/dist');
if (fs_1.default.existsSync(frontendPath)) {
    app.use(express_1.default.static(frontendPath));
    // ✅ SPA 대응: 위 라우터와 정적 경로를 제외한 모든 요청은 index.html 응답
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(frontendPath, 'index.html'));
    });
}
// ✅ Swagger 설정
(0, swagger_1.setupSwagger)(app);
// ✅ 서버 실행
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on ${BASE_URL}`);
});
