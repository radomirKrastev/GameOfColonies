import express from "express";
import { gamePlacementService } from "../services";
import { GameIdParams, Point } from "../interfaces";
import type { Request } from "express";

const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;

  try {
    const response = await gamePlacementService.getConstructions(gameId, userId);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.post("/settlement", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;
  const data = req.body as { coordinates: Point };
  const { coordinates } = data;
  try {
    const response = await gamePlacementService.buildSettlement(gameId, userId, coordinates);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.post("/road", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;
  const data = req.body as { coordinates: { a: Point; b: Point } };
  const { coordinates } = data;
  try {
    const response = await gamePlacementService.buildRoad(gameId, userId, coordinates);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.post("/city", async (req: Request<GameIdParams>, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.cookies.userId;
  const data = req.body as { coordinates: Point };
  const { coordinates } = data;
  try {
    const response = await gamePlacementService.buildCity(gameId, userId, coordinates);
    res.json(response)
  } catch (error) {
    next(error)
  }
});

export default router;