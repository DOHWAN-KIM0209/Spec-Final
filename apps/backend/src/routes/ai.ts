import express, { Request, Response } from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const router = express.Router();
const upload = multer();

interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

// POST /api/ai/interview-analysis
router.post('/interview-analysis', upload.fields([
  { name: 'analysisRequestDto' },
  { name: 'video' }
]), async (req: Request, res: Response): Promise<void> => {
  try {
    const form = new FormData();
    const files = req.files as MulterFiles;

    const dto = req.body.analysisRequestDto;
    const videoFile = files['video']?.[0];

    if (!dto || !videoFile) {
      res.status(400).json({ error: 'analysisRequestDto 또는 video 파일이 누락되었습니다.' });
      return;
    }

    form.append('analysisRequestDto', dto);
    form.append('video', videoFile.buffer, {
      filename: videoFile.originalname,
      contentType: videoFile.mimetype,
    });

    const aiResponse = await axios.post(
      'https://spec-ai-production.up.railway.app/predict',
      form,
      { headers: form.getHeaders() }
    );

    res.json(aiResponse.data);

  } catch (error: any) {
    console.error('[AI 분석 중계 실패]', error.message);
    res.status(500).json({ error: 'AI 분석 요청 실패' });
  }
});

export default router;
