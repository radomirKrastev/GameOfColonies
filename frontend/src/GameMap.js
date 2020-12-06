import React, { useState, useEffect } from 'react';

import { Stage } from '@inlet/react-pixi';

import { hex, polygonCorners, generateHexagonalGrid } from './hexagonMathFunctions';
import { SCREEN_LAYOUT, RADIUS_SIZE } from './GameMapConstants';

import Hexagon from './Hexagon';
import SettlementSetups from './SettlementSetups';
import { test } from './actions/testActions';

import './GameMap.scss';

let gridHexesCoordinatesMap = generateHexagonalGrid(RADIUS_SIZE);

//in pixels
let gridHexesCornersMap = [];
gridHexesCoordinatesMap.slice().forEach(hexCoordinates => {
    gridHexesCornersMap.push(polygonCorners(SCREEN_LAYOUT, hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)));
});

// console.log(gridHexesCornersMap);

const HexagonGrid = ({
    socket
}) => {
    const [mapTiles, setMapTiles] = useState([]);

    useEffect(() => {
        socket.on('game on', mapTilesShuffled => {
            setMapTiles(mapTilesShuffled);
            console.log(mapTiles);
        });
    }, []);

    const [mapTargetsVisible, setMapTargetsVisible] = useState(false);

    const toggleSettlementTargetsHandler = () => {
        setMapTargetsVisible(!mapTargetsVisible);
        test();
    }

    return <div className="game-map-wrapper">
        {
            mapTiles.length > 0
                ? <Stage className="game-map-stage" width={1000} height={470} options={{ antialias: true, backgroundColor: 0xeef1f5 }}>
                    {gridHexesCornersMap.map((x, i) => {
                        return <Hexagon mapTiles={mapTiles} tileNumber={i} key={i} hexagonCorners={x}></Hexagon>
                    })}
                    {mapTargetsVisible ? <SettlementSetups gridHexesCornersMap={gridHexesCornersMap}></SettlementSetups> : null}
                </Stage>
                : null
        }

        <div className="show-settlement-targets">
            <button onClick={() => toggleSettlementTargetsHandler()}>TEST Button</button>
        </div>
    </div>
};

export default HexagonGrid;