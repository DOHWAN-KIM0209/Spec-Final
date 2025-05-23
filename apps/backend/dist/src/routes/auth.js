"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authController_2 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.get('/me', authMiddleware_1.authMiddleware, authController_1.me);
router.get('/kakao', authController_2.kakaoLogin);
router.get('/kakao/callback', authController_2.kakaoCallback);
router.post('/logout', authController_1.logout);
exports.default = router;
