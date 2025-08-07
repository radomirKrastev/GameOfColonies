import { IGameTurnResponseDto } from "../interfaces";
import {
  gameMapRepository
} from '../repository';
import { emitTurnFinished } from "../socket/services";
import { usersService } from "./users.service";
import { INITIAL_PLACEMENT } from "../enums";

const getTurn = async (gameId: string): Promise<IGameTurnResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const res = currentGame.gameTurns[currentGame.gameTurns.length - 1];

  if (!res) {
    throw new Error('Turn not found');
  }

  return {
    playerId: res.playerId,
    isTurnEnded: res.isTurnEnded,
    isRolled: res.roll !== null,
    initialPlacement: currentGame.gameTurns[currentGame.gameTurns.length - 1].initialPlacement
  };
};

const finishTurn = async (gameId: string, userId: string): Promise<IGameTurnResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);

  const currentTurn = currentGame.gameTurns[currentGame.gameTurns.length - 1];

  if (!currentTurn) {
    throw new Error('Turn not found');
  }

  if (currentTurn.playerId !== userId) {
    throw new Error('It is not your turn');
  }

  currentTurn.isTurnEnded = true;
  currentGame.gameTurns[currentGame.gameTurns.length - 1] = currentTurn;

  const newTurnPlayerIndex = currentTurn.nextPlayerIndex;

  let nextPlayerIndex: number;

  if (currentGame.gameTurns.length === currentGame.players.length) {
    nextPlayerIndex = newTurnPlayerIndex;
  } else if (currentGame.gameTurns.length > currentGame.players.length && currentGame.gameTurns.length < currentGame.players.length * 2) {
    nextPlayerIndex = newTurnPlayerIndex - 1;
  } else {
    nextPlayerIndex = (newTurnPlayerIndex + 1) % currentGame.players.length;
  }

  let initialPlacement = INITIAL_PLACEMENT.COMPLETED;

  if (currentGame.gameTurns.length < currentGame.players.length) {
    initialPlacement = INITIAL_PLACEMENT.FIRST;
  } else if (currentGame.gameTurns.length < currentGame.players.length * 2) {
    initialPlacement = INITIAL_PLACEMENT.SECOND;
  }

  const newTurn = {
    playerId: currentGame.players[newTurnPlayerIndex].userId,
    nextPlayerIndex,
    roll: null,
    isTurnEnded: false,
    initialPlacement,
  };
  currentGame.gameTurns.push(newTurn);

  const updatedGame = await gameMapRepository.updateGame(currentGame);

  const socket = await usersService.getUserSocket(userId);

  if (socket) {
    emitTurnFinished(socket, gameId);
  }

  const res = updatedGame.gameTurns[updatedGame.gameTurns.length - 1];

  return {
    playerId: res.playerId,
    isTurnEnded: res.isTurnEnded,
    isRolled: res.roll !== null,
    initialPlacement: updatedGame.gameTurns[updatedGame.gameTurns.length - 1].initialPlacement
  };
};

export const gameTurnService = {
  getTurn,
  finishTurn,
};
