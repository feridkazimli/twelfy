import { StatusCodes } from "http-status-codes";
import SecureController from "../../../services/SecureController";
import { ResponseError, ResponseSuccess } from "../../../utils";
import { UserMetaDTO } from "../dto";
import { UserInfo } from "../models";
import { AddUserMeta } from "../models/AddUserMeta";

const Registration = {
    addUserMeta: SecureController.catchAsync(UserMetaDTO, async (req, res, next, dto) => {
        const checkActive = await UserInfo.getUserById(dto.UserId);
        
        if (checkActive && checkActive.active === 0) {
            throw new ResponseError([{
                text: 'Sorğunu yerinə yetirmək mümkün deyil',
                codeType: 'unAuthorize'
            }], StatusCodes.BAD_REQUEST)
        }
        const checkNick = await UserInfo.getUserByNickName(dto.Nickname);

        if (checkNick) {
            throw new ResponseError([{
                text: 'Daxil edilən istifadəçi adı bazada mövcuddur',
                codeType: 'nicknameExistsError'
            }], StatusCodes.BAD_REQUEST)
        }

        await AddUserMeta.insertUserMeta(dto);
        
        ResponseSuccess(res, {
            messages: [
                {
                    text: 'Qeydiyyatınız tamamlandı',
                    codeType: 'register'
                }
            ],
            results: null,
        });
    }),
}

export = Registration;