"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserResumes = exports.uploadResume = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const uploadResume = async (req, res) => {
    const { userId, name, filePath } = req.body;
    try {
        const resume = await prisma.resume.create({
            data: {
                userId,
                name,
                filePath
            }
        });
        res.status(201).json({ message: '이력서 등록 완료', data: resume });
    }
    catch (error) {
        res.status(400).json({ error: '이력서 등록 실패', details: error });
    }
};
exports.uploadResume = uploadResume;
const getUserResumes = async (req, res) => {
    const userId = Number(req.params.userId);
    const resumes = await prisma.resume.findMany({
        where: { userId }
    });
    res.json(resumes);
};
exports.getUserResumes = getUserResumes;
