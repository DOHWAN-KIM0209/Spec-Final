"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('🟢 index.ts 실행됨');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = __importDefault(require("./routes/auth"));
const email_1 = __importDefault(require("./routes/email"));
const question_1 = __importDefault(require("./routes/question"));
const script_1 = __importDefault(require("./routes/script"));
const resume_1 = __importDefault(require("./routes/resume"));
const commonQuestion_1 = __importDefault(require("./routes/commonQuestion"));
const commonScript_1 = __importDefault(require("./routes/commonScript"));
const commonKeyword_1 = __importDefault(require("./routes/commonKeyword"));
const resumeQuestion_1 = __importDefault(require("./routes/resumeQuestion"));
const resumeScript_1 = __importDefault(require("./routes/resumeScript"));
const resumeKeyword_1 = __importDefault(require("./routes/resumeKeyword"));
const analysis_1 = __importDefault(require("./routes/analysis"));
const upload_1 = __importDefault(require("./routes/upload"));
const uploadAnalysis_1 = __importDefault(require("./routes/uploadAnalysis"));
const ai_1 = __importDefault(require("./routes/ai"));
const swagger_1 = require("./swagger"); // ✅ index.ts가 src 내부에 있으므로 상대경로 수정
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
const BASE_URL = process.env.BASE_URL || `https://${process.env.RAILWAY_STATIC_URL || 'localhost:4000'}`;
app.use((0, cors_1.default)({
    origin: ['https://spec-web-production.up.railway.app'],
    credentials: true,
}));
// ✅ API 라우터
app.use('/api/auth', auth_1.default);
app.use('/api/email', email_1.default);
app.use('/api/questions', question_1.default);
app.use('/api/scripts', script_1.default);
app.use('/api/resumes', resume_1.default);
app.use('/api/common-questions', commonQuestion_1.default);
app.use('/api/common-scripts', commonScript_1.default);
app.use('/api/common-keywords', commonKeyword_1.default);
app.use('/api/resume-questions', resumeQuestion_1.default);
app.use('/api/resume-scripts', resumeScript_1.default);
app.use('/api/resume-keywords', resumeKeyword_1.default);
app.use('/api/analyses', analysis_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/upload-analysis', uploadAnalysis_1.default);
app.use('/api/ai', ai_1.default);
// ✅ 정적 파일 라우팅
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// ✅ Vite 빌드 파일 정적 서빙
const frontendPath = path_1.default.join(__dirname, '../web-dist');
if (fs_1.default.existsSync(frontendPath)) {
    console.log('✅ frontendPath:', frontendPath);
    console.log('✅ exists:', fs_1.default.existsSync(frontendPath));
    app.use(express_1.default.static(frontendPath));
}
else {
    console.warn('❌ Frontend dist not found at:', frontendPath);
}
app.post('/api/test', (req, res) => {
    console.log('✅ POST /api/test 도착');
    res.json({ ok: true });
});
// ✅ Swagger 설정
(0, swagger_1.setupSwagger)(app);
// ✅ 서버 시작
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on ${BASE_URL}`);
});
