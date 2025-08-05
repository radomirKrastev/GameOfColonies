import { IGameResponseDto, Point, ICreateGameRequestDto } from "../interfaces";
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
import { createGameAndEmit } from "../socket/services";
import { usersService } from "./users.service";
import { GAME_STATUS } from "../enums";

const getAllGames = async (): Promise<IGameResponseDto[]> => {
  const games = await gameMapRepository.getGames();
  const result: IGameResponseDto[] = [];

  games.forEach(game => {
    const { id, name, maxPlayers, players, creator } = game;
    result.push({ id, name, maxPlayers, playersCount: players.length, creator });
  });

  return result
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

  const newGame = {
    map: {
      gridHexesCornersMap,
      uniqueHexagonCornerCoordinates,
      roadPositions,
      tiles,
    },
    isStarted: false,
    players: [{ userId, color: getPlayerColor(0), points: 0, hiddenPoints: 0 }],
    name: req.name,
    maxPlayers: req.maxPlayers,
    creator: userId,
    status: GAME_STATUS.CREATED,
    constructions: {
      settlements: [],
      roads: [],
      cities: [],
    },
  }

  const game = await gameMapRepository.addGame(newGame);

  const socket = await usersService.getUserSocket(userId);

  if (socket) {
    createGameAndEmit(socket, game.id);
  }

  const { id, name, maxPlayers, players, creator } = game;

  return { id, name, maxPlayers, playersCount: players.length, creator };
};

export const gamesService = {
  createGame,
  getAllGames,
};
