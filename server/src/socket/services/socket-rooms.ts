import { Server, Socket } from "socket.io";

// export const emitAvailableGames = (socket: Socket) => {
//   const allRooms: { room: string, playersCount: number }[] = [];

//   // io.sockets.adapter.rooms.forEach((value, key, map) => {
//   //   console.log('key: ', key, 'value: ', value.values().next().value)

//   //   if (key !== value.values().next().value) {
//   //     allRooms.push({ room: key, playersCount: value.size });
//   //   }
//   // });
//   // console.log('emit Available games', { allRooms })
//   socket.emit('game:all-available', allRooms);
// };


export const createRoom = (socket: Socket, room: string) => {
  if (socket.rooms.size < 2) {
    socket.join(room);
  }
};

// export const emitUserJoinedGame = (socket: Socket, ) => {
//   console.log('emit user joined game');
//   console.log({socket});
//   // const allRooms: { room: string, playersCount: number }[] = [];

//   // io.sockets.adapter.rooms.forEach((value, key, map) => {
//   //   console.log('key: ', key, 'value: ', value.values().next().value)

//   //   if (key !== value.values().next().value) {
//   //     allRooms.push({ room: key, playersCount: value.size });
//   //   }
//   // });
//   // console.log('emit Available games', { allRooms })
//   // socket.emit('game:all-available', allRooms);
// };