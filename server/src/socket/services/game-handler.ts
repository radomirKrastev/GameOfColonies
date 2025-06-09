// import { Server, Socket } from "socket.io";
// import crypto from 'crypto';
// import { emitAvailableGames } from './game-emitters'

// export const registerGameHandlers = (io: Server, socket: Socket) => {
//   const joinGame = (room: string, callback: (room: string) => void) => {
//     console.log('join-room')
//     if (socket.rooms.size < 2) {
//       socket.join(room);
//       emitAvailableGames(socket);
//       socket.to(room).emit('user-joined-room', 'new user joined room');
//       callback(room);
//     }
//   }

//   const createGame = (callback: (room: string) => void) => {
//     console.log(socket.rooms);
//     if (socket.rooms.size < 2) {
//       const room = crypto.randomBytes(16).toString("hex");
//       console.log('join ' + room)
//       socket.join(room);
//       callback(room);
//     }
//   }

//   socket.on("game:create", createGame);
//   socket.on("game:join", joinGame);
// }