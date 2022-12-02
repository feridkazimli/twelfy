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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const ResponseError_1 = require("../utils/ResponseError");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SecureController {
    static valid(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            yield (0, class_validator_1.validate)(schema, { skipMissingProperties: true })
                .then(errors => {
                if (errors.length > 0) {
                    for (const errorItem of errors) {
                        result.push(errorItem.constraints);
                    }
                }
            });
            if (result.length > 0) {
                throw new ResponseError_1.ResponseError(result, http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
        });
    }
    /**
     * @param schema Default value Dummy class
     * @param cb Callback function
     * @param authorization JWT token authorization
     * @returns A Promise for the completion of the callback.
     */
    catchAsync(schema, cb, authorization) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (authorization) {
                        const Authorization = req.header('Authorization');
                        const token = Authorization && Authorization.split(' ')[1];
                        if (!token) {
                            throw new ResponseError_1.ResponseError([
                                {
                                    tokenNotFound: 'Token boş göndərilib'
                                }
                            ], http_status_codes_1.StatusCodes.UNAUTHORIZED);
                        }
                        try {
                            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
                            console.log(decodedToken);
                            next();
                        }
                        catch (e) {
                            console.log(e);
                            throw new ResponseError_1.ResponseError([{
                                    tokenExpiredError: 'Tokenin etibarlılıq tarixi sona çatıb'
                                }], http_status_codes_1.StatusCodes.UNAUTHORIZED);
                        }
                    }
                    let dto = (0, class_transformer_1.plainToInstance)(schema, req.body);
                    yield SecureController.valid(dto);
                    yield cb(req, res, next, dto).catch(error => {
                        console.log(error);
                        throw new ResponseError_1.ResponseError([{
                                [error.code]: error.message
                            }], 400);
                    });
                }
                catch (error) {
                    res
                        .status(error.code || 400)
                        .json({
                        code: error.code,
                        messages: error.messages,
                        stack: error.stack,
                    });
                }
            });
        };
    }
}
exports.default = new SecureController();
