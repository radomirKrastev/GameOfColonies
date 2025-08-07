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

export const gameService = {
  getGameMap,
  joinGame,
  getGame,
  startGame,
  getPlayer,
};
