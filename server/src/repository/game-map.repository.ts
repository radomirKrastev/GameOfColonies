import crypto from 'crypto';
import { IGameEntity } from '../interfaces/entities';

const games: IGameEntity[] = [];

//TODO layout type
const addGame = (game: Partial<IGameEntity>) => {
  const id = crypto.randomBytes(16).toString("hex");
  const newGame = { id, ...game } as IGameEntity;
  games.push(newGame);

  return newGame;
};

const getGame = (id: string) => {
  const index = games.findIndex(x => x.id === id);

  if (index > -1) {
    return games[index];
  } else {
    throw Error('Cannot find game');
  }
};

const updateGame = (updatedGame: IGameEntity) => {
  const index = games.findIndex(x => x.id === updatedGame.id);

  if (index > -1) {
    games.splice(index, 1);
    games.push(updatedGame);

    return updatedGame;
  } else {
    throw Error('Update game failed');
  }
};

export const getGames = async (): Promise<IGameEntity[]> => {
  return games
};

export const gameMapRepository = {
  addGame,
  updateGame,
  getGame,
  getGames,
}