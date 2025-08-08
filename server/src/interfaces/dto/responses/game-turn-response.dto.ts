export interface IGameTurnResponseDto {
  playerId: string;
  isRolled: boolean; // Optional, as it may not be rolled yet
  isTurnEnded: boolean;
  initialPlacement: boolean;
}