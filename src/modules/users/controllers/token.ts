import { StatusCodes } from "http-status-codes";
import SecureController from "../../../services/SecureController";
import { Dummy, ResponseError, ResponseSuccess } from "../../../utils";
import jwt from "jsonwebtoken";
import { Token } from "../models";

const TokenController = {
    generateAccessToken: SecureController.catchAsync(Dummy,async (req, res, next) => {
        const token = req.header('Refresh-Token');

        if(!token) {
            throw new ResponseError([
                {
                    text: 'Token boş göndərilib',
                    codeType: 'tokenNotFound'
                }
            ], StatusCodes.UNAUTHORIZED)
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, { complete: true });
        const jwtPayload = decodedToken.payload;
        
        const tokenId: string = typeof jwtPayload != 'string' ? String(jwtPayload.token) : '';
        const result = await Token.getRefreshTokenByUserId(tokenId);
        const tokenDoc = await Token.saveRefreshToken(result.user_id);

        const refreshToken = jwt.sign({
            userId: result.user_id,
            token: tokenDoc.identifiers[0].id,
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1m'
        });

        const accessToken = jwt.sign({
            login: result.nickname
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });

        ResponseSuccess(res, {
            messages: [],
            results: { refreshToken, accessToken }
        });
    }),
}

export = TokenController;