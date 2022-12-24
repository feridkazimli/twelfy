import express, { Express } from "express";
import games from '../controllers/index';

const router: Express = express();

router.get('/generate/questions/by-game-id/:gameId', games.generateQuestion);
router.get('/get/question/by-game-id/:gameId', games.getQuestionForUser);
router.post('/send/answer', games.sendAnswer);
router.get('/check/answer/user-id/:userId/game-id/:gameId', games.checkAnswer);

export default router;