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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SecureController_1 = __importDefault(require("../../../services/SecureController"));
const utils_1 = require("../../../utils");
const dto_1 = require("../dto");
const models_1 = require("../models");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_1 = require("../models/Token");
const Login = {
    login: SecureController_1.default.catchAsync(dto_1.LoginDTO, (req, res, next, dto) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield models_1.UserInfo.getAllUserByNickName(dto.Nickname);
        result && (yield bcrypt_1.default.compare(dto.Password, result.password).then((result) => {
            if (!result) {
                throw new utils_1.ResponseError([{
                        userNotFound: 'İstifadəçi adı vəya şifrəniz yanlışdır'
                    }], http_status_codes_1.StatusCodes.NOT_FOUND);
            }
        }));
        if (!result) {
            throw new utils_1.ResponseError([{
                    userNotFound: 'İstifadəçi adı vəya şifrəniz yanlışdır'
                }], http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const { password } = result, results = __rest(result, ["password"]);
        const accessToken = jsonwebtoken_1.default.sign({
            login: result.nickname
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });
        const refreshToken = jsonwebtoken_1.default.sign({
            userId: result.id
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '30m'
        });
        yield Token_1.Token.saveRefreshToken({ userId: result.id, token: refreshToken });
        (0, utils_1.ResponseSuccess)(res, {
            messages: [],
            results: Object.assign({ accessToken, refreshToken }, results)
        });
    })),
};
module.exports = Login;
