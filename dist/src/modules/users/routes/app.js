"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const router = (0, express_1.default)();
router.post('/registration/send-otp-code', index_1.default.phoneAuth);
router.post('/registration/confirm-otp-code', index_1.default.confirmOtpCode);
router.post('/registration/set-user-meta', index_1.default.addUserMeta);
// Login user
router.post('/login', index_1.default.login);
router.get('/fake', index_1.default.index);
exports.default = router;
