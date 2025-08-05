import { INITIAL_PLACEMENT } from "../enums";

export interface IGameTurn {
  playerId: string;
  nextPlayerIndex: number,
  roll: { diceOne: number, diceTwo: number } | null,
  isTurnEnded: boolean;
  initialPlacement: INITIAL_PLACEMENT;
};

