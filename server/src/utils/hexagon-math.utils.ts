import {
  GameLayoutDetails,
  HexCoordinates,
  Orientation,
  Point,
  Road,
} from "../interfaces";

export const point = (x: number, y: number) => ({ x, y });

/**
 * q, r, s are coordinates of the hex
 */
export const hex = (q: number, r: number, s: number) => {
  if (Math.round(q + r + s) !== 0) {
    throw "q + r + s must be 0";
  }

  return { q: q, r: r, s: s };
};

/**
 * flat or pointy top orientation
 */
export const orientation = (
  f0: number,
  f1: number,
  f2: number,
  f3: number,
  b0: number,
  b1: number,
  b2: number,
  b3: number,
  start_angle: number
) => ({ f0, f1, f2, f3, b0, b1, b2, b3, start_angle });

export const layout = (
  hexOrientation: Orientation,
  hexDimensions: Point,
  gridStartPoint: Point
) => ({ hexOrientation, hexDimensions, gridStartPoint });

export const pointyLayout = orientation(
  Math.sqrt(3),
  Math.sqrt(3) / 2,
  0,
  3 / 2,
  Math.sqrt(3) / 3,
  -1 / 3,
  0,
  2 / 3,
  0.5
);

/**
 * f0, f1, f2, f3 coefficients are for converting axial coordinates (q, r) to Cartesian coordinates (x, y)
 * b0, b1, b2, b3 coefficients are for converting Cartesian coordinates (x, y) back to axial coordinates (q, r)
 * start_angle determines the position of the first corner of the hexagon. For flat-topped hexagons, the angle is 0 radians (aligned horizontally).
 */
export const flatLayout = orientation(
  3 / 2,
  0,
  Math.sqrt(3) / 2,
  Math.sqrt(3),
  2 / 3,
  0,
  -1 / 3,
  Math.sqrt(3) / 3,
  0
);

/**
 * Generates the 6 corner positions (pixels) for a given hexagon.
 * @param layout
 * @param h
 * @returns
 */
export const hexToPixel = (layout: GameLayoutDetails, h: HexCoordinates) => {
  const orientation = layout.hexOrientation;
  const size = layout.hexDimensions;
  const origin = layout.gridStartPoint;

  const x = (orientation.f0 * h.q + orientation.f1 * h.r) * size.x;
  const y = (orientation.f2 * h.q + orientation.f3 * h.r) * size.y;

  return point(x + origin.x, y + origin.y);
};

// // // function pixelToHex(layout, p) {
// // //     let M = layout.orientation;
// // //     let size = layout.size;
// // //     let origin = layout.origin;
// // //     let pt = point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
// // //     let q = M.b0 * pt.x + M.b1 * pt.y;
// // //     let r = M.b2 * pt.x + M.b3 * pt.y;
// // //     return hex(q, r, -q - r);
// // // };

/**
 * Calculates the offset for each corner of a hexagon relative to its center.
 * @param layout
 * @param corner
 * @returns
 */
export const hexCornerOffset = (layout: GameLayoutDetails, corner: number) => {
  const orientation = layout.hexOrientation;
  const size = layout.hexDimensions;
  const angle = (2 * Math.PI * (orientation.start_angle - corner)) / 6;
  return point(size.x * Math.cos(angle), size.y * Math.sin(angle));
};

/**
 * Converts hexagonal coordinates to screen coordinates based on the layout.
 * @param layout
 * @param hex
 * @returns
 */
export const polygonCorners = (
  layout: GameLayoutDetails,
  hex: HexCoordinates
) => {
  const corners = [];
  const center = hexToPixel(layout, hex);

  for (let i = 0; i < 6; i++) {
    const offset = hexCornerOffset(layout, i);
    corners.push(point(center.x + offset.x, center.y + offset.y));
  }

  return corners;
};

/**
 * @param size The gameboard size e.g. size = 2 will result in a board with 5 rows, size = 3 will result in a board with 7 rows
 */
export const generateHexagonalGrid = (size: number) => {
  const hexCoordinates: HexCoordinates[] = [];

  for (let q = -size; q <= size; q++) {
    const r1 = Math.max(-size, -q - size);
    const r2 = Math.min(size, -q + size);

    for (let r = r1; r <= r2; r++) {
      hexCoordinates.push(hex(q, r, -q - r));
    }
  }

  return hexCoordinates;
};

