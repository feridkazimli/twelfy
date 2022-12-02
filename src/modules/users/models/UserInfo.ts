import AppDataSource from "../../../../AppDataSource";
import { UserMeta, Users } from "../entity";

export class UserInfo {
    static async getUserByNickName(nickname: string) {
        const result = await AppDataSource.manager.findOne(Users, {
            where: {
                nickname: nickname
            }
        });

        return result;
    }

    static async getUserById(userId: number) {
        const result = await AppDataSource.manager.findOne(Users, {
            where: {
                id: userId,
            }
        });

        return result;
    }

    static async getAllUserByNickName(nickname: string) {
        return await AppDataSource.manager.createQueryBuilder()
            .select(`u.id, u.nickname, u.phone, u.password, um.firstName, um.lastName, um.father`)
            .addSelect(`DATE_FORMAT(um.birthday, '%Y-%m-%d') as birthday`)
            .addSelect('CONCAT(um.firstName, um.lastName, um.father) as fullName')
            .from(Users, 'u')
            .leftJoin(UserMeta, 'um', 'um.user_id = u.id')
            .where('u.nickname =:nickname', { nickname })
            // .andWhere('u.password =:password', { password })
            .andWhere('u.active =:status', { status: 1 })
            .getRawOne<Users>();
    }
}