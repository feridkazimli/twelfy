import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ResponseError, Messages } from "../utils/ResponseError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export type TCatchAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>;

class SecureControllerTest {
    req: Request;
    res: Response;
    next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;

        return this;
    }
    
    async schemaValidation() {
        console.log(this.req.body);
        return this;
    }
}

export default SecureControllerTest;