import { Point } from "./point.interface";
import { Tile } from "./tile.interface";

export interface GameMap {
    uniqueHexagonCornerCoordinates: Point[];
    tiles: Tile[];
    gridHexesCornersMap: Point[][];
}

