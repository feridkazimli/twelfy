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
                        result.push(errorItem.constraints);
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
                                tokenNotFound: 'Token boş göndərilib'
                            }
                        ], StatusCodes.UNAUTHORIZED)
                    }

                    try {
                        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                        console.log(decodedToken);
                        next();
                    } catch (e) {
                        console.log(e);

                        throw new ResponseError([{
                            tokenExpiredError: 'Tokenin etibarlılıq tarixi sona çatıb'
                        }], StatusCodes.UNAUTHORIZED)
                    }
                }

                let dto: T = plainToInstance(schema, req.body);
                await SecureController.valid(dto as object);

                await cb(req, res, next, dto).catch(error => {
                    throw new ResponseError({ [error.code ?? error.name]: error.message }, StatusCodes.BAD_GATEWAY)
                });
            } catch (error: any) {
                res
                    .status(error.code || 400)
                    .json({
                        code: error.code,
                        messages: error.messages,
                        stack: error.stack,
                    });
            }
        }
    }
}

export default new SecureController();