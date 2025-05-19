"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsByCategory = exports.getAllQuestions = exports.createQuestion = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// 공통 질문 등록
const createQuestion = async (req, res) => {
    const { category, question } = req.body;
    let foundCategory = await prisma.commonCategory.findUnique({ where: { category } });
    if (!foundCategory) {
        foundCategory = await prisma.commonCategory.create({ data: { category } });
    }
    const created = await prisma.commonQuestion.create({
        data: {
            categoryId: foundCategory.id,
            question,
        },
    });
    res.status(201).json(created);
};
exports.createQuestion = createQuestion;
// 전체 질문 조회
const getAllQuestions = async (req, res) => {
    const questions = await prisma.commonQuestion.findMany({
        include: { category: true },
    });
    res.json(questions);
};
exports.getAllQuestions = getAllQuestions;
// 카테고리별 질문 조회
const getQuestionsByCategory = async (req, res) => {
    const { category } = req.params;
    const foundCategory = await prisma.commonCategory.findUnique({ where: { category } });
    if (!foundCategory) {
        res.status(404).json({ error: '카테고리 없음' });
        return;
    }
    const questions = await prisma.commonQuestion.findMany({
        where: { categoryId: foundCategory.id },
    });
    res.json(questions);
};
exports.getQuestionsByCategory = getQuestionsByCategory;
