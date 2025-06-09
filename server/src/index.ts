import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";
import { API_PORT } from "./constants";
import { natsWrapper } from "./nats-wrapper";
import { Server, Socket } from "socket.io";
import { conncetIo } from "./socket/socket";
import { createServer, Server as HttpServer } from "http";
import cookieParser from "cookie-parser";
import { usersService } from "./services";

const start = async () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(routes);
  
  conncetIo(httpServer);
  //TODO connect NATS when other microservices are available
  // conncetNATS();

  httpServer.listen(API_PORT, () => {
    console.log(`Api listening on port ${API_PORT}!!`);
  });
};

const conncetNATS = async () => {
  await natsWrapper.connect('gameofcolonies', '123', "http://nats-srv:4222");
  natsWrapper.client.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());
};

start();

