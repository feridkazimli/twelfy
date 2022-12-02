"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(messages, code) {
        super();
        this.code = code;
        this.messages = messages;
    }
}
exports.ResponseError = ResponseError;
