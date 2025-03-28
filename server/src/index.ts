import express from "express";
// const http = require('http');
import http from "http";
// const socketIo = require("socket.io");
// const bodyParser = require("body-parser");
// const routes = require("./routes");
// import socketIo from "socket.io";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";
import { API_PORT } from "./constants";

const { mapTilesBackground } = require("./images");
const { shuffleArray } = require("./utils");
const mapTiles = mapTilesBackground;
shuffleArray(mapTiles);

const app = express();
// const server = new http.Server(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//   },
// });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

// // middleware
// io.use((socket, next) => {
//   // let token = socket.handshake.query.token;
//   console.log("??");

//   // if (isValid(token)) {
//   //   return next();
//   // }

//   //should validate token here.
//   // if (token) {
//   return next();
//   // }
//   // return next(new Error('authentication error'));
// });

// // then
// io.on("connection", (socket) => {
//   let token = socket.handshake.query.token;
//   console.log(1, token);

//   socket.emit("game on", mapTiles);
//   // io.emit('hey')
//   // ...
// });

app.listen(API_PORT, () => {
  console.log(`Api listening on port ${API_PORT}!!`);
});

// server.listen(Number(API_PORT) + 1, () => {
//   console.log(`SocketIo listening on port ${Number(API_PORT) + 1}!`);
//   // logger.info(`Socker listening on port ${API_PORT + 1}!`);
//   // logger.info(`Api and socker whitelisted for ${hosts}`);
// });

// io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
//     console.log('new client connected');
//     socket.emit('connection', null);
// });

//CUSTOM NAMESPACE BELOW
// const nsp = io.of('/my-namespace');

// nsp.on('connection', socket => {
//     console.log('someone connected');
// });

// nsp.emit('hi', 'everyone!');
//CUSTOM NAMESPACE ABOVE
