const width = 150;
const height = 100;

const wheatTiles = Array(4).fill(
  `https://images.unsplash.com/photo-1562060879-cbdb5285a6de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`
);
const forestTiles = Array(4).fill(
  `https://images.unsplash.com/photo-1500380176164-2a1f4445e086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`
);
const sheepTiles = Array(4).fill(
  `https://images.unsplash.com/photo-1585924966618-13365f890131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`
);
const stoneTiles = Array(3).fill(
  `https://images.unsplash.com/photo-1513083457273-8ea7b2a045c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`
);
const brickTiles = Array(3).fill(
  `https://images.unsplash.com/photo-1593980747575-c05c2f0b0dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`
);
const dezertTile = [
  `https://images.unsplash.com/photo-1488197047962-b48492212cda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
];

exports.mapTilesBackground = [
  ...wheatTiles,
  ...forestTiles,
  ...sheepTiles,
  ...stoneTiles,
  ...brickTiles,
  ...dezertTile,
];
