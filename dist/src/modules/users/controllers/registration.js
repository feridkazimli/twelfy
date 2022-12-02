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
const http_status_codes_1 = require("http-status-codes");
const SecureController_1 = __importDefault(require("../../../services/SecureController"));
const utils_1 = require("../../../utils");
const dto_1 = require("../dto");
const models_1 = require("../models");
const AddUserMeta_1 = require("../models/AddUserMeta");
const Registration = {
    addUserMeta: SecureController_1.default.catchAsync(dto_1.UserMetaDTO, (req, res, next, dto) => __awaiter(void 0, void 0, void 0, function* () {
        const checkActive = yield models_1.UserInfo.getUserById(dto.UserId);
        if (checkActive && checkActive.active === 0) {
            throw new utils_1.ResponseError([{
                    unAuthorize: 'Sorğunu yerinə yetirmək mümkün deyil'
                }], http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const checkNick = yield models_1.UserInfo.getUserByNickName(dto.Nickname);
        if (checkNick) {
            throw new utils_1.ResponseError([{
                    nicknameExistsError: 'Daxil edilən istifadəçi adı bazada mövcuddur'
                }], http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        yield AddUserMeta_1.AddUserMeta.insertUserMeta(dto);
        (0, utils_1.ResponseSuccess)(res, {
            messages: [
                {
                    register: 'Qeydiyyatınız tamamlandı'
                }
            ],
            results: null,
        });
    })),
};
module.exports = Registration;
