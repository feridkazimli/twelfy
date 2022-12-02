"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmOtp = void 0;
const AppDataSource_1 = __importDefault(require("../../../../AppDataSource"));
const entity_1 = require("../entity");
class ConfirmOtp {
    static checkOtpByUserIdAndOtpCode({ userId, otpCode }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppDataSource_1.default.manager.findOne(entity_1.UserOtp, {
                where: {
                    user: {
                        id: userId
                    },
                    otp_code: otpCode
                }
            });
        });
    }
    static confirmUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield AppDataSource_1.default.manager.createQueryBuilder()
                .update(entity_1.Users)
                .set({ active: 1, updatedAt: new Date() })
                .where('id = :userId', { userId })
                .execute();
            return query;
        });
    }
    static deleteOtpCode(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield AppDataSource_1.default.manager
                .createQueryBuilder()
                .delete()
                .from(entity_1.UserOtp)
                .where("user_id = :userId", { userId })
                .execute();
        });
    }
}
exports.ConfirmOtp = ConfirmOtp;
