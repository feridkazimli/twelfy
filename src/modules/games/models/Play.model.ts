import AppDataSource from "../../../../AppDataSource";
import { ResponseError } from "../../../utils";
import { GivenAnswerDTO } from "../dto";
import { Answers } from "../entity/Answers";
import { GivenAnswer } from "../entity/GivenAnswer";

export class PlayModel {
    async questionForUser(gameId: number): Promise<Array<{
        game_id: number
        question_id: number
        id: number
        question_text: string
    }>> {
        try {
            const result = await AppDataSource.createQueryRunner()
                .query(`with random_question_for_user as (
                    select question_id
                        from question_of_games
                            where question_id not in
                                (
                                    select uga.question_id
                                        from user_game_answers uga
                                            where uga.user_id = ? and uga.game_id = ?
                                ) order by rand() limit 1
                )
                select qog.question_id, qog.game_id, ql.id, ql.question_text
                from question_of_games qog
                left join games g on g.id = qog.game_id
                left join questions q on qog.question_id = q.id and q.status_id = 2
                left join question_lang ql on q.id = ql.question_id and ql.lang_id = ?
                where qog.question_id = (select question_id from random_question_for_user)
                order by qog.question_id`, [1, gameId, 1]);

            return result;
        } catch (error) {
            throw new ResponseError([{
                text: 'Sual gətirilən zaman xəta baş verdi'
            }], 400)
        }
    }

    async getAnswerByQuestionLangId(question_lang_id: number) {
        try {
            const result = await AppDataSource.manager.find(Answers, {
                select: ['answer_text', 'id'],
                loadEagerRelations: false,
                where: {
                    questions: {
                        id: question_lang_id
                    }
                }
            })

            return result;
        } catch (error) {
            throw new ResponseError([{
                text: 'Cavablar gətirilən zaman xəta baş verdi'
            }], 400)
        }
    }

    async saveAnswer(data: GivenAnswerDTO) {
        try {
            const find = await AppDataSource.manager.getRepository(GivenAnswer).findOne({
                loadEagerRelations: false,
                where: {
                    answers: {
                        id: data.AnswerId
                    },
                    games: {
                        id: data.GameId
                    },
                    questions: {
                        id: data.QuestionId
                    },
                    users: {
                        id: data.UserId
                    }
                }
            });

            if (!find) {
                await AppDataSource.manager.createQueryBuilder()
                    .insert()
                    .into(GivenAnswer)
                    .values({
                        answers: {
                            id: data.AnswerId
                        },
                        games: {
                            id: data.GameId
                        },
                        users: {
                            id: data.UserId
                        },
                        questions: {
                            id: data.QuestionId
                        },
                        is_given: true
                    })
                    .execute()
            }
        } catch (error) {
            console.log('errorerrorerror');

            throw new ResponseError([{
                text: 'Daxil edilən sual, cavab və ya oyun məlumatı düzgün deyil'
            }], 400)
        }
    }
}