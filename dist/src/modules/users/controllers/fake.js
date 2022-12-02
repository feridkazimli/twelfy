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
const utils_1 = require("../../../utils");
const Login = {
    index: SecureController_1.default.catchAsync(utils_1.Dummy, (req, res, next, dto) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('hello fake');
        (0, utils_1.ResponseSuccess)(res, {
            messages: [],
            results: [{
                    fake: 'hello fake'
                }]
        });
    }), true)
};
module.exports = Login;
