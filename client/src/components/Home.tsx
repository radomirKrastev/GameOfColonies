import { useNavigate } from "react-router";
import { useAppContext } from "./App";
import { createGame, joinGame } from "../services";

function Home() {
  const navigate = useNavigate();
  const { socket, games } = useAppContext();

  return (
    <>
      {games.map((game) => {
        return <div key={game.id}>
          {`room: ${game.name} players: ${game.playersCount}/${game.maxPlayers}`}
          <button
            onClick={async () => {
              const result = await joinGame(game.id);
              navigate(`/lobby/${result.id}`);
            }}
          >
            Join game
          </button>
        </div>
      })}
      <div>
        <button
          onClick={async () => {
            console.log(socket);

            //TODO add name input 
            const result = await createGame({ name: 'gameNameHardcodedAndNotUnique', maxPlayers: 4 });
            navigate(`/lobby/${result.id}`);
          }}
        >
          Create a game
        </button>
      </div>
    </>
  );
}

export default Home;

