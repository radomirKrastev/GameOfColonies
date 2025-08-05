import express from "express";
import gamesController from './controllers/games.controller';
import gameController from './controllers/game.controller';
import gameConstructionsController from './controllers/game-constructions.controller';
import { userIdCookie } from './middlewares';

const router = express.Router();

router.use('/api/games/:gameId/constructions', userIdCookie, gameConstructionsController );
router.use('/api/games/:gameId', userIdCookie, gameController);
router.use('/api/games', userIdCookie, gamesController);

router.get("/api/health", (req, res) => {
  res.json({ message: "It's working... v3" });
});

export default router;
