// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "./App";
import { useNavigate } from "react-router";

function Lobby({ isCreator }: { isCreator: boolean }) {
  const navigate = useNavigate();
  const { socket } = useAppContext();
  // const [playersCount, setPlayersCount] = useState(1);
  const params = useParams();

  useEffect(() => {
    socket.on("user-joined-room", (arg) => {
      console.log(arg)
      console.log(`console.log: ${JSON.stringify(arg, null, 2)}`);
      // setRooms(arg)
    });

    window.addEventListener('beforeunload', leaveRoom)
    return () => {
      window.removeEventListener('beforeunload', leaveRoom)
    }
  }, []);

  const leaveRoom = e => {
    // TO DO implement leave room logic (when room owner leaves, room is being deleted)
    console.log('leave-room');
    socket.emit('leave-room');
  }

  return (
    <div>
      <div>
        {`Room name: ${params.lobbyId}`}

      </div>
      {isCreator && <button
        onClick={async () => {
          console.log(socket);
          socket.emit("game-start", params.lobbyId, () => {
            navigate(`/game/${params.lobbyId}`);
          });
        }}
      ></button>}
    </div>
  );
}

export default Lobby;

