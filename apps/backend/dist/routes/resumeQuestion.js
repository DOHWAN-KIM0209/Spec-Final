"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // ✅ 인증 미들웨어 import
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
/**
 * @swagger
 * tags:
 *   name: ResumeQuestion
 *   description: 이력서 기반 질문 API
 */
/**
 * @swagger
 * /resume-questions:
 *   get:
 *     summary: 이력서 질문 전체 조회
 *     tags: [ResumeQuestion]
 *     responses:
 *       200:
 *         description: 질문 목록 반환
 */
router.get('/', async (req, res) => {
    try {
        const questions = await prisma.resumeQuestion.findMany({
            include: {
                resume: { select: { id: true, name: true } },
            },
            orderBy: { createdTime: 'desc' },
        });
        res.json(questions);
    }
    catch (err) {
        res.status(500).json({ error: '이력서 질문 조회 실패' });
    }
});
/**
 * @swagger
 * /resume-questions:
 *   post:
 *     summary: 이력서 질문 등록
 *     tags: [ResumeQuestion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resumeId:
 *                 type: integer
 *               question:
 *                 type: string
 *     responses:
 *       200:
 *         description: 등록된 질문 반환
 */
router.post('/', authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const { resumeId, question } = req.body;
        const userId = BigInt(req.userId);
        const newQuestion = await prisma.resumeQuestion.create({
            data: {
                resumeId: BigInt(resumeId),
                question,
                userId: userId,
            },
        });
        res.status(201).json({ message: '질문 등록 성공', data: newQuestion });
    }
    catch (err) {
        res.status(500).json({ error: '이력서 질문 등록 실패', detail: err });
    }
});
exports.default = router;
