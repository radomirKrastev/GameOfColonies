import { useRef, useEffect, useState, createContext, useContext } from "react";
import { useParams } from "react-router";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { GameObjects } from "phaser";
import { fetchGameMapLayout } from "../services";
import { GameMapLayout, IRoad } from "../interfaces";
import { IGameContext } from "../interfaces/context";
import Settlement from "./Settlement";
import Road from "./Road";
import City from "./City";

export const GameContext = createContext<IGameContext>({} as IGameContext);

function Game() {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [gameMapLayout, setGameMapLayout] = useState<GameMapLayout | null>(
    null
  );
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const possibleSettlementTargets: GameObjects.Graphics[] = new Array(56);
  const possibleCityTargets: GameObjects.Graphics[] = new Array(4);
  const possibleRoadTargets: GameObjects.Graphics[] = new Array(56);
  const roadsBuild: IRoad[] = new Array(60);
  const params = useParams();

  useEffect(() => {
    getGameMapLayout();
  }, []);

  const getGameMapLayout = async () => {
    const response = await fetchGameMapLayout(params.gameId!);

    setGameMapLayout(response);
  };

  return (
    <div id="app">
      {gameMapLayout && (
        <>
          <PhaserGame
            gameMapLayout={gameMapLayout}
            ref={phaserRef}
            setIsSceneReady={setIsSceneReady}
          />
          {isSceneReady && (
            <GameContext.Provider
              value={{
                gameMapLayout,
                possibleSettlementTargets,
                possibleCityTargets,
                possibleRoadTargets,
                roadsBuild,
                phaserRef,
              }}
            >
              <Settlement />

              <Road />

              <City />
            </GameContext.Provider>
          )}
        </>
      )}
    </div>
  );
}

export default Game;

export const useGameContext = () => {
  const context = useContext(GameContext);

  return context;
};

