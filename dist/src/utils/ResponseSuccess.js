"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccess = void 0;
const http_status_codes_1 = require("http-status-codes");
function ResponseSuccess(res, { messages, code = http_status_codes_1.StatusCodes.OK, results }) {
    res
        .status(code)
        .json({
        code,
        messages,
        data: results
    });
}
exports.ResponseSuccess = ResponseSuccess;
