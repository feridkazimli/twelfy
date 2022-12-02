import { Response, Request } from "express";

export interface ISecureController {
    req: Request,
    res: Response
}

export type Test = {
    salam: string
}