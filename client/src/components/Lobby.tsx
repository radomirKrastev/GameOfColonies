import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppContext } from "./App";
import { useNavigate } from "react-router";
import { fetchGame, startGame } from "../services";
import { getUserId } from "../utils";

function Lobby() {
  const navigate = useNavigate();
  const { socket } = useAppContext();
  const [game, setGames] = useState<{
    id: string;
    name: string;
    maxPlayers: number;
    playersCount: number;
    creator: string;
  } | null>();
  const params = useParams();

  useEffect(() => {
    fetchGameHandler();

    socket.on("game:user-joined", (arg) => {
      console.log(arg)
      console.log(`console.log: ${JSON.stringify(arg, null, 2)}`);
      fetchGameHandler();
    });

    socket.on("game:started", (arg) => {
      console.log(arg)
      console.log('game started');
      navigate(`/game/${params.lobbyId}`);
    });

    window.addEventListener('beforeunload', leaveRoom)
    return () => {
      window.removeEventListener('beforeunload', leaveRoom)
    }
  }, [socket]);


  const fetchGameHandler = async () => {
    const currentGame = await fetchGame(params.lobbyId!);
    console.log({ game: currentGame });
    setGames(currentGame);
  }

  const startGameHandler = async () => {
    const currentGame = await startGame(params.lobbyId!);
    console.log({ currentGame });
  }

  const leaveRoom = e => {
    // TO DO implement leave room logic (when room owner leaves, room is being deleted)
    console.log('leave-room');
    socket.emit('leave-room');
  }

  return (
    <div>
      <div>
        {game ? `Room name: ${game.name}` : 'no name'}
        {game ? `${game.playersCount}/${game.maxPlayers}` : '0/4'}
      </div>
      {
        getUserId() === game?.creator &&
        <button
          onClick={async () => await startGameHandler()}
        >Start Game!
        </button>
      }
    </div>
  );
}

export default Lobby;

