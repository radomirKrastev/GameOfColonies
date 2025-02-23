import express from "express";
import gameMapController from './controllers/game-map.controller';
const router = express.Router();

router.use('/game', gameMapController);

router.get("/", (req, res) => {
  res.json({ message: "It's working... v3" });
});

export default router;
