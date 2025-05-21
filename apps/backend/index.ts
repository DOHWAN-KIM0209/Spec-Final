import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import authRoutes from './src/routes/auth';
import emailRouter from './src/routes/email';
import questionRoutes from './src/routes/question';
import scriptRoutes from './src/routes/script';
import resumeRoutes from './src/routes/resume';
import commonQuestionRouter from './src/routes/commonQuestion';
import commonScriptRouter from './src/routes/commonScript';
import commonKeywordRouter from './src/routes/commonKeyword';
import resumeQuestionRouter from './src/routes/resumeQuestion';
import resumeScriptRouter from './src/routes/resumeScript';
import resumeKeywordRouter from './src/routes/resumeKeyword';
import analysisRouter from './src/routes/analysis';
import uploadRouter from './src/routes/upload';
import uploadAnalysisRouter from './src/routes/uploadAnalysis';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const BASE_URL = process.env.BASE_URL || `https://${process.env.RAILWAY_STATIC_URL || 'localhost:4000'}`;

app.use(cors({
  origin: ['https://spec-web-production.up.railway.app'],
  credentials: true,
}));
app.use(express.json());

// ✅ API 라우터
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRouter);
app.use('/api/questions', questionRoutes);
app.use('/api/scripts', scriptRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/common-questions', commonQuestionRouter);
app.use('/api/common-scripts', commonScriptRouter);
app.use('/api/common-keywords', commonKeywordRouter);
app.use('/api/resume-questions', resumeQuestionRouter);
app.use('/api/resume-scripts', resumeScriptRouter);
app.use('/api/resume-keywords', resumeKeywordRouter);
app.use('/api/analyses', analysisRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/upload-analysis', uploadAnalysisRouter);

// ✅ 기존 정적 파일
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ✅ 프론트엔드 정적 파일 서빙 (Vite 빌드 결과)
const frontendPath = path.join(__dirname, '..', 'apps', 'web', 'dist');

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  console.warn('❌ Frontend dist not found at:', frontendPath);
}

// ✅ Swagger 설정
setupSwagger(app);

// ✅ 서버 실행
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on ${BASE_URL}`);
});