// Here we take all gridHexesCornersMap and reduce only the unique ones
export const generateUniqueCornerCoordinates = (
  gridHexesCornersMap: Point[][]
) => {
  return gridHexesCornersMap.reduce((uniqueCorners, hexagonCorners) => {
    hexagonCorners.forEach((corner) => {
      //Check if hexagon corner pixels are equal
      //This is not the ideal solution, will be improved in the future!
      const areCornersEqual = (a: number, b: number, c: number, d: number) => {
        const firstCornerAbsoluteValue = Math.abs(a + b);
        const secondCornerAbsoluteValue = Math.abs(c + d);
        const cornersDifference = Math.abs(
          firstCornerAbsoluteValue - secondCornerAbsoluteValue
        );

        if (
          firstCornerAbsoluteValue == secondCornerAbsoluteValue ||
          cornersDifference < 0.0000001
        ) {
          return true;
        }

        return false;
      };

      if (
        !uniqueCorners.some((a) =>
          areCornersEqual(a.x, a.y, corner.x, corner.y)
        )
      ) {
        uniqueCorners.push({ x: corner.x, y: corner.y });
      }
    });

    return uniqueCorners;
  }, []);
};

export const getAllRoadPositions = (
  hexagonCornersPixelCoordinates: Point[]
) => {
  const roads: Road[] = [];

  for (let i = 0; i < hexagonCornersPixelCoordinates.length; i++) {
    // check upper mid possible road
    const upperMid = hexagonCornersPixelCoordinates.find(
      (corner) =>
        Math.abs(corner.x - hexagonCornersPixelCoordinates[i].x) < 1 &&
        corner.y === hexagonCornersPixelCoordinates[i].y - 80
    );

    if (
      upperMid &&
      !roads.find(
        (points) =>
          points.a.x === hexagonCornersPixelCoordinates[i].x &&
          points.a.y === hexagonCornersPixelCoordinates[i].y &&
          points.b.x === hexagonCornersPixelCoordinates[i].x &&
          points.b.y === hexagonCornersPixelCoordinates[i].y - 80
      )
    ) {
      roads.push({
        a: {
          x: hexagonCornersPixelCoordinates[i].x,
          y: hexagonCornersPixelCoordinates[i].y,
        },
        b: {
          x: hexagonCornersPixelCoordinates[i].x,
          y: hexagonCornersPixelCoordinates[i].y - 80,
        },
      });
    }

    // check upper left possible road
    const upperLeft = hexagonCornersPixelCoordinates.find(
      (corner) =>
        Math.abs(corner.x - hexagonCornersPixelCoordinates[i].x - 70) < 1 &&
        corner.y === hexagonCornersPixelCoordinates[i].y - 40
    );

    if (
      upperLeft &&
      !roads.find(
        (points) =>
          points.a.x === hexagonCornersPixelCoordinates[i].x &&
          points.a.y === hexagonCornersPixelCoordinates[i].y &&
          points.b.x === upperLeft.x &&
          points.b.y === upperLeft.y
      )
    ) {
      roads.push({
        a: {
          x: hexagonCornersPixelCoordinates[i].x,
          y: hexagonCornersPixelCoordinates[i].y,
        },
        b: { x: upperLeft.x, y: upperLeft.y },
      });
    }

    // check upper left possible road
    const upperRight = hexagonCornersPixelCoordinates.find(
      (corner) =>
        Math.abs(corner.x - hexagonCornersPixelCoordinates[i].x + 70) < 1 &&
        corner.y === hexagonCornersPixelCoordinates[i].y - 40
    );

    if (
      upperRight &&
      !roads.find(
        (points) =>
          points.a.x === hexagonCornersPixelCoordinates[i].x &&
          points.a.y === hexagonCornersPixelCoordinates[i].y &&
          points.b.x === upperRight.x &&
          points.b.y === upperRight.y
      )
    ) {
      roads.push({
        a: {
          x: hexagonCornersPixelCoordinates[i].x,
          y: hexagonCornersPixelCoordinates[i].y,
        },
        b: { x: upperRight.x, y: upperRight.y },
      });
    }
  }

  return roads;
};
