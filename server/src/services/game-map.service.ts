import { Point } from "../interfaces";
import {
  generateHexagonalGrid,
  generateUniqueCornerCoordinates,
  getAllRoadPositions,
  hex,
  polygonCorners,
  getArrangedTiles,
  point,
  layout,
  pointyLayout,
} from "../utils/index";
import {
  BOARD_RADIUS_SIZE,
  HEX_SIZE,
  ORIGIN_POSITION_X,
  ORIGIN_POSITION_Y,
} from '../constants';

export const getGameMapLayout = () => {
  const hexSize = point(HEX_SIZE, HEX_SIZE);
  const originPosition = point(ORIGIN_POSITION_X, ORIGIN_POSITION_Y);
  const screenLayout = layout(pointyLayout, hexSize, originPosition);

  const gridHexesCoordinatesMap = generateHexagonalGrid(BOARD_RADIUS_SIZE);

  const gridHexesCornersMap: Point[][] = [];
  gridHexesCoordinatesMap.slice().forEach((hexCoordinates) => {
    gridHexesCornersMap.push(
      polygonCorners(
        screenLayout,
        hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)
      )
    );
  });

  const uniqueHexagonCornerCoordinates =
    generateUniqueCornerCoordinates(gridHexesCornersMap);
  const roadPositions = getAllRoadPositions(uniqueHexagonCornerCoordinates);
  const tiles = getArrangedTiles();

  return {
    gridHexesCornersMap,
    uniqueHexagonCornerCoordinates,
    roadPositions,
    tiles,
  };
};