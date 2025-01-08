import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
// import { GameObjects } from "phaser";
// import { generateHexagonalGrid, polygonCorners, hex, generateUniqueCornerCoordinates } from './hexagonMathFunctions.ts';
// import { BOARD_RADIUS_SIZE, SCREEN_LAYOUT } from './GameMapConstants';

// const gridHexesCoordinatesMap = generateHexagonalGrid(BOARD_RADIUS_SIZE);

// const gridHexesCornersMap: { x: number, y: number }[][] = [];
// gridHexesCoordinatesMap.slice().forEach(hexCoordinates => {
//   gridHexesCornersMap.push(polygonCorners(SCREEN_LAYOUT, hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)));
// });

// const uniqueHexagonCornerCoordinates = generateUniqueCornerCoordinates(gridHexesCornersMap);

// console.log({uniqueHexagonCornerCoordinates})

function App() {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const chooseSettlement = () => {

  };

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
      <div>
        <div>
          <button className="button" onClick={chooseSettlement}>
            Choose Settlement
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
