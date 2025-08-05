import { useGameContext } from "./Game/Game";

function City() {
  const { player, isPlayerTurn, availableSpots } = useGameContext();

  const chooseCity = () => {
    const availableCities = availableSpots?.cities || [];
    availableCities.forEach((x) => x.graphics?.setVisible(true));
  };

  return (
    <button disabled={!isPlayerTurn} className={`button ${player?.color}`} onClick={chooseCity}>
      Choose City
    </button>
  );
}

export default City;

