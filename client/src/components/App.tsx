import { io, Socket } from "socket.io-client";
import { useEffect, useState, createContext, useContext } from "react";
import { IAppContext } from "../interfaces/context";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Router from "./Router.tsx";

export const AppContext = createContext<IAppContext>({} as IAppContext);

function App() {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  //TODO set type
  const [rooms, setRooms] = useState<{ room: string, playersCount: number }[]>([]);

  useEffect(() => {
    const socketInstance = io("https://gameofcolonies.dev", {
      path: "/socket/",
      transports: ["websocket", "polling"],
    });
    socketInstance.on("connect", () => {
      console.log("connection success");
    });

    socketInstance.on("rooms-available", (arg) => {
      console.log(arg)
      console.log(`console.log: ${JSON.stringify(arg, null, 2)}`);
      setRooms(arg)
    });

    setSocket(socketInstance);
  }, []);

  return (
    <>
      {socket && <AppContext.Provider value={{ socket, rooms }}>
        <Router />
      </AppContext.Provider>}
    </>
  );
}

export default App;

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

