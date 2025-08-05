import { Point } from "./point.interface";
import { IRoad } from "./road.interface";

export interface IAvailableSpot {
  coordinates: Point;
  availableFor: string[];
  graphics?: Phaser.GameObjects.Graphics;
}

export interface IAvailableRoad {
  coordinates: IRoad;
  availableFor: string[];
  graphics?: Phaser.GameObjects.Graphics;
}

export interface IGameAvailableSpots {
  settlements: IAvailableSpot[],
  roads: IAvailableRoad[],
  cities: IAvailableSpot[],
}
