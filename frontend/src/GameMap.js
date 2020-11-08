import React from 'react';
import { Stage } from '@inlet/react-pixi';

import { hex, polygonCorners, generateHexagonalGrid } from './hexagonMathFunctions';
import { SCREEN_LAYOUT, RADIUS_SIZE } from './GameMapConstants';

import Hexagon from './Hexagon';

import './App.css';
import './GameMap.scss';

let gridHexesCoordinatesMap = generateHexagonalGrid(RADIUS_SIZE);

//in pixels
let gridHexesCornersMap = [];
gridHexesCoordinatesMap.slice().forEach(hexCoordinates => {
    gridHexesCornersMap.push(polygonCorners(SCREEN_LAYOUT, hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)));
});

const HexagonGrid = () => {
    return <div className="game-map-wrapper">
        <Stage className="game-map-stage" width={1000} height={470} options={{ antialias: true, backgroundColor: 0xeef1f5 }}>
            {gridHexesCornersMap.map((x, i) => {
                return <Hexagon key={i} hexagonCorners={x}></Hexagon>
            })}
        </Stage>
    </div>
};

export default HexagonGrid;