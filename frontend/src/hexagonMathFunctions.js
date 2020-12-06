export const point = (x, y) => ({ x, y });

// q, r, s are coordinates of the hex
export const hex = (q, r, s) => {
    if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
    return { q: q, r: r, s: s };
};

// flat or pointy top orientation
export const orientation = (f0, f1, f2, f3, b0, b1, b2, b3, start_angle) => (
    { f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle });

export const layout = (orientation, size, origin) => (
    { orientation: orientation, size: size, origin: origin });

export const pointyLayout = orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
export const flatLayout = orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

export const hexToPixel = (layout, h) => {
    let orientation = layout.orientation;
    let size = layout.size;
    let origin = layout.origin;

    let x = (orientation.f0 * h.q + orientation.f1 * h.r) * size.x;
    let y = (orientation.f2 * h.q + orientation.f3 * h.r) * size.y;

    return point(x + origin.x, y + origin.y);
};

// function pixelToHex(layout, p) {
//     let M = layout.orientation;
//     let size = layout.size;
//     let origin = layout.origin;
//     let pt = point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
//     let q = M.b0 * pt.x + M.b1 * pt.y;
//     let r = M.b2 * pt.x + M.b3 * pt.y;
//     return hex(q, r, -q - r);
// };

// get hex corner position
export const hexCornerOffset = (layout, corner) => {
    let orientation = layout.orientation;
    let size = layout.size;
    let angle = 2.0 * Math.PI * (orientation.start_angle - corner) / 6.0;
    return point(size.x * Math.cos(angle), size.y * Math.sin(angle));
};

// generate hex corners (pixels)
export const polygonCorners = (layout, hex) => {
    let corners = [];
    let center = hexToPixel(layout, hex);
    for (let i = 0; i < 6; i++) {
        let offset = hexCornerOffset(layout, i);
        corners.push(point(center.x + offset.x, center.y + offset.y));
    }

    return corners;
};

export const generateHexagonalGrid = radiusSize => {
    let hexCoordinates = [];

    for (let q = -radiusSize; q <= radiusSize; q++) {
        let r1 = Math.max(-radiusSize, -q - radiusSize);
        let r2 = Math.min(radiusSize, -q + radiusSize);
        for (let r = r1; r <= r2; r++) {
            hexCoordinates.push(hex(q, r, -q - r));
        }
    }

    return hexCoordinates;
};

// Here we take all gridHexesCornersMap and reduce only the unique ones
export const generateUniqueCornerCoordinates = (gridHexesCornersMap) => {
    return gridHexesCornersMap.reduce((uniqueCorners, hexagonCorners) => {
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
};
