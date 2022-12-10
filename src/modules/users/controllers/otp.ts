import SecureController from "../../../services/SecureController";
import { ConfirmOtp, PhoneAuthModel } from "../models";
import { ConfirmOtpDTO, PhoneAuthDTO } from "../dto";
import { ServiceFetch, ContentType, ResponseSuccess, Dummy, ResponseError } from "../../../utils";
import { StatusCodes } from "http-status-codes";

const Otp = {
    phoneAuth: SecureController.catchAsync(PhoneAuthDTO, async (req, res, next, dto) => {
        const otpCode = Math.abs(Math.floor(1000 + Math.random() * 9000));
        const result = await PhoneAuthModel.saveUser({ phone: dto.Phone, otpCode });

        await ServiceFetch.REQUEST({
            serviceKey: "sms",
            headers: {
                contentType: ContentType.XML
            },
            body: {
                'SMS-InsRequest': {
                    CLIENT: {
                        '@from': 'Klinika',
                        '@pwd': 'pass123',
                        '@user': 'test',
                    },
                    INSERT: {
                        '@datacoding': '0',
                        '@to': dto.Phone,
                        TEXT: {
                            '#text': `OTP KOD: ${otpCode}`
                        }
                    },
                }
            }
        });
 
        ResponseSuccess(res, {
            messages: [
                {
                    phoneAuth: 'Əməliyyat uğurla yerinə yetirildi'
                }
            ],
            results: [{
                phone: dto.Phone,
                otp: otpCode,
                userId: result.insertId
            }]
        });
    }),

    confirmOtpCode: SecureController.catchAsync(ConfirmOtpDTO, async (req, res, next, dto) => {
        const checkOtp = await ConfirmOtp.checkOtpByUserIdAndOtpCode({ userId: dto.getUserId(), otpCode: dto.getOtpCode() });
        
        if(!checkOtp) {
            throw new ResponseError([{
                otpNotFound: 'OTP Kodu mövcud deyil'
            }], StatusCodes.NOT_FOUND);
        }

        if(checkOtp && checkOtp.otp_expiry.getTime() < Date.now()) {
            throw new ResponseError([{
                otpExpired: 'OTP Kodu etibarlılıq tarixi sona çatıb'
            }], StatusCodes.BAD_REQUEST);
        }
        
        if(checkOtp && checkOtp.otp_expiry.getTime() >= Date.now() 
            && [checkOtp.otp_status, checkOtp?.user?.active].includes(0)) {
            const updateId = await ConfirmOtp.confirmUser(dto.getUserId());
            console.log('updateId', updateId);
            await ConfirmOtp.deleteOtpCode(dto.getUserId())
        }
        
        ResponseSuccess(res, {
            messages: [
                {
                    confirmedUser: 'İstifadəçi uğurla təsdiqləndi'
                }
            ],
            results: []
        });
    }),
}

export = Otp;