import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ResponseError, Messages } from "../utils/ResponseError";

export type CB<T> = (req: Request, res: Response, next: NextFunction, dto: T) => Promise<void>;
export type TCatchAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>;

class SecureControllerTest {
    req: Request;
    res: Response;
    next: NextFunction;
    dto: any;

    private constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
        return this;
    }

    async DTOSchema<T>(schema: ClassConstructor<T>) {
        this.dto = plainToInstance(schema, this.req.body);
        await SecureControllerTest.valid(this.dto as object);
    }

    static get instance() {
        return (req: Request, res: Response, next: NextFunction): SecureControllerTest => {
            const instance = new SecureControllerTest(req, res, next);
            return instance;
        }
    }











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

        if(result.length > 0) {
            throw new ResponseError(result, 401);
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
        cb: CB<T>,
        authorization?: boolean): TCatchAsync {
            return async function(req, res, next) {
                try {
                    if(authorization) {

                    }

                    let dto: T = plainToInstance(schema, req.body);
                    await SecureControllerTest.valid(dto as object);

                    await cb(req, res, next, dto).catch(error => {
                        res
                            .status(error.code || 400)
                            .json({
                                code: error.code,
                                messages: error.messages,
                                stack: error.stack,
                            });
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

export default SecureControllerTest;