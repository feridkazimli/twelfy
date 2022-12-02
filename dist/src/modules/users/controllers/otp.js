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
const SecureController_1 = __importDefault(require("../../../services/SecureController"));
const models_1 = require("../models");
const dto_1 = require("../dto");
const utils_1 = require("../../../utils");
const http_status_codes_1 = require("http-status-codes");
const Otp = {
    phoneAuth: SecureController_1.default.catchAsync(dto_1.PhoneAuthDTO, (req, res, next, dto) => __awaiter(void 0, void 0, void 0, function* () {
        const otpCode = Math.abs(Math.floor(1000 + Math.random() * 9000));
        const result = yield models_1.PhoneAuthModel.saveUser({ phone: dto.Phone, otpCode });
        yield utils_1.ServiceFetch.REQUEST({
            serviceKey: "sms",
            headers: {
                contentType: utils_1.ContentType.XML
            },
            body: {
                'SMS-InsRequest': {
                    CLIENT: {
                        '@from': 'Klinika',
                        '@pwd': 'pass123',
                        '@user': 'test',
                    },
                    INSERT: {
                        '@datacoding': '0',
                        '@to': dto.Phone,
                        TEXT: {
                            '#text': `OTP KOD: ${otpCode}`
                        }
                    },
                }
            }
        });
        (0, utils_1.ResponseSuccess)(res, {
            messages: [
                {
                    phoneAuth: 'Əməliyyat uğurla yerinə yetirildi'
                }
            ],
            results: [{
                    phone: dto.Phone,
                    userId: result.insertId
                }]
        });
    })),
    confirmOtpCode: SecureController_1.default.catchAsync(dto_1.ConfirmOtpDTO, (req, res, next, dto) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const checkOtp = yield models_1.ConfirmOtp.checkOtpByUserIdAndOtpCode({ userId: dto.getUserId(), otpCode: dto.getOtpCode() });
        if (!checkOtp) {
            throw new utils_1.ResponseError([{
                    otpNotFound: 'OTP Kodu mövcud deyil'
                }], http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (checkOtp && checkOtp.otp_expiry.getTime() < Date.now()) {
            throw new utils_1.ResponseError([{
                    otpExpired: 'OTP Kodu etibarlılıq tarixi sona çatıb'
                }], http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        if (checkOtp && checkOtp.otp_expiry.getTime() >= Date.now()
            && [checkOtp.otp_status, (_a = checkOtp === null || checkOtp === void 0 ? void 0 : checkOtp.user) === null || _a === void 0 ? void 0 : _a.active].includes(0)) {
            const updateId = yield models_1.ConfirmOtp.confirmUser(dto.getUserId());
            console.log('updateId', updateId);
            yield models_1.ConfirmOtp.deleteOtpCode(dto.getUserId());
        }
        (0, utils_1.ResponseSuccess)(res, {
            messages: [
                {
                    confirmedUser: 'İstifadəçi uğurla təsdiqləndi'
                }
            ],
            results: []
        });
    })),
};
module.exports = Otp;
