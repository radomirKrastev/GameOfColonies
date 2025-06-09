import { TILE_RESOURCES } from "../enums";
import { TILE_VALUES } from "../constants";
import { Point, Tile } from "../interfaces";
import { getRandomndInt, shuffleArray } from "./helpers.utils";

const wheatTiles: TILE_RESOURCES[] = Array(4).fill(TILE_RESOURCES.WHEAT);
const woodTiles: TILE_RESOURCES[] = Array(4).fill(TILE_RESOURCES.WOOD);
const sheepTiles: TILE_RESOURCES[] = Array(4).fill(TILE_RESOURCES.SHEEP);
const stoneTiles: TILE_RESOURCES[] = Array(3).fill(TILE_RESOURCES.STONE);
const brickTiles: TILE_RESOURCES[] = Array(3).fill(TILE_RESOURCES.BRICK);
const dezertTile: TILE_RESOURCES[] = [TILE_RESOURCES.DEZERT];

const tiles = (gridHexesCornersMap: Point[][], tileValues: number[]): Tile[] => {
  return [
    ...wheatTiles,
    ...woodTiles,
    ...sheepTiles,
    ...stoneTiles,
    ...brickTiles,
    ...dezertTile,
  ].map((x, i) => {
    const tileValuesIndex = getRandomndInt(0, tileValues.length);
    const value = tileValues[tileValuesIndex];

    const tileCornersIndex = getRandomndInt(0, gridHexesCornersMap.length);
    const tileCorners = gridHexesCornersMap[tileCornersIndex];


    tileValues.splice(tileValuesIndex, 1);
    gridHexesCornersMap.splice(tileCornersIndex, 1)
    console.log({ index: tileValuesIndex, value, tileIndex: tileCornersIndex })
    // center of the hexagon on the x axis
    const centerX =
      tileCorners.reduce((acc, xCorner) => {
        acc += xCorner.x;
        return acc;
      }, 0) / 6;

    // center of the hexagon on the y axis
    const centerY =
      tileCorners.reduce((acc, yCorner) => {
        acc += yCorner.y;
        return acc;
      }, 0) / 6;
    console.log(centerX, centerY)
    return {
      resource: x,
      value,
      center: { x: centerX, y: centerY },
      corners: tileCorners
    }
  })
};

export const getArrangedTiles = (gridHexesCornersMap: Point[][]): Tile[] => shuffleArray(tiles(gridHexesCornersMap.slice(), TILE_VALUES.slice()));
