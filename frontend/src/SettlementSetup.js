import React, { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";

import './SettlementSetup.scss';

const SettlementSetup = ({ 
    cornerCoordinates,
    setMapTargetsVisible,
}) => {
    const drawCornerTargets = useCallback((g) => {
        g.clear();

        g.lineStyle(2, 0xff3300, 1)
        g.beginFill(0xffffff, 0, 1);
        g.drawCircle(cornerCoordinates.x, cornerCoordinates.y, 5);
        g.endFill();

        g.interactive = true;

        g.click = function (mouseData) {
            console.log("MOUSE CLICK ", mouseData, cornerCoordinates);
            setMapTargetsVisible(false);
        }; 
    }, [cornerCoordinates]);

    const hitArea = new PIXI.Circle(cornerCoordinates.x, cornerCoordinates.y, 5);

    return (
        <Graphics draw={drawCornerTargets} interactive={true} hitArea={hitArea} />
    );
};

export default SettlementSetup;
