import SecureController from "../../../services/SecureController";
import { Dummy, ResponseSuccess } from "../../../utils";
import { GamesAfterModel } from "../models";

const GamesAfter = {
    checkAnswer: SecureController.catchAsync(Dummy,async (req, res, next, dto) => {
        const { userId, gameId } = req.params;
        
        const gamesAfter = new GamesAfterModel();
        const result = await gamesAfter.checkAnswerById(Number(userId), Number(gameId));

        const messageText = Number(result?.correct) === 12 
            ? 'Təbriklər! Siz qazandınız'
            : 'Uduzdunuz!'

        ResponseSuccess(res, {
            messages: [{
                text: messageText
            }],
            results: result ?? null
        })
    }),
}

export = GamesAfter;