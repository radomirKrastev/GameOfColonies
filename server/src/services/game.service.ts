import { IGameResponseDto, IGameMap, IPlayer, IPlayerInfoResponseDto, IGameTurnResponseDto } from "../interfaces";
import {
  getRandomndInt,
  getPlayerColor,
} from "../utils/index";
import {
  gameMapRepository
} from '../repository';
import { emitTurnFinished, emitGameStarted, joinGameAndEmit } from "../socket/services";
import { usersService } from "./users.service";
import { GAME_STATUS, INITIAL_PLACEMENT } from "../enums";

const getGameMap = async (gameId: string): Promise<IGameMap> => {
  const game = await gameMapRepository.getGame(gameId);
  const { map } = game
  return map;
};

const joinGame = async (gameId: string, userId: string): Promise<IGameResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  if (currentGame.players.length - 1 < currentGame.maxPlayers) {
    currentGame.players.push({ userId, color: getPlayerColor(currentGame.players.length), points: 0, hiddenPoints: 0 });
    const updatedGame = await gameMapRepository.updateGame(currentGame);

    const socket = await usersService.getUserSocket(userId);

    if (socket) {
      joinGameAndEmit(socket, gameId);
    }

    const { id, name, maxPlayers, players, creator } = updatedGame;

    return { id, name, maxPlayers, playersCount: players.length, creator };
  } else {
    throw new Error('Game is full');
  }
};

const getGame = async (gameId: string): Promise<IGameResponseDto> => {
  const game = await gameMapRepository.getGame(gameId);

  const { id, name, maxPlayers, players, creator } = game;
  return { id, name, maxPlayers, playersCount: players.length, creator };
};

const startGame = async (gameId: string, userId: string): Promise<IGameResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  if (currentGame.creator === userId) {
    currentGame.status = GAME_STATUS.STARTED;
    const randomPlayerIndex = getRandomndInt(0, currentGame.players.length);
    const nextPlayerIndex = (randomPlayerIndex + 1) % currentGame.players.length;
    currentGame.gameTurns = [{
      playerId: currentGame.players[randomPlayerIndex].userId,
      nextPlayerIndex,
      roll: null,
      isTurnEnded: false,
      initialPlacement: INITIAL_PLACEMENT.FIRST,
    }];

    const settlements = currentGame.map.uniqueHexagonCornerCoordinates.map(coordinates => ({
      coordinates,
      availableFor: [],
    })
    );

    currentGame.availableSpots = {
      settlements,
      roads: [],
      cities: [],
    };

    const updatedGame = await gameMapRepository.updateGame(currentGame);

    const socket = await usersService.getUserSocket(userId);

    if (socket) {
      emitGameStarted(socket, gameId);
    }

    const { id, name, maxPlayers, players, creator } = updatedGame;

    return { id, name, maxPlayers, playersCount: players.length, creator };
  } else {
    throw new Error('Game is full');
  }
};

const getPlayer = async (gameId: string, userId: string): Promise<IPlayerInfoResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const player: IPlayer | undefined = currentGame.players.find(player => player.userId === userId);

  if (!player) {
    throw new Error('Player not found in the game');
  }

  return { userId: player.userId, color: player.color };
};

const getTurn = async (gameId: string): Promise<IGameTurnResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const res = currentGame.gameTurns[currentGame.gameTurns.length - 1];

  if (!res) {
    throw new Error('Turn not found');
  }

  return {
    playerId: res.playerId,
    isTurnEnded: res.isTurnEnded,
    isRolled: res.roll !== null,
    initialPlacement: currentGame.gameTurns[currentGame.gameTurns.length - 1].initialPlacement
  };
};

const finishTurn = async (gameId: string, userId: string): Promise<IGameTurnResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const currentTurn = currentGame.gameTurns[currentGame.gameTurns.length - 1];

  if (!currentTurn) {
    throw new Error('Turn not found');
  }

  if (currentTurn.playerId !== userId) {
    throw new Error('It is not your turn');
  }

  currentTurn.isTurnEnded = true;
  currentGame.gameTurns[currentGame.gameTurns.length - 1] = currentTurn;

  const newTurnPlayerIndex = currentTurn.nextPlayerIndex;

  let nextPlayerIndex: number;

  if (currentGame.gameTurns.length === currentGame.players.length) {
    nextPlayerIndex = newTurnPlayerIndex;
  } else if (currentGame.gameTurns.length > currentGame.players.length && currentGame.gameTurns.length < currentGame.players.length * 2) {
    nextPlayerIndex = newTurnPlayerIndex - 1;
  } else {
    nextPlayerIndex = (newTurnPlayerIndex + 1) % currentGame.players.length;
  }

  let initialPlacement = INITIAL_PLACEMENT.COMPLETED;

  if (currentGame.gameTurns.length < currentGame.players.length) {
    initialPlacement = INITIAL_PLACEMENT.FIRST;
  } else if (currentGame.gameTurns.length < currentGame.players.length * 2) {
    initialPlacement = INITIAL_PLACEMENT.SECOND;
  }

  const newTurn = {
    playerId: currentGame.players[newTurnPlayerIndex].userId,
    nextPlayerIndex,
    roll: null,
    isTurnEnded: false,
    initialPlacement,
  };
  currentGame.gameTurns.push(newTurn);

  const updatedGame = await gameMapRepository.updateGame(currentGame);

  const socket = await usersService.getUserSocket(userId);

  if (socket) {
    emitTurnFinished(socket, gameId);
  }

  const res = updatedGame.gameTurns[updatedGame.gameTurns.length - 1];

  return {
    playerId: res.playerId,
    isTurnEnded: res.isTurnEnded,
    isRolled: res.roll !== null,
    initialPlacement: updatedGame.gameTurns[updatedGame.gameTurns.length - 1].initialPlacement
  };
};

export const gameService = {
  getGameMap,
  joinGame,
  getGame,
  startGame,
  getPlayer,
  getTurn,
  finishTurn,
};
