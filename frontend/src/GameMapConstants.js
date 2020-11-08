import { point, layout, flatLayout } from './hexagonMathFunctions';

// point args = widht, height
export const HEX_SIZE = point(40, 40);
export const ORIGIN_POSITION = point(500, 250);
export const SCREEN_LAYOUT = layout(flatLayout, HEX_SIZE, ORIGIN_POSITION);
export const RADIUS_SIZE = 2;
