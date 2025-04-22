export interface IGameEntity {
  id: string,
  //TODO layout interface
  layout: any,
  isStarted: boolean,
  players: string[]
  name: string,
  maxPlayers: number
}
