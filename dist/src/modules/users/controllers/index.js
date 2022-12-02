"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const otp_1 = require("./otp");
const registration_1 = require("./registration");
const login_1 = require("./login");
const fake_1 = require("./fake");
exports.default = {
    phoneAuth: otp_1.phoneAuth, confirmOtpCode: otp_1.confirmOtpCode,
    addUserMeta: registration_1.addUserMeta,
    login: login_1.login,
    index: fake_1.index,
};
