import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ResponseError, Messages } from "../utils/ResponseError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export type TCatchAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>;

class SecureController {
    static async valid(schema: object) {
        let result: Messages[] = [];

        await validate(schema, { skipMissingProperties: true })
            .then(errors => {
                if (errors.length > 0) {
                    for (const errorItem of errors) {
                        const codeType = errorItem.constraints && Object.keys(errorItem.constraints);
                        const text = errorItem.constraints && Object.values(errorItem.constraints);
                        
                        result.push({
                            text: text ? text[0] : 'Məlumatları düzgün daxil edin',
                            codeType: codeType ? codeType[0] : 'fieldError'
                        });
                    }
                }
            });

        if (result.length > 0) {
            throw new ResponseError(result, StatusCodes.BAD_REQUEST);
        }
    }
    /**
     * @param schema Default value Dummy class
     * @param cb Callback function
     * @param authorization JWT token authorization
     * @returns A Promise for the completion of the callback.
     */
    catchAsync<T>(
        schema: ClassConstructor<T>,
        cb: (req: Request, res: Response, next: NextFunction, dto: T) => Promise<void>,
        authorization?: boolean): TCatchAsync {
        return async function (req, res, next) {
            try {
                if (authorization) {
                    const Authorization = req.header('Authorization');
                    const token = Authorization && Authorization.split(' ')[1];

                    if (!token) {
                        throw new ResponseError([
                            {
                                text: 'Token boş göndərilib',
                                codeType: 'tokenNotFound'
                            }
                        ], StatusCodes.UNAUTHORIZED)
                    }

                    try {
                        const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                    } catch (e) {
                        throw new ResponseError([{
                            text: 'Tokenin etibarlılıq tarixi sona çatıb',
                            codeType: 'tokenExpiredError'
                        }], StatusCodes.UNAUTHORIZED)
                    }
                }

                let dto: T = plainToInstance(schema, req.body);
                await SecureController.valid(dto as object);

                await cb(req, res, next, dto).catch(error => {
                    console.log(error);
                    
                    throw new ResponseError(error, StatusCodes.BAD_GATEWAY)
                });
            } catch (error: any) {
                console.log(error);

                res
                    .status(error.code || 400)
                    .json({
                        messages: error.messages,
                        stack: error.stack,
                    });
            }
        }
    }
}

export default new SecureController();