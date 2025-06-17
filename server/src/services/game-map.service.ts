import { IGameResponseDto, Point, ICreateGameRequestDto, IGameMap, IPlayer } from "../interfaces";
import {
  generateHexagonalGrid,
  generateUniqueCornerCoordinates,
  getAllRoadPositions,
  hex,
  polygonCorners,
  getArrangedTiles,
  point,
  layout,
  pointyLayout,
  getRandomndInt,
  getPlayerColor,
} from "../utils/index";
import {
  BOARD_RADIUS_SIZE,
  HEX_SIZE,
  ORIGIN_POSITION_X,
  ORIGIN_POSITION_Y,
} from '../constants';
import {
  gameMapRepository
} from '../repository';
import { createGameAndEmit, emitGameStarted, joinGameAndEmit } from "../socket/services";
import { usersService } from "./users.service";
import { GAME_STATUS } from "../enums";

const getGameMap = async (gameId: string): Promise<IGameMap> => {
  const game = await gameMapRepository.getGame(gameId);
  console.log('get Game', JSON.stringify(game, null, 2))
  const { map } = game
  return map;
};

const createGame = async (req: ICreateGameRequestDto, userId: string): Promise<IGameResponseDto> => {
  const hexSize = point(HEX_SIZE, HEX_SIZE);
  const originPosition = point(ORIGIN_POSITION_X, ORIGIN_POSITION_Y);
  const screenLayout = layout(pointyLayout, hexSize, originPosition);

  const gridHexesCoordinatesMap = generateHexagonalGrid(BOARD_RADIUS_SIZE);

  const gridHexesCornersMap: Point[][] = [];
  gridHexesCoordinatesMap.slice().forEach((hexCoordinates) => {
    gridHexesCornersMap.push(
      polygonCorners(
        screenLayout,
        hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)
      )
    );
  });

  const uniqueHexagonCornerCoordinates =
    generateUniqueCornerCoordinates(gridHexesCornersMap);
  const roadPositions = getAllRoadPositions(uniqueHexagonCornerCoordinates);
  const tiles = getArrangedTiles(gridHexesCornersMap);

  console.log('createGame', JSON.stringify(tiles, null, 2))

  const newGame = {
    map: {
      gridHexesCornersMap,
      uniqueHexagonCornerCoordinates,
      roadPositions,
      tiles,
    },
    isStarted: false,
    players: [{ userId, color: getPlayerColor(0) }],
    name: req.name,
    maxPlayers: req.maxPlayers,
    creator: userId,
    status: GAME_STATUS.CREATED,
  }

  const game = await gameMapRepository.addGame(newGame);

  // //communicate with socket server about game created
  // new GameCreatedPublisher(natsWrapper.client).publish({id: game.id});
  const socket = await usersService.getUserSocket(userId);

  if (socket) {
    createGameAndEmit(socket, game.id);
  }

  const { id, name, maxPlayers, players, creator } = game;

  return { id, name, maxPlayers, playersCount: players.length, creator };
};

const joinGame = async (gameId: string, userId: string): Promise<IGameResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  console.log({ currentGame }, await getAllGames());

  if (currentGame.players.length - 1 < currentGame.maxPlayers) {
    currentGame.players.push({userId, color: getPlayerColor(currentGame.players.length)});
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

const getAllGames = async (): Promise<IGameResponseDto[]> => {
  const games = await gameMapRepository.getGames();
  const result: IGameResponseDto[] = [];

  games.forEach(game => {
    const { id, name, maxPlayers, players, creator } = game;
    result.push({ id, name, maxPlayers, playersCount: players.length, creator });
  });

  return result
};

const getGame = async (gameId: string): Promise<IGameResponseDto> => {
  const game = await gameMapRepository.getGame(gameId);

  const { id, name, maxPlayers, players, creator } = game;
  return { id, name, maxPlayers, playersCount: players.length, creator };
};

const startGame = async (gameId: string, userId: string): Promise<IGameResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  console.log('START GAME SERVICE', currentGame.creator === userId);

  if (currentGame.creator === userId) {
    currentGame.status = GAME_STATUS.STARTED;
    currentGame.playerTurn = currentGame.players[getRandomndInt(0, currentGame.players.length)].userId;

    const updatedGame = await gameMapRepository.updateGame(currentGame);

    const socket = await usersService.getUserSocket(userId);

    if (socket) {
      emitGameStarted(socket, gameId);
    }

    const { id, name, maxPlayers, players, creator, playerTurn } = updatedGame;

    return { id, name, maxPlayers, playersCount: players.length, creator, playerTurn };
  } else {
    throw new Error('Game is full');
  }
};

const getPlayer = async (gameId: string, userId: string): Promise<IPlayer> => {
  const currentGame = await gameMapRepository.getGame(gameId);
  const player: IPlayer | undefined = currentGame.players.find(player => player.userId === userId);

  if (!player) {
    throw new Error('Player not found in the game');
  }
  console.log('getPlayer', player);

  return player;
};

export const gameMapService = {
  getGameMap,
  createGame,
  joinGame,
  getAllGames,
  getGame,
  startGame,
  getPlayer,
};
