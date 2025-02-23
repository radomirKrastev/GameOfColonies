import { Point } from "./point.interface";
import { IRoad } from "./road.interface";
import { Tile } from "./tile.interface";

export interface GameMapLayout {
    uniqueHexagonCornerCoordinates: Point[];
    roadPositions: IRoad[];
    tiles: Tile[];
    gridHexesCornersMap: Point[][];
}

