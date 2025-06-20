import { IDicesResponseDto } from "../interfaces";
import {
  getRandomndInt,
} from "../utils/index";
import {
  gameMapRepository
} from '../repository';

import { emitDicesRolled } from "../socket/services";
import { usersService } from "./users.service";


const rollDices = async (gameId: string, userId: string): Promise<IDicesResponseDto> => {
  const currentGame = await gameMapRepository.getGame(gameId);
  const currentTurn = currentGame.gameTurns[currentGame.gameTurns.length - 1];

  console.log('START GAME SERVICE', currentGame.creator === userId);

  if (currentTurn.playerId !== userId) {
    throw new Error('It is not your turn');
  } else if(currentTurn.roll) {
    throw new Error('You have already rolled the dices this turn');
  } else {
    const diceOne = getRandomndInt(1, 7);
    const diceTwo = getRandomndInt(1, 7);

    // 1. Should create a collection of rolls and resources
    // 2. Should send the resources allocated to players
    currentGame.gameTurns[currentGame.gameTurns.length - 1].roll = {
      diceOne,
      diceTwo
    };
    const updatedGame = await gameMapRepository.updateGame(currentGame);

    const socket = await usersService.getUserSocket(userId);

    if (socket) {
      emitDicesRolled(socket, gameId);
    }

    const { gameTurns } = updatedGame;

    return gameTurns[gameTurns.length - 1].roll!;
  }
};

const getDices = async (gameId: string): Promise<IDicesResponseDto> => {
  const game = await gameMapRepository.getGame(gameId);
  const { gameTurns } = game;

  return gameTurns[gameTurns.length - 1].roll!;
};


export const gameActionsService = {
  rollDices,
  getDices
};
