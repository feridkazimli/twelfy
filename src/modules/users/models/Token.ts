import { Secret } from "jsonwebtoken"
import AppDataSource from "../../../../AppDataSource"
import { RefreshToken } from "../entity/RefreshToken"

export class Token {
    static async saveRefreshToken({ userId, token }: { 
        userId: number
        token: string
    }) {
        const query = await AppDataSource.manager.createQueryBuilder()
            .insert()
            .into(RefreshToken)
            .values({
                rfrsh_token: token,
                user: {
                    id: userId
                }
            })
            .execute();

        return query;
    }
}