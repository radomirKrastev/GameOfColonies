export const shuffleArray = <T>(array: T[]) => {
  // console.log(111111, JSON.stringify(array, null, 2))
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // console.log(222222, JSON.stringify(array, null, 2))
  return array;
};

export const getRandomndInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
