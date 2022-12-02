import AppDataSource from "../../../../AppDataSource";
import { UserMetaDTO } from "../dto";
import { Users, UserMeta } from "../entity";
import bcrypt from 'bcrypt';

export class AddUserMeta {
    static async updateNickAndPass(data: { userId: number; nickname: string; password: string }) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        
        await AppDataSource.manager.createQueryBuilder()
            .update(Users)
            .set({
                nickname: data.nickname,
                password: hash,
                updatedAt: new Date()
            })
            .where('id = :userId', { userId: data.userId })
            .execute();
    }

    static async insertUserMeta(data: UserMetaDTO) {
        await this.updateNickAndPass({ nickname: data.Nickname, password: data.Password, userId: data.UserId })

        await AppDataSource.manager.createQueryBuilder()
            .insert()
            .into(UserMeta)
            .values({
                birthday: new Date(data.Birthday),
                father: data.Father,
                firstName: data.FirstName,
                lastName: data.LastName,
                user: {
                    id: data.UserId
                }
            })
            .orUpdate(['birthday', 'father', 'firstName', 'lastName'], 'user_id')
            .updateEntity(false)
            .execute();
    }
}