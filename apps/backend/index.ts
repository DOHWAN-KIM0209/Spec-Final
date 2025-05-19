import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import authRoutes from './src/routes/auth';
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

app.use(cors());
app.use(express.json());

// ✅ API 라우터
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/scripts', scriptRoutes);
app.use('/resumes', resumeRoutes);
app.use('/common-questions', commonQuestionRouter);
app.use('/common-scripts', commonScriptRouter);
app.use('/common-keywords', commonKeywordRouter);
app.use('/resume-questions', resumeQuestionRouter);
app.use('/resume-scripts', resumeScriptRouter);
app.use('/resume-keywords', resumeKeywordRouter);
app.use('/analyses', analysisRouter);
app.use('/upload', uploadRouter);
app.use('/upload-analysis', uploadAnalysisRouter);

// ✅ 기존 정적 파일
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ✅ 프론트엔드 정적 파일 서빙 (Vite 빌드 결과)
const frontendPath = path.join('/apps/web/dist');

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  // ✅ SPA 대응: 위 라우터와 정적 경로를 제외한 모든 요청은 index.html 응답
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ✅ Swagger 설정
setupSwagger(app);

// ✅ 서버 실행
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on ${BASE_URL}`);
});
