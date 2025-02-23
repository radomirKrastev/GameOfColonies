import { TILE_RESOURCES } from "../enums";
import { TILE_VALUES } from "../constants";
import { Tile } from "../interfaces";
import { getRandomndInt, shuffleArray } from "./helpers.utils";

const wheatTiles: TILE_RESOURCES[] = Array(4).fill(TILE_RESOURCES.WHEAT);
const woodTiles: TILE_RESOURCES[] = Array(4).fill(TILE_RESOURCES.WOOD);
const sheepTiles: TILE_RESOURCES[] = Array(4).fill(TILE_RESOURCES.SHEEP);
const stoneTiles: TILE_RESOURCES[] = Array(3).fill(TILE_RESOURCES.STONE);
const brickTiles: TILE_RESOURCES[] = Array(3).fill(TILE_RESOURCES.BRICK);
const dezertTile: TILE_RESOURCES[] = [TILE_RESOURCES.DEZERT];

const tileValues = TILE_VALUES.slice();

const tiles: Tile[] = [
  ...wheatTiles,
  ...woodTiles,
  ...sheepTiles,
  ...stoneTiles,
  ...brickTiles,
  ...dezertTile,
].map(x => {
  const ceiling = tileValues.length;
  const index = getRandomndInt(0, ceiling);
  const value = tileValues[index];
  tileValues.splice(index, 1);

  return {
    resource: x,
    value,
  }
});

export const getArrangedTiles = (): Tile[] => shuffleArray(tiles);
