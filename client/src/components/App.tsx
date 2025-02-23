import { useRef, useEffect, useState, createContext, useContext } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { GameObjects } from "phaser";
import { fetchGameMapLayout } from "../services";
import { GameMapLayout, IRoad } from "../interfaces";
import { IAppContext } from "../interfaces/context";
import Settlement from "./Settlement";
import Road from "./Road";
import City from "./City";

export const AppContext = createContext<IAppContext>({} as IAppContext);

function App() {
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

    useEffect(() => {
        getGameMapLayout();
    }, []);

    const getGameMapLayout = async () => {
        const response = await fetchGameMapLayout();

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
                        <AppContext.Provider
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
                        </AppContext.Provider>
                    )}
                </>
            )}
        </div>
    );
}

export default App;

export const useAppContext = () => {
    const context = useContext(AppContext);

    return context;
};

