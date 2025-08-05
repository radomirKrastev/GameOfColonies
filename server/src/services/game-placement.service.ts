import { Point, IGameConstructions, Road } from "../interfaces";
import {
  getImpossibleSettlements,
  getPossibleRoadExtensions,
  isSettlementPossible,
} from "../utils/index";
import {
  gameMapRepository
} from '../repository';
import { emitNewConstruction } from "../socket/services";
import { usersService } from "./users.service";
import { IAvailableRoad, IGameAvailableSpots } from "../interfaces/game-available-spots.interface";
import { IGameEntity } from "../interfaces/entities";

const getAvailableSpots = async (gameId: string, userId: string, currentGame: IGameEntity): Promise<IGameAvailableSpots> => {
  let settlements = [];
  if (currentGame.constructions.settlements.filter(x => x.player === userId).length < 2) {
    settlements = currentGame.availableSpots.settlements;
  } else {
    settlements = currentGame.availableSpots.settlements.filter(spot => spot.availableFor.includes(userId));
  }

  const roads = currentGame.availableSpots.roads.filter(spot => spot.availableFor.includes(userId));

  return {
    settlements,
    roads,
    cities: currentGame.availableSpots.cities.filter(spot => spot.availableFor.includes(userId)),
  };
}

const getCurrentAvailableSpots = async (gameId: string, userId: string): Promise<IGameAvailableSpots> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  if (currentGame.constructions.roads.filter(x => x.player === userId).length < 2) {
    return getInitialAvailableSpots(gameId, userId, currentGame);
  }

  return getAvailableSpots(gameId, userId, currentGame);
};

const getInitialAvailableSpots = async (gameId: string, userId: string, currentGame: IGameEntity): Promise<IGameAvailableSpots> => {
  const settlements = currentGame.availableSpots.settlements;

  let roads: IAvailableRoad[] = [];
  const userSettlements = currentGame.constructions.settlements.filter(x => x.player === userId);
  const buildRoadsCoordinates = currentGame.constructions.roads.map(road => road.coordinates);

  if (currentGame.constructions.settlements.filter(x => x.player === userId).length === 1) {
    const userSettlement = userSettlements[0];
    const coordinates = userSettlement.coordinates;
    const possibleRoadExtensions: Road[] =
      getPossibleRoadExtensions(coordinates, currentGame.map.uniqueHexagonCornerCoordinates, buildRoadsCoordinates)

    possibleRoadExtensions.forEach(element => {
      roads.push({ coordinates: element, availableFor: [userId] });
    });
  } else if (currentGame.constructions.settlements.filter(x => x.player === userId).length === 2) {
    const userSettlement = userSettlements.find(settlement => settlement.isSecond);
    const coordinates = userSettlement!.coordinates;
    const possibleRoadExtensions: Road[] =
      getPossibleRoadExtensions(coordinates, currentGame.map.uniqueHexagonCornerCoordinates, buildRoadsCoordinates)

    possibleRoadExtensions.forEach(element => {
      roads.push({ coordinates: element, availableFor: [userId] });
    });
  }

  return {
    settlements,
    roads,
    cities: currentGame.availableSpots.cities.filter(spot => spot.availableFor.includes(userId)),
  };
};

const getConstructions = async (gameId: string, userId: string): Promise<IGameConstructions> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  return currentGame.constructions
};

