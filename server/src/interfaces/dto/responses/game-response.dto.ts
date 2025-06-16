export interface IGameResponseDto {
  id: string;
  name: string;
  maxPlayers: number;
  playersCount: number;
  creator: string;
  playerTurn?: string | null;
}