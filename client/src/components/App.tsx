import { io, Socket } from "socket.io-client";
import { useEffect, useState, createContext, useContext } from "react";
import { IAppContext } from "../interfaces/context";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Router from "./Router.tsx";
import { fetchGames } from "../services/game-map.service.ts";

export const AppContext = createContext<IAppContext>({} as IAppContext);

function App() {
  //TODO create player and playerId 
  const playerId = Date.now().toString();
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  //TODO set type
  const [games, setGames] = useState<{
    id: string;
    name: string;
    maxPlayers: number;
    playersCount: number;
  }[]>([]);
  
  useEffect(() => {
    console.log(1)
    const socketInstance = io("https://gameofcolonies.dev", {
      path: "/socket/",
      transports: ["websocket", "polling"],
    });
    socketInstance.on("connect", () => {
      console.log("connection success");
    });

    socketInstance.on("games-available", async (arg) => {
      console.log(arg)
      console.log(`console.log: ${JSON.stringify(arg, null, 2)}`);
      const games = await fetchGames();
      console.log({ games });
      setGames(games)
    });

    setSocket(socketInstance);
  }, []);

  return (
    <>
      {
        socket &&
        <AppContext.Provider value={{ socket, games, playerId }}>
          <Router />
        </AppContext.Provider>
      }
    </>
  );
}

export default App;

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

