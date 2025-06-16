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

  console.log('START GAME SERVICE', currentGame.creator === userId);

  if (currentGame.playerTurn === userId) {
    const diceOne = getRandomndInt(1, 7);
    const diceTwo = getRandomndInt(1, 7);

    // 1. Should create a collection of rolls and resources
    // 2. Should send the resources allocated to players
    currentGame.currentRoll = { diceOne, diceTwo }
    const updatedGame = await gameMapRepository.updateGame(currentGame);

    const socket = await usersService.getUserSocket(userId);

    if (socket) {
      emitDicesRolled(socket, gameId);
    }

    const { currentRoll } = updatedGame;

    return { diceOne: currentRoll!.diceOne, diceTwo: currentRoll!.diceTwo };
  } else {
    throw new Error('It is not your turn');
  }
};

const getDices = async (gameId: string): Promise<IDicesResponseDto> => {
  const game = await gameMapRepository.getGame(gameId);
  const { currentRoll } = game;

  return { diceOne: currentRoll!.diceOne, diceTwo: currentRoll!.diceTwo };
};


export const gameActionsService = {
  rollDices,
  getDices
};
