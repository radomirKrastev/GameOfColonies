import { IGameResponseDto, Point, ICreateGameRequestDto, IJoinGameRequestDto } from "../interfaces";
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
} from "../utils/index";
import {
  BOARD_RADIUS_SIZE,
  HEX_SIZE,
  ORIGIN_POSITION_X,
  ORIGIN_POSITION_Y,
} from '../constants';
import {
  addGame,
  updateGame,
  getGame,
  getGames,
} from '../repository'
import { GameCreatedPublisher } from "../events";
import { natsWrapper } from "../nats-wrapper";

export const getGameMapLayout = () => {
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
  const tiles = getArrangedTiles();

  return {
    gridHexesCornersMap,
    uniqueHexagonCornerCoordinates,
    roadPositions,
    tiles,
  };
};

export const createGame = async (req: ICreateGameRequestDto): Promise<IGameResponseDto> => {
  const layout = getGameMapLayout();

  const newGame = {
    layout,
    isStarted: false,
    players: [req.playerId],
    name: req.name,
    maxPlayers: req.maxPlayers,
    creator: req.playerId,
  }
  
  const game = await addGame(newGame);

  //communicate with socket server about game created
  new GameCreatedPublisher(natsWrapper.client).publish({
    id: game.id,
  });

  const { id, name, maxPlayers, players } = game;

  return { id, name, maxPlayers, playersCount: players.length };
};

export const joinGame = async (gameId: string, req: IJoinGameRequestDto): Promise<IGameResponseDto> => {
  const currentGame = await getGame(gameId);
  console.log({currentGame}, getAllGames())
  if(currentGame.players.length - 1 < currentGame.maxPlayers) {
    currentGame.players.push(req.playerId);
    const updatedGame = await updateGame(currentGame);
    const { id, name, maxPlayers, players } = updatedGame;

    return { id, name, maxPlayers, playersCount: players.length };
  } else {
    throw new Error('Game is full');
  }
};

export const getAllGames = async (): Promise<IGameResponseDto[]> => {
  const games = await getGames();
  const result: IGameResponseDto[] = [];

  games.forEach(game => {
    const { id, name, maxPlayers, players } = game;
    result.push({ id, name, maxPlayers, playersCount: players.length });
  });

  return result
};

// export const getGame = async (gameId: string): Promise<IGameResponseDto> => {
//   const game = await getGame(gameId);
//   const result: IGameResponseDto[] = [];

//   games.forEach(game => {
//     const { id, name, maxPlayers, players } = game;
//     result.push({ id, name, maxPlayers, playersCount: players.length });
//   });

//   return result
// };