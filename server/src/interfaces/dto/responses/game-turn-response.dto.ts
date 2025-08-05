import { INITIAL_PLACEMENT } from "../../../enums";

export interface IGameTurnResponseDto {
  playerId: string;
  isRolled: boolean; // Optional, as it may not be rolled yet
  isTurnEnded: boolean;
  initialPlacement: INITIAL_PLACEMENT;
}