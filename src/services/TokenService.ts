import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../utils";

const TokenServices = {
    checkToken: (token: string | undefined) => {
        if(!token) {
            throw new ResponseError({ tokenNotFound: 'Token boş göndərilib' }, StatusCodes.UNAUTHORIZED);
        }
    }
}

export = TokenServices;