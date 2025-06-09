import { DefaultEventsMap, Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { usersService } from "../services";

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

const conncetIo = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    path: '/api/socket/',
    cors: {
      origin: ["http://localhost:3000", "https://gameofcolonies.com/"],
    },
  });

  const onConnection = (socket: Socket) => {
    const userId = socket.handshake.headers.cookie?.split('userId=')[1];
    console.log(1, { userId });
    usersService.addUserSocket(userId!, socket);
  }
  
  io.on("connection", onConnection);
};

export {
  conncetIo,
  io
}