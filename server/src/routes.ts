import express from "express";
import gamesController from './controllers/games.controller';
const router = express.Router();

router.use('/api/games', gamesController);

router.get("/api", (req, res) => {
  res.json({ message: "It's working... v3" });
});

export default router;
