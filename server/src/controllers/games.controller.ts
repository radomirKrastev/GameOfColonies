import express from "express";
import { gameMapService } from "../services";
import { ICreateGameRequestDto } from "../interfaces";

const router = express.Router();

router.get("/:gameId/map", async (req, res, next) => {
  const gameId = req.params.gameId;

  try {
    const gameMap = await gameMapService.getGameMap(gameId);
    // console.log({gameMap})
    res.json(gameMap);
  } catch (error) {
    next(error)
  }
});

// router.post("/start", async (req, res) => {
//   const response = createGame();
//   res.json(response)
// });

router.get("/:gameId", async (req, res, next) => {
  const gameId = req.params.gameId;

  try {
    const game = await gameMapService.getGame(gameId);
    res.json(game);
  } catch (error) {
    next(error)
  }
});

router.get("/", async (req, res, next) => {
  try {
    console.log('get all games controller')
    const games = await gameMapService.getAllGames();
    console.log({ games })
    res.json(games);
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body as ICreateGameRequestDto;
  const userId = req.cookies.userId;

  try {
    const response = await gameMapService.createGame(data, userId);
    res.json(response);
  } catch (error) {
    next(error)
  }
});

router.post("/:gameId/join", async (req, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gameMapService.joinGame(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.post("/:gameId/start", async (req, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gameMapService.startGame(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

// 1. User host clicks and creates a game
// 2. User player clicks and joins a game   If game is not started yet there is lobby screen / If started player cannot join
// 3. User host starts game - everybody makes request which gets the game map and game is visualised

export default router;
