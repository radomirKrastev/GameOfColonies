import { useGameContext } from "./Game/Game";
import { getUserId } from "../utils";

function Settlement() {
  const {
    player,
    isPlayerTurn,
    availableSpots,
    turn,
    settlements,
    roads
  } = useGameContext();

  const shouldBuildInitialSettlement = () => {
    const playerSettlements = settlements.filter(s => s.player === getUserId());
    const playerRoads = roads.filter(r => r.player === getUserId());
    return isPlayerTurn && turn?.initialPlacement && playerSettlements.length === playerRoads.length;
  };

  const chooseSettlement = () => {
    const availableSettlements = availableSpots?.settlements || [];
    availableSettlements.forEach((x) => x.graphics?.setVisible(true));
  };

  return (
    <button
      disabled={!isPlayerTurn}
      className={`button ${player?.color} ${isPlayerTurn && shouldBuildInitialSettlement() ? "active" : ""}`}
      onClick={chooseSettlement}>
      Choose Settlement
    </button>
  );
}

export default Settlement;