const buildSettlement = async (gameId: string, userId: string, coordinates: Point): Promise<IGameAvailableSpots> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const availableSpots = await getAvailableSpots(gameId, userId, currentGame);
  const constructions = currentGame.constructions;

  const availableSettlementsCoordinates = availableSpots.settlements.map(spot => spot.coordinates);
  const availableCities = availableSpots.cities;
  const availableRoads = availableSpots.roads;
  const availableSettlements = availableSpots.settlements;

  const buildRoadsCoordinates = currentGame.constructions.roads.map(road => road.coordinates);

  const impossibleSettlements = getImpossibleSettlements(coordinates, availableSettlementsCoordinates);
  const possibleRoadExtensions = getPossibleRoadExtensions(coordinates, currentGame.map.uniqueHexagonCornerCoordinates, buildRoadsCoordinates);

  const updatedAvailableCities = availableCities;
  updatedAvailableCities.push({ coordinates, availableFor: [userId] });

  //TODO should be done only for first and second settlement
  const updatedAvailableRoads = [...availableRoads, ...possibleRoadExtensions.map(road => ({ coordinates: road, availableFor: [userId] }))];

  const updatedAvailableSettlements = availableSettlements
    .filter(spot => !impossibleSettlements.some(impossible => impossible.x === spot.coordinates.x && impossible.y === spot.coordinates.y))
  // .map(coordinates => ({ coordinates, availableFor: [] }));

  const updatedAvailableSpots: IGameAvailableSpots = {
    settlements: updatedAvailableSettlements,
    roads: updatedAvailableRoads,
    cities: updatedAvailableCities,
  };

  const isSecondSettlement = constructions.settlements.filter(x => x.player === userId).length == 1;

  const updatedConstructions: IGameConstructions = {
    settlements: constructions.settlements.concat({
      coordinates,
      player: userId,
      color: currentGame.players.find(player => player.userId === userId)!.color,
      isSecond: isSecondSettlement,
    }),
    roads: constructions.roads,
    cities: constructions.cities,
  };

  const updatedGame = await gameMapRepository.updateGame({
    ...currentGame,
    availableSpots: updatedAvailableSpots,
    constructions: updatedConstructions
  });

  const socket = await usersService.getUserSocket(userId);

  if (socket) {
    emitNewConstruction(socket, gameId);
  }

  return updatedGame.availableSpots;
};

