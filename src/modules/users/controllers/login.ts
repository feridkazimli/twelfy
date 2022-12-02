import SecureController from "../../../services/SecureController";
import { ResponseError, ResponseSuccess } from "../../../utils";
import { LoginDTO } from "../dto";
import { UserInfo } from "../models";
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from "../models/Token";

const Login = {
    login: SecureController.catchAsync(LoginDTO, async (req, res, next, dto) => {
        const result = await UserInfo.getAllUserByNickName(dto.Nickname);

        result && await bcrypt.compare(dto.Password, result.password).then((result) => {
            if(!result) {
                throw new ResponseError([{
                    userNotFound: 'İstifadəçi adı vəya şifrəniz yanlışdır'
                }], StatusCodes.NOT_FOUND)
            }
        });

        if(!result) {
            throw new ResponseError([{
                userNotFound: 'İstifadəçi adı vəya şifrəniz yanlışdır'
            }], StatusCodes.NOT_FOUND)
        }

        const { password, ...results } = result;

        const accessToken = jwt.sign({
            login: result.nickname
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });

        const refreshToken = jwt.sign({
            userId: result.id
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '30m'
        });

        await Token.saveRefreshToken({ userId: result.id, token: refreshToken });
        
        ResponseSuccess(res, {
            messages: [],
            results: { accessToken, refreshToken, ...results }
        })
    }),
}

export = Login;