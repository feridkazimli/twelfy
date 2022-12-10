import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../utils";

const TokenServices = {
    checkToken: (token: string | undefined) => {
        if(!token) {
            throw new ResponseError({ 
                text: 'Token boş göndərilib',
                codeType: 'tokenNotFound' 
            }, StatusCodes.UNAUTHORIZED);
        }
    }
}

export = TokenServices;