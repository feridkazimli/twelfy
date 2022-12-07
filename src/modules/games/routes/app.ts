import express, { Express } from "express";
import games from '../controllers/index';

const router: Express = express();

router.get('/generate/questions/by-game-id/:gameId', games.generateQuestion);

export default router;