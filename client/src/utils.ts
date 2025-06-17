import { PLAYER_COLOR } from "./enums";

//Shuffle Tiles
export const shuffleArray = (array: unknown[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getUserId = () => {
  const userId = document.cookie.split('userId=')[1];
  console.log(2, { userId });
  return userId;
}

export const getStyleColor = (color: PLAYER_COLOR | undefined) => {
  switch (color) {
    case PLAYER_COLOR.BLACK:
      return 0x000000;
    case PLAYER_COLOR.RED:
      return 0xff0000;
    case PLAYER_COLOR.WHITE:
      return 0xffffff;
    case PLAYER_COLOR.BLUE:
      return 0x0000ff;
    default:
      return 0x000000; // Default color if none matches
  }
}