const buildRoad = async (gameId: string, userId: string, coordinates: { a: Point; b: Point }): Promise<IGameAvailableSpots> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const availableSpots = await getAvailableSpots(gameId, userId, currentGame);
  const constructions = currentGame.constructions;

  const availableCities = availableSpots.cities;
  const availableRoads = availableSpots.roads;
  const availableSettlements = availableSpots.settlements;

  const buildRoadsCoordinates = currentGame.constructions.roads.map(road => road.coordinates).concat(coordinates);
  const buildSettlementCoordinates = currentGame.constructions.settlements.map(settlement => settlement.coordinates);


  const isSettlementPossibleA = isSettlementPossible(coordinates.a, buildSettlementCoordinates);
  const isSettlementPossibleB = isSettlementPossible(coordinates.b, buildSettlementCoordinates);
  const updatedAvailableSettlements = availableSettlements;


  if (isSettlementPossibleA) {
    const availableSettlementIndex = updatedAvailableSettlements
      .findIndex(spot => spot.coordinates.x === coordinates.a.x && spot.coordinates.y === coordinates.a.y);

    if (availableSettlementIndex !== -1) {
      updatedAvailableSettlements[availableSettlementIndex].availableFor.push(userId);
    } else {
      updatedAvailableSettlements.push({ coordinates: coordinates.a, availableFor: [userId] });
    }
  }

  if (isSettlementPossibleB) {
    const availableSettlementIndex = updatedAvailableSettlements
      .findIndex(spot => spot.coordinates.x === coordinates.b.x && spot.coordinates.y === coordinates.b.y);

    if (availableSettlementIndex !== -1) {
      updatedAvailableSettlements[availableSettlementIndex].availableFor.push(userId);
    } else {
      updatedAvailableSettlements.push({ coordinates: coordinates.b, availableFor: [userId] });
    }
  }

  if (isSettlementPossibleB) {
    updatedAvailableSettlements.push({ coordinates: coordinates.b, availableFor: [userId] });
  }

  const possibleRoadExtensionsOne = getPossibleRoadExtensions(coordinates.a, currentGame.map.uniqueHexagonCornerCoordinates, buildRoadsCoordinates);
  const possibleRoadExtensionsTwo = getPossibleRoadExtensions(coordinates.b, currentGame.map.uniqueHexagonCornerCoordinates, buildRoadsCoordinates);
  const possibleRoadExtensions = possibleRoadExtensionsOne.concat(possibleRoadExtensionsTwo);

  const updatedAvailableRoads = availableRoads.slice().filter(available =>
    !(
      (available.coordinates.a.x === coordinates.a.x && available.coordinates.a.y === coordinates.a.y &&
        available.coordinates.b.x === coordinates.b.x && available.coordinates.b.y === coordinates.b.y) ||
      (available.coordinates.b.x === coordinates.a.x && available.coordinates.b.y === coordinates.a.y &&
        available.coordinates.a.x === coordinates.b.x && available.coordinates.a.y === coordinates.b.y)
    )
  );

  possibleRoadExtensions.forEach(road => {
    const roadExists = updatedAvailableRoads.findIndex(existingRoad =>
      (existingRoad.coordinates.a.x === road.a.x && existingRoad.coordinates.a.y === road.a.y &&
        existingRoad.coordinates.b.x === road.b.x && existingRoad.coordinates.b.y === road.b.y) ||
      (existingRoad.coordinates.b.x === road.a.x && existingRoad.coordinates.b.y === road.a.y &&
        existingRoad.coordinates.a.x === road.b.x && existingRoad.coordinates.a.y === road.b.y)
    );

    if (roadExists === -1) {
      updatedAvailableRoads.push({ coordinates: road, availableFor: [userId] });
    } else {
      if (!updatedAvailableRoads[roadExists].availableFor.includes(userId)) {
        updatedAvailableRoads[roadExists].availableFor.push(userId);
      }
    }
  });

  const updatedAvailableSpots: IGameAvailableSpots = {
    settlements: updatedAvailableSettlements,
    roads: updatedAvailableRoads,
    cities: availableCities,
  };

  const updatedConstructions: IGameConstructions = {
    settlements: constructions.settlements,
    roads: constructions.roads.concat({
      coordinates,
      player: userId,
      color: currentGame.players.find(player => player.userId === userId)!.color
    }),
    cities: constructions.cities,
  };

  const updatedGame = await gameMapRepository.updateGame({
    ...currentGame,
    availableSpots: updatedAvailableSpots,
    constructions: updatedConstructions
  });

  const socket = await usersService.getUserSocket(userId);

  if (socket) {
    emitNewConstruction(socket, gameId);
  }

  return updatedGame.availableSpots;
};

const buildCity = async (gameId: string, userId: string, coordinates: Point): Promise<IGameAvailableSpots> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const availableSpots = await getAvailableSpots(gameId, userId, currentGame);
  const constructions = currentGame.constructions;

  const availableCities = availableSpots.cities;
  const availableRoads = availableSpots.roads;
  const availableSettlements = availableSpots.settlements;

  const availableCityIndex = availableCities.findIndex(x =>
    (x.coordinates.x === coordinates.x && x.coordinates.y === coordinates.y)
    && x.availableFor.includes(userId));

  if (availableCityIndex === -1) {
    throw new Error('Cannot build city here');
  }

  availableCities.splice(availableCityIndex, 1);

  const updatedAvailableSpots: IGameAvailableSpots = {
    settlements: availableSettlements,
    roads: availableRoads,
    cities: availableCities,
  };

  const updatedConstructions: IGameConstructions = {
    settlements: constructions.settlements,
    roads: constructions.roads,
    cities: constructions.cities.concat({
      coordinates,
      player: userId,
      color: currentGame.players.find(player => player.userId === userId)!.color,
    }),
  };

  const updatedGame = await gameMapRepository.updateGame({
    ...currentGame,
    availableSpots: updatedAvailableSpots,
    constructions: updatedConstructions
  });

  const socket = await usersService.getUserSocket(userId);

  if (socket) {
    emitNewConstruction(socket, gameId);
  }

  return updatedGame.availableSpots;
};


export const gamePlacementService = {
  getCurrentAvailableSpots,
  getConstructions,
  buildSettlement,
  buildRoad,
  buildCity
};
