import React from 'react';
import { SVG } from '@svgdotjs/svg.js';






function HEXAGONTRY() {
    function Point(x, y) {
        return { x: x, y: y };
    }

    function Hex(q, r, s) {
        if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
        return { q: q, r: r, s: s };
    }

    function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
        return { f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle };
    }

    function Layout(orientation, size, origin) {
        return { orientation: orientation, size: size, origin: origin };
    }

    const layout_pointy = Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    const layout_flat = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

    function hex_to_pixel(layout, h) {
        var M = layout.orientation;
        var size = layout.size;
        var origin = layout.origin;
        var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return Point(x + origin.x, y + origin.y);
    }

    function pixel_to_hex(layout, p) {
        var M = layout.orientation;
        var size = layout.size;
        var origin = layout.origin;
        var pt = Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
        return Hex(q, r, -q - r);
    }

    function hex_corner_offset(layout, corner) {
        var M = layout.orientation;
        var size = layout.size;
        var angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
        return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }

    function polygon_corners(layout, h) {
        var corners = [];
        var center = hex_to_pixel(layout, h);
        for (var i = 0; i < 6; i++) {
            var offset = hex_corner_offset(layout, i);
            corners.push(Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }

    const SIZE = Point(10, 10);
    const ORIGIN = Point(5, 5);
    const HEX = Hex(0, 1, -1);

    const LAYOUT = Layout(layout_flat, SIZE, ORIGIN);

    const CORNERS = polygon_corners(LAYOUT, HEX);


    const draw = SVG().addTo('body').size('100%', '100%');
    // const HEX_SYMBOL = draw.symbol()
    //     .polygon(CORNERS.map(({ x, y }) => {
    //         console.log(x, y);
    //         return `${x},${y}`
    //     }))
    //     .fill(123)
    //     .stroke({ width: 1, color: '#999' })

    // console.log(HEX_SYMBOL);

    return draw.symbol()
        .polygon(CORNERS.map(({ x, y }) => {
            console.log(x, y);
            return `${x},${y}`
        }))
        .fill(123)
        .stroke({ width: 1, color: '#999' })
}

export default HEXAGONTRY;