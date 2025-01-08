import { point, layout, pointyLayout } from './hexagonMathFunctions.ts';

// point args = width, height
export const HEX_SIZE = point(80, 80);
export const ORIGIN_POSITION = point(512, 384);
export const SCREEN_LAYOUT = layout(pointyLayout, HEX_SIZE, ORIGIN_POSITION);
export const BOARD_RADIUS_SIZE = 2;
