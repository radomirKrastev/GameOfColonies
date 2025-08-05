import { PLAYER_COLOR } from "../enums";

export const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const getRandomndInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getPlayerColor = (index: number): PLAYER_COLOR => {
  switch (index) {
    case 0:
      return PLAYER_COLOR.BLACK;
    case 1:
      return PLAYER_COLOR.RED;
    case 2:
      return PLAYER_COLOR.WHITE;
    case 3:
      return PLAYER_COLOR.BLUE;
    default:
      return PLAYER_COLOR.BLACK; // Default color if index is out of range
  }
}