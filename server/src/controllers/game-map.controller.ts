import express from "express";
import { getGameMapLayout } from "../services";
const router = express.Router();

router.get("/map", (req, res) => {
  const gameMapLayout = getGameMapLayout();

  res.json(gameMapLayout);
});

export default router;
