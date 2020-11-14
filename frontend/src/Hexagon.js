import React from 'react';
import * as PIXI from "pixi.js";
import { Sprite } from '@inlet/react-pixi';

import { mapTilesBackground } from './images';

const Hexagon = ({ hexagonCorners }) => {
    let mapTiles = mapTilesBackground.slice(0);
    //Shuffle Tiles
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    shuffleArray(mapTiles);

    //Find the center of the hexagon on the x axis
    let centerX = hexagonCorners.reduce((acc, xCorner) => {
        acc += xCorner.x;
        return acc;
    }, 0) / 6;

    //Find the center of the hexagon on the y axis
    let centerY = hexagonCorners.reduce((acc, yCorner) => {
        acc += yCorner.y;
        return acc;
    }, 0) / 6;

    // Draw the hexagon mask
    let mask = new PIXI.Graphics();

    mask.beginFill(0xff3300);

    mask.moveTo(hexagonCorners[0].x, hexagonCorners[0].y);
    for (let i = 1; i < 6; i++) {
        mask.lineTo(hexagonCorners[i].x, hexagonCorners[i].y);
    }

    mask.lineTo(hexagonCorners[0].x, hexagonCorners[0].y);

    //Generate the sprite
    let tile = mapTiles.pop();
    // console.log(mapTiles);
    const sprite = PIXI.Texture.from(tile);
    sprite.mask = mask

    return (
        <Sprite mask={mask} texture={sprite} x={centerX} y={centerY} anchor={0.5} />
    );
};

export default Hexagon;
