import { TILE_RESOURCES } from "../enums";
import { Point } from "./point.interface";

export interface Tile {
  corners: Point[],
  center: Point, // center of the hexagon on the x axis, center of the hexagon on the y axis
  resource: TILE_RESOURCES,
  value: number,
}