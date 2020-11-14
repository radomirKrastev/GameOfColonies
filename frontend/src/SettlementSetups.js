import React, { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';

import './SettlementSetups.scss';

const SettlementSetups = ({ gridHexesCornersMap }) => {
    // Here we take all gridHexesCornersMap and reduce only the unique ones
    const uniqueHexagonCorners = gridHexesCornersMap.reduce((uniqueCorners, hexagonCorners) => {
        hexagonCorners.forEach(corner => {

            //Check if hexagon corner pixels are equal
            //This is not the ideal solution, will be improved in the future!
            const areCornersEqual = (a, b, c, d) => {
                let firstCornerAbsoluteValue = Math.abs(a + b);
                let secondCornerAbsoluteValue = Math.abs(c + d);
                let cornersDifference = Math.abs(firstCornerAbsoluteValue - secondCornerAbsoluteValue);

                if (firstCornerAbsoluteValue == secondCornerAbsoluteValue || cornersDifference < 0.0000001) {
                    return true;
                }

                return false;
            }

            if (!uniqueCorners.some(a => areCornersEqual(a.x, a.y, corner.x, corner.y))) {
                uniqueCorners.push({x: corner.x, y:corner.y});
            }
        })
        return uniqueCorners;
    }, []);

    // console.log(gridHexesCornersMap);
    // console.log(uniqueHexagonCorners);

    const drawCornerTargets = useCallback((g) => {
        g.clear();
        uniqueHexagonCorners.forEach(corner => {
            g.lineStyle(2, 0xff3300, 1)
            g.beginFill(0xffffff, 0, 1);
            g.drawCircle(corner.x, corner.y, 5);
            g.endFill();
        });
      }, [gridHexesCornersMap]);

    return (
        <Graphics draw={drawCornerTargets} />
    );
};

export default SettlementSetups;
