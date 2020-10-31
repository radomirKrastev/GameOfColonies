import React from 'react';
import './App.css';
// import { Graphics, graphicsUtils } from 'pixi.js';
import { Stage, Graphics } from '@inlet/react-pixi';

function Point(x, y) {
    return {x: x, y: y};
}

function Hex(q, r, s) {
    if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
    return {q: q, r: r, s: s};
}

function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
    return {f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle};
}

function Layout(orientation, size, origin) {
    return {orientation: orientation, size: size, origin: origin};
}

const layout_pointy = Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
const layout_flat = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

function hex_to_pixel(layout, h)
{
    var M = layout.orientation;
    var size = layout.size;
    var origin = layout.origin;
    var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
    var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
    return Point(x + origin.x, y + origin.y);
}

function pixel_to_hex(layout, p)
{
    var M = layout.orientation;
    var size = layout.size;
    var origin = layout.origin;
    var pt = Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
    var q = M.b0 * pt.x + M.b1 * pt.y;
    var r = M.b2 * pt.x + M.b3 * pt.y;
    return Hex(q, r, -q - r);
}

function hex_corner_offset(layout, corner)
{
    var M = layout.orientation;
    var size = layout.size;
    var angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
    return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
}

function polygon_corners(layout, h)
{
    var corners = [];
    var center = hex_to_pixel(layout, h);
    for (var i = 0; i < 6; i++)
    {
        var offset = hex_corner_offset(layout, i);
        corners.push(Point(center.x + offset.x, center.y + offset.y));
    }
    return corners;
}

const SIZE = Point(10, 10);
const ORIGIN = Point(30, 30);
const HEX = Hex(0, 1, -1);

const LAYOUT = Layout(layout_flat, SIZE, ORIGIN);

const CORNERS = polygon_corners(LAYOUT, HEX);



let map_radius = 2;
let map= [];

for (let q = -map_radius; q <= map_radius; q++) {
    let r1 = Math.max(-map_radius, -q - map_radius);
    let r2 = Math.min(map_radius, -q + map_radius);
    for (let r = r1; r <= r2; r++) {
        map.push(Hex(q, r, -q-r));
    }
}

console.log(map);


const Hexagon = () => (
  <Stage width={500} height={500} options={{ antialias: true, backgroundColor: 0xeef1f5 }}>
    <Graphics
      draw={g => {
        g.lineStyle(2, 0xffd900)
        g.beginFill(0xff3300)
        
        console.log(CORNERS)

        g.moveTo(CORNERS[0].x, CORNERS[0].y);
        for (let i=1; i < 6; i++) {
            g.lineTo(CORNERS[i].x, CORNERS[i].y)
        } 

        g.endFill();


        


        // g.beginFill(0xff3300)
        // g.lineStyle(4, 0xffd900, 1)

        // g.moveTo(50, 50)
        // g.lineTo(250, 50)
        // g.lineTo(100, 100)
        // g.lineTo(50, 50)
        // g.endFill()

        // g.lineStyle(2, 0x0000ff, 1)
        // g.beginFill(0xff700b, 1)
        // g.drawRect(50, 250, 120, 120)

        // g.lineStyle(2, 0xff00ff, 1)
        // g.beginFill(0xff00bb, 0.25)
        // g.drawRoundedRect(250, 200, 200, 200, 15)
        // g.endFill()

        // g.lineStyle(0)
        // g.beginFill(0xffff0b, 0.5)
        // g.drawCircle(400, 90, 60)
        // g.endFill()        
      }}
    />
  </Stage>
)

// var polygon = draw.polygon(
    //     '20 27.32050807568877,15 18.660254037844386,5.000000000000002 18.660254037844382,0 27.32050807568877,4.999999999999996 35.98076211353316,15 35.98076211353316')
    //     polygon.fill('#f06').stroke({ width: 1, color: '#999' }).move(50, 50);

export default Hexagon;

// g.beginFill(0xff3300)
//         // g.lineStyle(2, 0xffd900)
        
//         console.log(CORNERS)

//         g.moveTo(CORNERS[0].x, CORNERS[0].y);
//         for (let i=1; i < 6; i++) {
//             g.lineTo(CORNERS[i].x, CORNERS[i].y)
//         } 

//         g.endFill();

