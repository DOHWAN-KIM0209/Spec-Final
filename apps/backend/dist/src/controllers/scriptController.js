"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserScripts = exports.createScript = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createScript = async (req, res) => {
    const { userId, questionId, script } = req.body;
    try {
        const created = await prisma.commonScript.create({
            data: {
                userId,
                questionId,
                script,
            },
        });
        res.status(201).json({ message: '스크립트 저장 완료', data: created });
    }
    catch (err) {
        res.status(400).json({ error: '스크립트 저장 실패', details: err });
    }
};
exports.createScript = createScript;
const getUserScripts = async (req, res) => {
    const userId = Number(req.params.userId);
    const scripts = await prisma.commonScript.findMany({
        where: { userId },
        include: {
            question: true,
        },
    });
    res.json(scripts);
};
exports.getUserScripts = getUserScripts;
