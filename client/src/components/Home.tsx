import { useNavigate } from "react-router";
import { useAppContext } from "./App";

function Home() {
  const navigate = useNavigate();
  const { socket, rooms } = useAppContext();

  return (
    <>
    {rooms.map((r) => {
      return <div>
        {`room: ${r.room} players: ${r.playersCount}/4`}
        <button
          onClick={() => {
            console.log(socket);
            socket.emit("join-room", r.room, (roomName?: string) => {
              console.log({ roomName })
              if (roomName) {
                navigate(`/lobby/${roomName}`);
              } else {
                console.log('something went wrong!');
              }
            });
          }}
        >
          Join game
        </button>
      </div>
    })}
      <div>
        <button
          onClick={() => {
            console.log(socket);
            socket.emit("create-room", (roomName?: string) => {
              console.log({ roomName })
              if (roomName) {
                navigate(`/lobby/${roomName}`);
              } else {
                console.log('something went wrong!');
              }
            });
          }}
        >
          Create a game
        </button>
      </div>
    </>
  );
}

export default Home;

