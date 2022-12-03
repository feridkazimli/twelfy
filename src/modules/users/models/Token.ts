import { Secret } from "jsonwebtoken"
import AppDataSource from "../../../../AppDataSource"
import { Users } from "../entity";
import { RefreshToken } from "../entity/RefreshToken"

export class Token {
    static async saveRefreshToken(userId: number) {
        const query = await AppDataSource.manager.createQueryBuilder()
            .insert()
            .into(RefreshToken)
            .values({
                rfrsh_token: "",
                user: {
                    id: userId
                }
            })
            .execute();

        return query;
    }

    static async getRefreshTokenByUserId(tokenId: string) {
        const result = await AppDataSource.manager.createQueryBuilder()
            .select()
            .from(RefreshToken, 'rf')
            .leftJoin(Users, 'u', 'u.id = rf.user_id')
            .where('rf.id =:tokenId', { tokenId })
            .getRawOne();

        return result;
    }
}