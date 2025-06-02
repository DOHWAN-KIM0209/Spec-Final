console.log('🟢 index.ts 실행됨');

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import authRoutes from './routes/auth';
import emailRouter from './routes/email';
import questionRoutes from './routes/question';
import scriptRoutes from './routes/script';
import resumeRoutes from './routes/resume';
import commonQuestionRouter from './routes/commonQuestion';
import commonScriptRouter from './routes/commonScript';
import commonKeywordRouter from './routes/commonKeyword';
import resumeQuestionRouter from './routes/resumeQuestion';
import resumeScriptRouter from './routes/resumeScript';
import resumeKeywordRouter from './routes/resumeKeyword';
import analysisRouter from './routes/analysis';
import uploadRouter from './routes/upload';
import uploadAnalysisRouter from './routes/uploadAnalysis';
import aiRouter from './routes/ai';
import { setupSwagger } from './swagger'; // ✅ index.ts가 src 내부에 있으므로 상대경로 수정

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const BASE_URL = process.env.BASE_URL || `https://${process.env.RAILWAY_STATIC_URL || 'localhost:4000'}`;

app.use(
  cors({
    origin: ['https://spec-web-production.up.railway.app'],
    credentials: true,
  }),
);

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
app.use('/api/ai', aiRouter);

// ✅ 정적 파일 라우팅
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// ✅ Vite 빌드 파일 정적 서빙
const frontendPath = path.join(__dirname, '../web-dist');
if (fs.existsSync(frontendPath)) {
  console.log('✅ frontendPath:', frontendPath);
  console.log('✅ exists:', fs.existsSync(frontendPath));
  app.use(express.static(frontendPath));
} else {
  console.warn('❌ Frontend dist not found at:', frontendPath);
}

app.post('/api/test', (req, res) => {
  console.log('✅ POST /api/test 도착');
  res.json({ ok: true });
});

// ✅ Swagger 설정
setupSwagger(app);

// ✅ 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on ${BASE_URL}`);
});
