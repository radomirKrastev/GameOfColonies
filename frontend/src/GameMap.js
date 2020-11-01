import React from 'react';
import './App.css';
// import { Graphics, graphicsUtils } from 'pixi.js';
import { Stage, Graphics } from '@inlet/react-pixi';
import { hex, polygonCorners, generateHexagonalGrid } from './hexagonMathFunctions';
import { SCREEN_LAYOUT, RADIUS_SIZE } from './GameMapConstants';

let gridHexesCoordinatesMap = generateHexagonalGrid(RADIUS_SIZE);

//in pixels 
let gridHexesCornersMap = [];
gridHexesCoordinatesMap.slice().forEach(hexCoordinates => {
    gridHexesCornersMap.push(polygonCorners(SCREEN_LAYOUT, hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)));
});

const Hexagon = () => {
    console.log(gridHexesCoordinatesMap);
    console.log(gridHexesCornersMap);
    return <Stage width={1000} height={1000} options={{ antialias: true, backgroundColor: 0xeef1f5 }}>
        <Graphics
            draw={g => {
                g.lineStyle(2, 0xffd900);
                g.beginFill(0xff3300);

                for (let i = 0; i < gridHexesCornersMap.length; i++) {
                    g.moveTo(gridHexesCornersMap[i][0].x, gridHexesCornersMap[i][0].y);

                    for (let z = 1; z < 6; z++) {
                        g.lineTo(gridHexesCornersMap[i][z].x, gridHexesCornersMap[i][z].y);
                    }

                    g.lineTo(gridHexesCornersMap[i][0].x, gridHexesCornersMap[i][0].y)
                };
            }}
        />
    </Stage>
};

export default Hexagon;
