import { useGameContext } from "./Game/Game";
import { getUserId } from "../utils";
import { INITIAL_PLACEMENT } from "../enums";

function Road() {
  const {
    player,
    isPlayerTurn,
    roads,
    settlements,
    turn,
    availableSpots,
  } = useGameContext();

  const chooseRoad = () => {
    const availableRoads = availableSpots?.roads || [];
    availableRoads.forEach((road) => {
      road.graphics?.setVisible(true);
    });
  };

  const shouldBuildInitialRoad = () => {
    const playerSettlements = settlements.filter(s => s.player === getUserId());
    const playerRoads = roads.filter(r => r.player === getUserId());
    return isPlayerTurn && playerRoads.length < playerSettlements.length;
  };

  return (
    <button
      disabled={!isPlayerTurn}
      className={`button ${player?.color} ${isPlayerTurn && shouldBuildInitialRoad() ? "active" : ""}`}
      onClick={chooseRoad}
    >
      Choose Road
    </button>
  );
}

export default Road;


