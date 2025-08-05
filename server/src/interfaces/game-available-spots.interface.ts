import { Point } from "./point.interface";
import { Road } from "./road.interface";

interface IAvailableSpot {
  coordinates: Point;
  availableFor: string[];
}

export interface IAvailableRoad {
  coordinates: Road;
  availableFor: string[];
}

export interface IGameAvailableSpots {
  settlements: IAvailableSpot[],
  roads: IAvailableRoad[],
  cities: IAvailableSpot[],
}
