import { Response } from "express";
import { Messages } from "./ResponseError";
import { StatusCodes } from "http-status-codes";

export interface IResponseSuccess { 
    messages: Messages[]
    code?: number
    results: Array<object> | object | null
}

export function ResponseSuccess(res: Response, { messages, code = StatusCodes.OK, results }: IResponseSuccess ) {
    res
    .status(code)
    .json({
        code,
        messages,
        data: results
    })
}