import { useRef, useEffect, useState, createContext, useContext } from "react";
import { useParams } from "react-router";
import { IRefPhaserGame, PhaserGame } from "../../game/PhaserGame";
import { endTurn, fetchGameMapLayout, fetchPlayer, fetchTurn, fetchAvailableSpots, fetchConstructions, buildSettlement, buildRoad, buildCity } from "../../services";
import { GameMapLayout, IPlayer, ITurn } from "../../interfaces";
import { IGameContext } from "../../interfaces/context";
import Settlement from "../Settlement";
import Road from "../Road";
import City from "../City";
import Dices from "../Dices";
import { getStyleColor, getUserId } from "../../utils";
import { useAppContext } from "../App";
import { IGameAvailableSpots } from "../../interfaces/game-available-spots.interface";
import { IGameConstruction, IGameConstructions, IGameRoadConstruction } from "../../interfaces/game-constructions.interface";
import { drawCircle, drawLine, drawRectangle, drawTriangle } from "./utils";
import { PointOrPair } from "../../types";

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
  const [availableSpots, setAvailableSpots] = useState<IGameAvailableSpots | null>(
    null
  );
  const [constructions, setConstructions] = useState<IGameConstructions | null>(
    null
  );
  const [settlements, setSettlements] = useState<(IGameConstruction)[]>([]);
  const [cities, setCities] = useState<(IGameConstruction)[]>([]);
  const [roads, setRoads] = useState<(IGameRoadConstruction)[]>([]);
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    fetchGameMapLayoutHandler();
  }, []);

  useEffect(() => {
    if (isSceneReady) {
      fetchPlayerHandler();
      fetchTurnHandler();
      fetchAvailableSpotsHandler();
      fetchConstructionsHandler();
    }
  }, [isSceneReady]);

  useEffect(() => {
    socket.on("dices:rolled", () => {
      fetchTurnHandler();
    });

    socket.on("turn:finished", () => {
      fetchTurnHandler();
    });

    socket.on("construction:new", () => {
      fetchAvailableSpotsHandler();
      fetchConstructionsHandler();
    });
  }, [socket]);

  const fetchGameMapLayoutHandler = async () => {
    const mapLayout = await fetchGameMapLayout(params.gameId!);

    setGameMapLayout(mapLayout);
  };

  const buildSettlementHandler = (availableSpots: IGameAvailableSpots, coordinates: PointOrPair) => {
    if ("x" in coordinates && "y" in coordinates) {
      buildSettlement(params.gameId!, { coordinates });

      const availableSettlements = availableSpots?.settlements || [];
      availableSettlements.forEach((x) =>
        x.graphics?.setVisible(false)
      );
    }
  }

  const buildRoadHandler = (availableSpots: IGameAvailableSpots, coordinates: PointOrPair) => {
    if ("a" in coordinates && "b" in coordinates) {
      buildRoad(params.gameId!, { coordinates });

      const availableRoads = availableSpots?.roads || [];
      availableRoads.forEach((x) =>
        x.graphics?.setVisible(false)
      );
    }
  }

  const buildCityHandler = (availableSpots: IGameAvailableSpots, coordinates: PointOrPair) => {
    if ("x" in coordinates && "y" in coordinates) {
      buildCity(params.gameId!, { coordinates });

      const availableCities = availableSpots?.cities || [];
      availableCities.forEach((x) =>
        x.graphics?.setVisible(false)
      );
    }
  }

  const fetchAvailableSpotsHandler = async () => {
    const scene = phaserRef.current!.scene!;
    const availableSpots = await fetchAvailableSpots(params.gameId!);

    const availableSettlements = availableSpots?.settlements || [];
    const availableCities = availableSpots?.cities || [];
    const availableRoads = availableSpots?.roads || [];

    for (let i = 0; i < availableSettlements.length; i++) {
      const circleCoordinates = { x: availableSettlements[i].coordinates.x, y: availableSettlements[i].coordinates.y };
      drawCircle(availableSettlements[i], scene, circleCoordinates, buildSettlementHandler.bind(null, availableSpots));
    }

    for (let i = 0; i < availableCities.length; i++) {
      const circleCoordinates = { x: availableCities[i].coordinates.x, y: availableCities[i].coordinates.y };
      drawCircle(availableCities[i], scene, circleCoordinates, buildCityHandler.bind(null, availableSpots));
    }

    for (let i = 0; i < availableRoads.length; i++) {
      const circleCoordinates = {
        x: (availableRoads[i].coordinates.a.x + availableRoads[i].coordinates.b.x) / 2,
        y: (availableRoads[i].coordinates.a.y + availableRoads[i].coordinates.b.y) / 2
      };
      drawCircle(availableRoads[i], scene, circleCoordinates, buildRoadHandler.bind(null, availableSpots));
    }

    setAvailableSpots(availableSpots);
  };

  const fetchConstructionsHandler = async () => {
    const scene = phaserRef.current!.scene!;
    const gameConstructions = await fetchConstructions(params.gameId!);
    console.log("Game constructions fetched:", gameConstructions);
    setConstructions(gameConstructions);

    const settlementsData = gameConstructions?.settlements || [];
    const roadsData = gameConstructions?.roads || [];
    const citiesData = gameConstructions?.cities || [];

    settlementsData.forEach((settlement) => {
      console.log("Settlement coordinates:", settlement.coordinates);

      setSettlements((prev = []) => {
        const exists = prev.some(
          s =>
            s.player === settlement.player &&
            s.coordinates.x === settlement.coordinates.x &&
            s.coordinates.y === settlement.coordinates.y
        );
        console.log("Settlement exists:", exists, settlement);
        if (exists) return prev;
        console.log("Adding settlement:", settlement);
        return [...prev, { ...settlement, graphics: drawTriangle(scene, settlement.coordinates, getStyleColor(settlement.color)) }];
      });
    });

    roadsData.forEach((road) => {
      console.log("Road coordinates:", road.coordinates);

      setRoads((prev = []) => {
        const exists = prev.some(
          r =>
            r.player === road.player &&
            r.coordinates.a.x === road.coordinates.a.x &&
            r.coordinates.a.y === road.coordinates.a.y &&
            r.coordinates.b.x === road.coordinates.b.x &&
            r.coordinates.b.y === road.coordinates.b.y
        );
        console.log("Road exists:", exists, road);
        if (exists) return prev;
        console.log("Adding road:", road);
        return [...prev, { ...road, graphics: drawLine(scene, road.coordinates, getStyleColor(road.color)) }];
      });
    });

    citiesData.forEach((city) => {
      console.log("City coordinates:", city.coordinates);

      setCities((prev = []) => {
        const exists = prev.some(
          c =>
            c.player === city.player &&
            c.coordinates.x === city.coordinates.x &&
            c.coordinates.y === city.coordinates.y
        );
        console.log("City exists:", exists, city);
        if (exists) return prev;
        console.log("Adding city:", city);
        return [...prev, { ...city, graphics: drawRectangle(scene, city.coordinates, getStyleColor(city.color)) }];
      });
    });

    console.log("Constructions fetched:", gameConstructions);
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
                roads,
                settlements,
                cities,
                availableSpots,
                constructions,
                isPlayerTurn: getIsPlayerTurn(),
                gameMapLayout,
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

