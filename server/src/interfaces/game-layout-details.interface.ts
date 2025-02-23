import { Orientation } from "./orientation.interace";
import { Point } from "./point.interface";

export interface GameLayoutDetails {
  hexOrientation: Orientation;
  hexDimensions: Point;
  gridStartPoint: Point;
}