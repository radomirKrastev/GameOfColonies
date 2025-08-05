import { PLAYER_COLOR } from "../enums";

export interface IPlayer {
  userId: string;
  color: PLAYER_COLOR;
  points: number;
  hiddenPoints: number;
}