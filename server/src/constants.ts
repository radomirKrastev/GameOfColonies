import dotenv from "dotenv";
dotenv.config();

// const { DB_NAME, MONGO_PASSWORD, API_PORT } = process.env;

// exports.DB_URL = `mongodb+srv://radomir:${MONGO_PASSWORD}@cluster0.17orc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// exports.API_PORT = API_PORT;
export const API_PORT = 3000;
// export const BOARD_RADIUS_SIZE = 2;

// // point args = width, height
  // export const HEX_SIZE = point(80, 80);
  // // point args = width, height
  // export const ORIGIN_POSITION = point(512, 384);
  // export const SCREEN_LAYOUT = layout(pointyLayout, HEX_SIZE, ORIGIN_POSITION);

export const ORIGIN_POSITION_X = 512;
export const ORIGIN_POSITION_Y = 384;
export const HEX_SIZE = 80;
export const BOARD_RADIUS_SIZE = 2;

export const TILE_VALUES = [
  2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12,
];
