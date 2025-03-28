import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

export interface IAppContext {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    //TODO set type
    rooms: { room: string, playersCount: number }[];
}

