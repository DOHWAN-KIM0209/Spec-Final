"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// 이메일 중복 체크
router.get('/', (req, res) => {
    const email = req.query.email;
    // TODO: email 중복 체크 로직 작성
    // 예: 데이터베이스에서 email 확인 후 결과 리턴
    res.json({ duplicate: false }); // 예시 응답
});
// 이메일 인증 요청
router.post('/', (req, res) => {
    const { email } = req.body;
    // TODO: 인증 코드 발송 로직 작성
    res.json({ success: true });
});
// 인증 코드 검증
router.post('/verify', (req, res) => {
    const { email, authorizationCode } = req.body;
    // TODO: 인증 코드 검증 로직 작성
    res.json({ verified: true });
});
exports.default = router;
