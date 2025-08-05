import express from "express";
import { gameDiceService, gameService, gamePlacementService } from "../services";
import { GameIdParams, GamePlayerParams, Point } from "../interfaces";
import type { Request } from "express";

const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  console.log(req.params, req.originalUrl)
  try {
    const game = await gameService.getGame(gameId);
    res.json(game);
  } catch (error) {
    next(error)
  }
});

router.get("/map", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;

  try {
    const gameMap = await gameService.getGameMap(gameId);
    res.json(gameMap);
  } catch (error) {
    next(error)
  }
});

router.post("/join", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gameService.joinGame(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.post("/start", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gameService.startGame(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.post("/dices/roll", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gameDiceService.rollDices(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.get("/dices", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;

  try {
    const response = await gameDiceService.getDices(gameId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.get("/players/:id", async (req: Request<GamePlayerParams>, res, next) => {
  const gameId = req.params.gameId;
  const playerId = req.params.id;

  try {
    const response = await gameService.getPlayer(gameId, playerId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.get("/turn", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  try {
    const response = await gameService.getTurn(gameId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.post("/turn", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gameService.finishTurn(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.get("/available-spots", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gamePlacementService.getCurrentAvailableSpots(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

// 1. User host clicks and creates a game
// 2. User player clicks and joins a game   If game is not started yet there is lobby screen / If started player cannot join
// 3. User host starts game - everybody makes request which gets the game map and game is visualised

export default router;
