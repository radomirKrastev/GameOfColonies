import { useRef, useEffect, useState, createContext, useContext } from "react";
import { useParams } from "react-router";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { GameObjects } from "phaser";
import { endTurn, fetchGameMapLayout, fetchPlayer, fetchTurn } from "../services";
import { GameMapLayout, IPlayer, IRoad, ITurn } from "../interfaces";
import { IGameContext } from "../interfaces/context";
import Settlement from "./Settlement";
import Road from "./Road";
import City from "./City";
import Dices from "./Dices";
import { getUserId } from "../utils";
import { useAppContext } from "./App";

export const GameContext = createContext<IGameContext>({} as IGameContext);

function Game() {
  const { socket } = useAppContext();
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [gameMapLayout, setGameMapLayout] = useState<GameMapLayout | null>(
    null
  );
  const [player, setPlayer] = useState<IPlayer | null>(
    null
  );
  const [turn, setTurn] = useState<ITurn | null>(
    null
  );
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const possibleSettlementTargets: GameObjects.Graphics[] = new Array(56);
  const possibleCityTargets: GameObjects.Graphics[] = new Array(4);
  const possibleRoadTargets: GameObjects.Graphics[] = new Array(56);
  const roadsBuild: IRoad[] = new Array(60);
  const params = useParams();

  useEffect(() => {
    fetchGameMapLayoutHandler();
    fetchPlayerHandler();
    fetchTurnHandler();
  }, []);

  useEffect(() => {
    socket.on("dices:rolled", () => {
      fetchTurnHandler();
    });

    socket.on("turn:finished", () => {
      fetchTurnHandler();
    });
  }, [socket]);

  const fetchGameMapLayoutHandler = async () => {
    const mapLayout = await fetchGameMapLayout(params.gameId!);

    setGameMapLayout(mapLayout);
  };

  const fetchPlayerHandler = async () => {
    const playerData = await fetchPlayer(params.gameId!, getUserId());

    setPlayer(playerData);
  };

  const fetchTurnHandler = async () => {
    const turnData = await fetchTurn(params.gameId!);

    setTurn(turnData);
  };

  const endTurnHandler = async () => {
    console.log("Ending turn for game", params.gameId);
    const turnData = await endTurn(params.gameId!);
    console.log("Turn ended", turnData);
    setTurn(turnData);
  };

  const getIsPlayerTurn = (): boolean => {
    if (!turn || !player) {
      return false;
    }

    return turn.playerId === player.userId;
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
                isPlayerTurn: getIsPlayerTurn(),
                gameMapLayout,
                possibleSettlementTargets,
                possibleCityTargets,
                possibleRoadTargets,
                roadsBuild,
                phaserRef,
                player,
                turn
              }}
            >
              <div className="action-buttons-container" style={{ backgroundColor: "#FFFF00" }}>
                <Settlement />

                <Road />

                <City />

                <Dices />

                {getIsPlayerTurn() && (
                  <button className={`button ${player?.color}`} onClick={endTurnHandler}>
                    End Turn
                  </button>
                )}
              </div>
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

