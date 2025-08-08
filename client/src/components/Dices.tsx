import OneDotDice from "../../public/assets/dice-1.svg";
import TwoDotsDice from "../../public/assets/dice-2.svg";
import ThreeDotsDice from "../../public/assets/dice-3.svg";
import FourDotsDice from "../../public/assets/dice-4.svg";
import FiveDotsDice from "../../public/assets/dice-5.svg";
import SixDotsDice from "../../public/assets/dice-6.svg";
import { rollDices, fetchDices } from "../services/game-map.service.ts";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppContext } from "./App.tsx";
import { useGameContext } from "./Game/Game.tsx";
import { INITIAL_PLACEMENT } from "../enums/initial-placement.enum.ts";

function Dices() {
  const params = useParams();
  const [dices, setDices] = useState<{ diceOne: number, diceTwo: number }>({ diceOne: 4, diceTwo: 4 });
  const { isPlayerTurn, turn } = useGameContext();
  const { socket } = useAppContext();

  useEffect(() => {
    socket.on("dices:rolled", () => {
      fetchDicesHandler();
    });
  }, [socket]);

  const diceMap: { [key: number]: string } = {
    1: OneDotDice,
    2: TwoDotsDice,
    3: ThreeDotsDice,
    4: FourDotsDice,
    5: FiveDotsDice,
    6: SixDotsDice,
  }

  const rollDicesHandler = async () => {
    const dicesRolled = await rollDices(params.gameId!);
    console.log({ dicesRolled });
  }

  const fetchDicesHandler = async () => {
    const dicesRolled = await fetchDices(params.gameId!);
    setDices(dicesRolled);
  }

  return (
    <button 
      onClick={rollDicesHandler}
      className={`dices-button ${isPlayerTurn && !turn?.initialPlacement && !turn?.isRolled ? "active" : ""}`}
    >
      <div>
        <img src={diceMap[dices.diceOne]} width={60} height={60} />
        <img src={diceMap[dices.diceTwo]} width={60} height={60} />
      </div>
    </button>
  );
}

export default Dices;

