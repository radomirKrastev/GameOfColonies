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
            console.log(socket);
            // socket.emit("join-room", game.name, (roomName?: string) => {
            //   console.log({ roomName })
            //   if (roomName) {
            //     navigate(`/lobby/${roomName}`);
                
            //   } else {
            //     console.log('something went wrong!');
            //   }
            // });

            const result = await joinGame(game.id);
            navigate(`/lobby/${result.id}`);
            console.log({ result });
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
            console.log({ result });
            navigate(`/lobby/${result.id}`);

            // socket.emit("create-room", (roomName?: string) => {
            //   console.log({ roomName })
            //   if (roomName) {
            //     navigate(`/lobby/${roomName}`);
            //   } else {
            //     console.log('something went wrong!');
            //   }
            // });
          }}
        >
          Create a game
        </button>
      </div>
    </>
  );
}

export default Home;

