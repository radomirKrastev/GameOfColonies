export interface IGameTurn {
  playerId: string;
  nextPlayerIndex: number,
  roll: { diceOne: number, diceTwo: number } | null,
  isTurnEnded: boolean;
  initialPlacement: boolean;
};

