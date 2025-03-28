import { DefaultEventsMap, Server, Socket } from "socket.io";
import crypto from 'crypto';

const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://gameofcolonies.dev/"],
  },
});

console.log('??')

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log('All rooms: ', io.sockets.adapter.rooms);
  socket.on("create-room", (cb) => {
    console.log(socket.rooms);
    if(socket.rooms.size < 2) {
      const room = crypto.randomBytes(16).toString("hex");
      console.log('join ' + room)
      socket.join(room);
      cb(room);
    }
  });

  socket.on("join-room", (room, cb) => {
    console.log('join-room')
    if(socket.rooms.size < 2) {
      socket.join(room);
      emitAvailableRooms(socket);
      socket.to(room).emit('user-joined-room', 'new user joined room');
      cb(room);
    }
  });
  console.log(io.sockets.adapter.rooms)
  console.log(io.sockets.adapter.rooms)
  const entries = io.sockets.adapter.rooms.entries();
  //TODO set type
  emitAvailableRooms(socket);
});


io.listen(3000, { path: '/socket' });

const emitAvailableRooms = (socket: Socket) => {
  const allRooms: { room: string, playersCount: number }[] = [];

  io.sockets.adapter.rooms.forEach((value, key, map) => {
    console.log('key: ', key, 'value: ', value.values().next().value)

    if(key !== value.values().next().value) {
      allRooms.push({room: key, playersCount: value.size });
    }
  });

  socket.emit('rooms-available', allRooms);
}
