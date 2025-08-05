import { useGameContext } from "./Game/Game";
import { getUserId } from "../utils";
import { INITIAL_PLACEMENT } from "../enums";

function Settlement() {
  const {
    player,
    isPlayerTurn,
    availableSpots,
    turn,
    settlements,
  } = useGameContext();

  const shouldBuildInitialSettlement = () => {
    const playerSettlements = settlements.filter(s => s.player === getUserId());
    return isPlayerTurn &&
      (turn?.initialPlacement === INITIAL_PLACEMENT.FIRST && playerSettlements.length < 1) ||
      turn?.initialPlacement === INITIAL_PLACEMENT.SECOND && playerSettlements.length < 2;
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

