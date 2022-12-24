import AppDataSource from "../../../../AppDataSource";

export interface ICheckAnswer {
    wrong: string
    correct: string
}

export class GamesAfterModel { 
    async checkAnswerById(userId: number, gameId: number): Promise<ICheckAnswer|undefined> {
        return await AppDataSource.createQueryBuilder()
            .select(
                subQuery => {
                    return subQuery
                        .select('count(a.is_correct)')
                        .from('user_game_answers', 'uga')
                        .leftJoin('answers', 'a', 'a.id = uga.answer_id')
                        .where('a.is_correct = 0')
                }, 'wrong'
            )
            .select(
                subQuery => {
                    return subQuery
                        .select('count(a.is_correct)')
                        .from('user_game_answers', 'uga')
                        .leftJoin('answers', 'a', 'a.id = uga.answer_id')
                        .where('a.is_correct = 1')
                }, 'correct'
            )
            .from('user_game_answers', 'ugal')
            .where('ugal.user_id = :userId', { userId })
            .andWhere('ugal.game_id = :gameId', { gameId })
            .groupBy('wrong, correct')
            .getRawOne();
    }
}