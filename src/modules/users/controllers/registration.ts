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
                unAuthorize: 'Sorğunu yerinə yetirmək mümkün deyil'
            }], StatusCodes.BAD_REQUEST)
        }
        const checkNick = await UserInfo.getUserByNickName(dto.Nickname);

        if (checkNick) {
            throw new ResponseError([{
                nicknameExistsError: 'Daxil edilən istifadəçi adı bazada mövcuddur'
            }], StatusCodes.BAD_REQUEST)
        }

        await AddUserMeta.insertUserMeta(dto);
        
        ResponseSuccess(res, {
            messages: [
                {
                    register: 'Qeydiyyatınız tamamlandı'
                }
            ],
            results: null,
        });
    }),
}

export = Registration;