import { BrowserRouter, Routes, Route } from "react-router";
import Game from "../components/Game.tsx";
import Home from "../components/Home.tsx";
import Lobby from "../components/Lobby.tsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="lobby">
          <Route path=":lobbyId" element={<Lobby />} />
        </Route>

        <Route path="game">
          <Route path=":gameId" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;