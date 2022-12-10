import SecureController from "../../../services/SecureController";
import { Dummy, ResponseError, ResponseSuccess } from "../../../utils";
import { GamesBeforeModel } from "../models";

const GamesBefore = {
    generateQuestion: SecureController.catchAsync(Dummy,async (req, res, next, dto) => {
        const { gameId } = req.params;
        const qog = await GamesBeforeModel.getQuestionOfGame(Number(gameId))
            .catch(error => {
                throw new ResponseError([
                    {
                        text: 'Məlumatlar alınan zaman xəta baş verdi',
                    }
                ], 404)
            });

        if(qog.length === 12) {
            qog.map(async (question) => await GamesBeforeModel.addQuestionsOfGame({
                gameId: question.game_id,
                questionId: question.question_id,
            }))
        } else {
            throw new ResponseError([{
                text: `Sual sayı yetərli deyil (say: ${qog.length}, gözlənilən: 12) vəya məlumat tapılmadı`
            }], 400)
        }

        ResponseSuccess(res, {
            messages: [],
            results: qog
        })
    }),
};

export = GamesBefore;