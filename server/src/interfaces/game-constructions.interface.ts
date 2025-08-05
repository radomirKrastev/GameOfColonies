import { PLAYER_COLOR } from "../enums";
import { Point } from "./point.interface"
import { Road } from "./road.interface"

interface IGameConstruction {
  coordinates: Point;
  player: string;
  color: PLAYER_COLOR;
}

interface IGameRoadConstruction {
  coordinates: Road;
  player: string;
  color: PLAYER_COLOR;
}

interface IGameSettlementConstruction {
  coordinates: Point;
  player: string;
  color: PLAYER_COLOR;
  isSecond?: boolean;
}

export interface IGameConstructions {
  settlements: IGameSettlementConstruction[],
  roads: IGameRoadConstruction[],
  cities: IGameConstruction[],
}