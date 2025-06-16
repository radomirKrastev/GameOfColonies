import { GAME_STATUS } from "../../enums"
import { IGameMap } from "../game-map.interface"

export interface IGameEntity {
  id: string,
  //TODO layout interface
  isStarted: boolean,
  players: string[]
  name: string,
  maxPlayers: number,
  creator: string,
  status: GAME_STATUS,
  //TODO add type
  map: IGameMap
  playerTurn: string | null,
  currentRoll: { diceOne: number, diceTwo: number } | null,
}
  