import express from "express";
import { gamesService } from "../services";
import { ICreateGameRequestDto } from "../interfaces";

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const games = await gamesService.getAllGames();
    res.json(games);
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body as ICreateGameRequestDto;
  const userId = req.cookies.userId;

  try {
    const response = await gamesService.createGame(data, userId);
    res.json(response);
  } catch (error) {
    next(error)
  }
});

export default router;
