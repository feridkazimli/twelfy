import AppDataSource from "../../../../AppDataSource";
import { ResponseError } from "../../../utils";
import { QuestionOfGames } from "../entity";

export class GamesBeforeModel { 
    static async getQuestionOfGame(gameID: number): Promise<Array<{
        game_id: number
        question_id: number
        type_id: number
    }>> {
        AppDataSource.createQueryRunner()
            .query(`SET @type_rank=1, @current_type=null`);

        const result = AppDataSource.createQueryRunner()
            .query(`SELECT g.id as game_id, ranked.id as question_id, ranked.type_id
            FROM
                (SELECT q.type_id, q.id, q.status_id,
                    @type_rank := IF(@current_type = q.type_id, @type_rank + 1, 1) AS type_rank,
                    @current_type := q.type_id as ctype
                FROM questions q
                WHERE q.status_id = 2 and q.id not in (
                    SELECT qof.question_id from question_of_games qof
                )
                ORDER BY q.type_id, q.id DESC) ranked
                left join games g on g.is_free = 0 and g.id = ?
                WHERE type_rank <= 4 and TIMESTAMPDIFF(MINUTE, NOW(), g.start_date) BETWEEN -5 and 6`, [gameID]);
        
        return result;
    }

    static async addQuestionsOfGame({ gameId, questionId }: { gameId: number, questionId: number }) {
        return await AppDataSource.manager.createQueryBuilder()
            .insert()
            .into(QuestionOfGames)
            .values({
                games: {
                    id: gameId
                },
                questions: {
                    id: questionId
                }
               
            })
            .execute()
    }
}