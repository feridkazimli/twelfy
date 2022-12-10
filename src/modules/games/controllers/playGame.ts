import SecureController from "../../../services/SecureController";
import { Dummy, ResponseError, ResponseSuccess } from "../../../utils";
import { GivenAnswerDTO } from "../dto";
import { PlayModel } from "../models";

const PlayGame = {
    getQuestionForUser: SecureController.catchAsync(Dummy,async (req, res, next, dto) => {
        const { gameId } = req.params;

        const play = new PlayModel();
        const questionForUser: Array<{
            game_id: number
            question_id: number
            id: number
            question_text: string
        }> = await play.questionForUser(Number(gameId));
        
        if(questionForUser.length === 0) {
            throw new ResponseError([
                {
                    text: 'Bütün suallara cavab vermisiniz'
                }
            ], 400)
        }

        const answers = await play.getAnswerByQuestionLangId(questionForUser[0].id);

        ResponseSuccess(res, {
            messages: [],
            results: {...questionForUser[0], answers}
        });
    }, true),

    sendAnswer: SecureController.catchAsync(GivenAnswerDTO,async (req, res, next, dto) => {
        const play = new PlayModel();
        const save = await play.saveAnswer(dto);
        
        ResponseSuccess(res, {
            messages: [],
            results: null
        });
    }, true)
}

export = PlayGame;