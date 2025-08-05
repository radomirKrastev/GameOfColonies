import { INITIAL_PLACEMENT } from "../enums";

export interface ITurn {
  playerId: string;
  isRolled: boolean;
  isTurnEnded: boolean;
  initialPlacement: INITIAL_PLACEMENT;
}