import AppDataSource from "../../../../AppDataSource";
import { Users, UserOtp } from "../entity";
import { addMinutes, differenceInMinutes } from "date-fns";
import { ResponseError } from "../../../utils";
import { StatusCodes } from "http-status-codes";

export class PhoneAuthModel {
    static async saveOtpCode(userId: number, otpCode: number) {
        const checkOtp = await AppDataSource.manager.getRepository(UserOtp).findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        const outInBlock = checkOtp ? differenceInMinutes(checkOtp.otp_expiry, new Date()): 1;
        const otpRetryCount = checkOtp?.otp_retry_count ? checkOtp.otp_retry_count + 1 : 1;
        
        if(checkOtp && outInBlock <= 0) {
            await AppDataSource.manager
            .createQueryBuilder()
            .update(UserOtp)
            .set({
                otp_expiry: null,
                otp_status: 0,
                otp_retry_count: 0
            })
            .where('user_id = :userId', { userId })
            .execute();
        }

        if(checkOtp && checkOtp.otp_status === 2) {
            throw new ResponseError([{ otpSendBlock: `Otp kod 3 dəfədən artıq göndərildiyi üçün bloklanmısınız.(${outInBlock}) dəqiqə sonra təkrar yoxlayın` }], StatusCodes.UNAUTHORIZED);
        }

        if(checkOtp && checkOtp.otp_retry_count >= 3) {
            await AppDataSource.manager
                .createQueryBuilder()
                .update(UserOtp)
                .set({
                    otp_expiry: addMinutes(new Date(), 20),
                    otp_status: 2, // blocked
                    otp_retry_count: 0
                })
                .where('user_id = :userId', { userId })
                .execute();

            throw new ResponseError([{ otpSendBlock: 'Otp kod 3 dəfədən artıq göndərildiyi üçün bloklanmısınız. İyirmi dəqiqə sonra təkrar yoxlayın' }], StatusCodes.UNAUTHORIZED);
        }

        const query = await AppDataSource.manager
            .createQueryBuilder()
            .insert()
            .into(UserOtp)
            .values({
                user: {
                    id: userId,
                },
                otp_code: otpCode,
                otp_expiry: addMinutes(new Date(), 5),
                otp_status: 0,
                otp_retry_count: otpRetryCount,
            })
            .orUpdate(["otp_code", "otp_expiry", "otp_retry_count"], "user_id")
            .updateEntity(false)
            .execute();
    }

    static async saveUser({ phone, otpCode }: { phone: string; otpCode: number; }) {
        let query;

        const checkPhone = await AppDataSource.manager.getRepository(Users).findOne({
            where: {
                phone: phone,
            },
        });

        if(!checkPhone) {
            query = await AppDataSource.manager
            .createQueryBuilder()
            .insert()
            .into(Users)
            .values({
                phone,
                active: 0,
            })
            .orIgnore(true)
            .execute();
        }

        await PhoneAuthModel.saveOtpCode(query?.raw.insertId || checkPhone?.id, otpCode);

        return { insertId: query?.raw.insertId || checkPhone?.id };
    }
}
