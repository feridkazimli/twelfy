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
exports.PhoneAuthModel = void 0;
const AppDataSource_1 = __importDefault(require("../../../../AppDataSource"));
const entity_1 = require("../entity");
const date_fns_1 = require("date-fns");
const utils_1 = require("../../../utils");
const http_status_codes_1 = require("http-status-codes");
class PhoneAuthModel {
    static saveOtpCode(userId, otpCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkOtp = yield AppDataSource_1.default.manager.getRepository(entity_1.UserOtp).findOne({
                where: {
                    user: {
                        id: userId,
                    },
                },
            });
            const outInBlock = checkOtp ? (0, date_fns_1.differenceInMinutes)(checkOtp.otp_expiry, new Date()) : 1;
            const otpRetryCount = (checkOtp === null || checkOtp === void 0 ? void 0 : checkOtp.otp_retry_count) ? checkOtp.otp_retry_count + 1 : 1;
            if (checkOtp && outInBlock <= 0) {
                yield AppDataSource_1.default.manager
                    .createQueryBuilder()
                    .update(entity_1.UserOtp)
                    .set({
                    otp_expiry: null,
                    otp_status: 0,
                    otp_retry_count: 0
                })
                    .where('user_id = :userId', { userId })
                    .execute();
            }
            if (checkOtp && checkOtp.otp_status === 2) {
                throw new utils_1.ResponseError([{ otpSendBlock: `Otp kod 3 dəfədən artıq göndərildiyi üçün bloklanmısınız.(${outInBlock}) dəqiqə sonra təkrar yoxlayın` }], http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            if (checkOtp && checkOtp.otp_retry_count >= 3) {
                yield AppDataSource_1.default.manager
                    .createQueryBuilder()
                    .update(entity_1.UserOtp)
                    .set({
                    otp_expiry: (0, date_fns_1.addMinutes)(new Date(), 20),
                    otp_status: 2,
                    otp_retry_count: 0
                })
                    .where('user_id = :userId', { userId })
                    .execute();
                throw new utils_1.ResponseError([{ otpSendBlock: 'Otp kod 3 dəfədən artıq göndərildiyi üçün bloklanmısınız. İyirmi dəqiqə sonra təkrar yoxlayın' }], http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            const query = yield AppDataSource_1.default.manager
                .createQueryBuilder()
                .insert()
                .into(entity_1.UserOtp)
                .values({
                user: {
                    id: userId,
                },
                otp_code: otpCode,
                otp_expiry: (0, date_fns_1.addMinutes)(new Date(), 5),
                otp_status: 0,
                otp_retry_count: otpRetryCount,
            })
                .orUpdate(["otp_code", "otp_expiry", "otp_retry_count"], "user_id")
                .updateEntity(false)
                .execute();
        });
    }
    static saveUser({ phone, otpCode }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query;
            const checkPhone = yield AppDataSource_1.default.manager.getRepository(entity_1.Users).findOne({
                where: {
                    phone: phone,
                },
            });
            if (!checkPhone) {
                query = yield AppDataSource_1.default.manager
                    .createQueryBuilder()
                    .insert()
                    .into(entity_1.Users)
                    .values({
                    phone,
                    active: 0,
                })
                    .orIgnore(true)
                    .execute();
            }
            yield PhoneAuthModel.saveOtpCode((query === null || query === void 0 ? void 0 : query.raw.insertId) || (checkPhone === null || checkPhone === void 0 ? void 0 : checkPhone.id), otpCode);
            return { insertId: (query === null || query === void 0 ? void 0 : query.raw.insertId) || (checkPhone === null || checkPhone === void 0 ? void 0 : checkPhone.id) };
        });
    }
}
exports.PhoneAuthModel = PhoneAuthModel;
