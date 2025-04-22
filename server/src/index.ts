import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";
import { API_PORT } from "./constants";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(routes);

  console.log(1)
  await natsWrapper.connect('gameofcolonies', '123', "http://nats-srv:4222");
  console.log(2)
  natsWrapper.client.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
  console.log(3)
  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());
  console.log(4)
  app.listen(API_PORT, () => {
    console.log(`Api listening on port ${API_PORT}!!`);
  });
};

start();

