import { TILE_RESOURCES } from "../enums";
import { Point } from "./point.interface";

export interface Tile {
  resource: TILE_RESOURCES,
  value: number,
  center: Point,
  corners: Point[],
}