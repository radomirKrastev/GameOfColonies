const width = 160;
const height = 160;

export enum TILES {
  WHEAT = `https://images.unsplash.com/photo-1562060879-cbdb5285a6de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
  FOREST = `https://images.unsplash.com/photo-1500380176164-2a1f4445e086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
  SHEEP = `https://images.unsplash.com/photo-1585924966618-13365f890131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
  STONE = `https://images.unsplash.com/photo-1513083457273-8ea7b2a045c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
  BRICK = `https://images.unsplash.com/photo-1593980747575-c05c2f0b0dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
  DEZERT = `https://images.unsplash.com/photo-1488197047962-b48492212cda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
}

const wheatTiles = Array(4).fill('wheat');
const forestTiles = Array(4).fill('forest');
const sheepTiles = Array(4).fill('sheep');
const stoneTiles = Array(3).fill('stone');
const brickTiles = Array(3).fill('brick');
const dezertTile = ['dezert'];

export const mapTilesBackground: TILES[] = [
  ...wheatTiles,
  ...forestTiles,
  ...sheepTiles,
  ...stoneTiles,
  ...brickTiles,
  ...dezertTile
];
