import nats, { Stan } from 'node-nats-streaming';


import { DefaultEventsMap, Server, Socket } from "socket.io";
import crypto from 'crypto';
import { GameCreatedListener } from "./events";




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
    if (socket.rooms.size < 2) {
      const room = crypto.randomBytes(16).toString("hex");
      console.log('join ' + room)
      socket.join(room);
      cb(room);
    }
  });

  socket.on("join-room", (room, cb) => {
    console.log('join-room')
    if (socket.rooms.size < 2) {
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









//TODO is it worth it to extract natsWrapper in common module if we will use it somewhere else (socket-server??)
class SocketWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting!');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    //clusterId same clusterId as in the nats-depl.yaml - assigned it of the cluster
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });

      this.client.on('error', (error) => {
        reject(error);
      })
    });
  }
}

export const natsWrapper = new SocketWrapper();