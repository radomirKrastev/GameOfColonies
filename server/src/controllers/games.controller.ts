import express from "express";
import { getGameMapLayout, createGame, getAllGames, joinGame } from "../services";
import { ICreateGameRequestDto } from "../interfaces";

const router = express.Router();

router.get("/map", (req, res) => {
  const gameMapLayout = getGameMapLayout();

  res.json(gameMapLayout);
});

// router.post("/start", async (req, res) => {
//   const response = createGame();
//   res.json(response)
// });

router.get("/:gameId", (req, res) => {
  const games = getAllGames();

  res.json(games);
});

router.get("/", async (req, res) => {
  console.log('get all games controller')
  const games = await getAllGames();
  console.log({games})
  res.json(games);
});

router.post("/", async (req, res) => {
  const data = req.body as ICreateGameRequestDto;
  const response = await createGame(data);
  console.log({response})
  res.json(response);
});

router.post("/:gameId/join", async (req, res) => {
  console.log(req);
  console.log(req.params);
  console.log(req.body);
  const gameId = req.params.gameId;
  const response = await joinGame(gameId, req.body);
  res.json(response)
});

// 1. User host clicks and creates a game
// 2. User player clicks and joins a game   If game is not started yet there is lobby screen / If started player cannot join
// 3. User host starts game - everybody makes request which gets the game map and game is visualised

export default router;
