import { Socket } from "socket.io";
import { io } from "../socket";

export const createGameAndEmit = (socket: Socket, room: string) => {
  console.log('try create-room', {room}, socket.rooms.size);
  if (socket.rooms.size < 2) {
    console.log('created room', {room}, socket.rooms.size);
    socket.join(room);
    socket.broadcast.emit('game:all-available');
  }
};

export const joinGameAndEmit = (socket: Socket, room: string) => {
  console.log('try join-room', {room}, socket.rooms.size);
  console.log({socket});

  if (socket.rooms.size < 2) {
    socket.join(room);
    console.log('joined room', { room }, socket.rooms.size);
    socket.to(room).emit('game:user-joined');
  }
};

export const emitGameStarted = (socket: Socket, room: string) => {
  console.log('start Game', {room});
  console.log(socket.rooms);
  //TODO add check if socket is in this room
  io.to(room).emit('game:started');  
};

// Possible for extracting in a separate file
export const emitDicesRolled = (socket: Socket, room: string) => {
  console.log('dices rolled', {room});
  //TODO add check if socket is in this room
  io.to(room).emit('dices:rolled');  
};

// Possible for extracting in a separate file
export const emitTurnFinished = (socket: Socket, room: string) => {
  console.log('turn finished', {room});
  //TODO add check if socket is in this room
  io.to(room).emit('turn:finished');  
};

// Possible for extracting in a separate file
export const emitNewConstruction = (socket: Socket, room: string) => {
  console.log('new construction', {room});
  //TODO add check if socket is in this room
  io.to(room).emit('construction:new');  
};