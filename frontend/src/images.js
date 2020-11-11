// 0: {x: 420, y: 180.71796769724492}
// 1: {x: 400, y: 146.07695154586736}
// 2: {x: 360, y: 146.07695154586736}
// 3: {x: 340, y: 180.71796769724492}
// 4: {x: 360, y: 215.35898384862247}
// 5: {x: 400, y: 215.35898384862247}

//Forest
//'https://images.unsplash.com/photo-1530799750-13f7b374d113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'

//Sheeps
//'https://images.unsplash.com/photo-1530483669142-1c576f37c37b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'

//Stones
//'https://images.unsplash.com/photo-1599389932245-f414c9576ab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'

//Bricks
//'https://images.unsplash.com/photo-1593980747575-c05c2f0b0dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'

//Wheat
//'https://images.unsplash.com/photo-1562060879-cbdb5285a6de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'

//Dezert
//'https://images.unsplash.com/photo-1535093838480-90f893310529?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'

const width = 150;
const height = 100;

// const images = [
//     `https://images.unsplash.com/photo-1530799750-13f7b374d113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
//     `https://images.unsplash.com/photo-1530483669142-1c576f37c37b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
//     `https://images.unsplash.com/photo-1599389932245-f414c9576ab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
//     `https://images.unsplash.com/photo-1535093838480-90f893310529?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
//     `https://images.unsplash.com/photo-1562060879-cbdb5285a6de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
//     `https://images.unsplash.com/photo-1593980747575-c05c2f0b0dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`,
// ];

const wheatTiles = Array(4).fill(`https://images.unsplash.com/photo-1562060879-cbdb5285a6de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`);
const forestTiles = Array(4).fill(`https://images.unsplash.com/photo-1500380176164-2a1f4445e086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`);
const sheepTiles = Array(4).fill(`https://images.unsplash.com/photo-1585924966618-13365f890131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`);
const stoneTiles = Array(3).fill(`https://images.unsplash.com/photo-1513083457273-8ea7b2a045c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`);
const brickTiles = Array(3).fill(`https://images.unsplash.com/photo-1593980747575-c05c2f0b0dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`);
const dezertTile = [`https://images.unsplash.com/photo-1488197047962-b48492212cda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=${width}&q=${height}`];

export let mapTilesBackground = [
    ...wheatTiles,
    ...forestTiles,
    ...sheepTiles,
    ...stoneTiles,
    ...brickTiles,
    ...dezertTile
];
