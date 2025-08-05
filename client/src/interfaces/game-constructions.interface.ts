import { GameObjects } from "phaser";
import { PLAYER_COLOR } from "../enums";
import { Point } from "./point.interface"
import { IRoad } from "./road.interface"

export interface IGameConstruction {
  coordinates: Point;
  player: string;
  color: PLAYER_COLOR;
  graphics?: GameObjects.Graphics
}

export interface IGameRoadConstruction {
  coordinates: IRoad;
  player: string;
  color: PLAYER_COLOR;
  graphics?: GameObjects.Graphics
}

export interface IGameConstructions {
  settlements: IGameConstruction[],
  roads: IGameRoadConstruction[],
  cities: IGameConstruction[],
}