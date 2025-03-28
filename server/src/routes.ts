import express from "express";
import gameMapController from './controllers/game-map.controller';
const router = express.Router();

router.use('/api/game', gameMapController);

router.get("/api", (req, res) => {
  res.json({ message: "It's working... v3" });
});

export default router;
