import AppDataSource from "../../../../AppDataSource";
import { Users, UserOtp } from "../entity";

export class ConfirmOtp {
    static async checkOtpByUserIdAndOtpCode({ userId, otpCode }: { userId: number, otpCode: number }) {
        return await AppDataSource.manager.findOne(UserOtp, {
            where: {
                user: {
                    id: userId
                },
                otp_code: otpCode
            }
        })
    }

    static async confirmUser(userId: number) {
        const query = await AppDataSource.manager.createQueryBuilder()
            .update(Users)
            .set({ active: 1, updatedAt: new Date() })
            .where('id = :userId', { userId })
            .execute();

        return query;
    }

    static async deleteOtpCode(userId: number) {
        await AppDataSource.manager
            .createQueryBuilder()
            .delete()
            .from(UserOtp)
            .where("user_id = :userId", { userId })
            .execute();
    }
}