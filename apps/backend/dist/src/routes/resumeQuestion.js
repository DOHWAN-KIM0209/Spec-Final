"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// 이력서 질문 전체 조회
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
// 이력서 질문 등록
router.post('/', async (req, res) => {
    try {
        const { resumeId, question } = req.body;
        const newQuestion = await prisma.resumeQuestion.create({
            data: {
                resumeId: BigInt(resumeId),
                question,
            },
        });
        res.json(newQuestion);
    }
    catch (err) {
        res.status(500).json({ error: '이력서 질문 등록 실패' });
    }
});
exports.default = router;
