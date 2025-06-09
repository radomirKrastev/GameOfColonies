import { Point } from "./point.interface";
import { Road } from "./road.interface";
import { Tile } from "./tile.interface";

export interface IGameMap {
  gridHexesCornersMap: Point[][]
  uniqueHexagonCornerCoordinates: Point[]
  roadPositions: Road[]
  tiles: Tile[]
};

