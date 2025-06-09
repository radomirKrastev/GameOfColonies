import express from "express";
import gamesController from './controllers/games.controller';
import { userIdCookie } from './middlewares';

const router = express.Router();

router.use('/api/games', userIdCookie, gamesController);

router.get("/api/health", (req, res) => {
  res.json({ message: "It's working... v3" });
});

export default router;
