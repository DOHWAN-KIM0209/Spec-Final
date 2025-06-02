"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
// POST /api/ai/interview-analysis
router.post('/interview-analysis', upload.fields([
    { name: 'analysisRequestDto' },
    { name: 'video' }
]), async (req, res) => {
    try {
        const form = new form_data_1.default();
        const files = req.files;
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
        const aiResponse = await axios_1.default.post('https://spec-ai-production.up.railway.app/predict', form, { headers: form.getHeaders() });
        res.json(aiResponse.data);
    }
    catch (error) {
        console.error('[AI 분석 중계 실패]', error.message);
        res.status(500).json({ error: 'AI 분석 요청 실패' });
    }
});
exports.default = router;
