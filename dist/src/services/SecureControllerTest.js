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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const ResponseError_1 = require("../utils/ResponseError");
class SecureControllerTest {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        return this;
    }
    DTOSchema(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dto = (0, class_transformer_1.plainToInstance)(schema, this.req.body);
            yield SecureControllerTest.valid(this.dto);
        });
    }
    static get instance() {
        return (req, res, next) => {
            const instance = new SecureControllerTest(req, res, next);
            return instance;
        };
    }
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
                throw new ResponseError_1.ResponseError(result, 401);
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
                    }
                    let dto = (0, class_transformer_1.plainToInstance)(schema, req.body);
                    yield SecureControllerTest.valid(dto);
                    yield cb(req, res, next, dto).catch(error => {
                        res
                            .status(error.code || 400)
                            .json({
                            code: error.code,
                            messages: error.messages,
                            stack: error.stack,
                        });
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
exports.default = SecureControllerTest;
