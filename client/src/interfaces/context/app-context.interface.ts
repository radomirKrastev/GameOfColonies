import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

export interface IAppContext {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    //TODO set type
    games: {
      id: string;
      name: string;
      maxPlayers: number;
      playersCount: number;
    }[];
    // playerId: string;
}

