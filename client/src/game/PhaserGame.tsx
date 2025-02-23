import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import { GameMapLayout } from "../interfaces";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
    gameMapLayout: GameMapLayout;
    setIsSceneReady:(isReady: boolean) => void;
}

const setGameMapLayout = (
    scene: Phaser.Scene,
    gameMapLayout: GameMapLayout
) => {
    if (
        "tiles" in scene &&
        "uniqueHexagonCornerCoordinates" in scene &&
        "gridHexesCornersMap" in scene
    ) {
        console.log(1, gameMapLayout.gridHexesCornersMap);
        scene.gridHexesCornersMap = gameMapLayout.gridHexesCornersMap;
        scene.tiles = gameMapLayout.tiles;
        scene.uniqueHexagonCornerCoordinates =
            gameMapLayout.uniqueHexagonCornerCoordinates;
    }
};

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
    function PhaserGame({ currentActiveScene, gameMapLayout, setIsSceneReady }, ref) {
        const game = useRef<Phaser.Game | null>(null!);
        // console.log({ game })
        useLayoutEffect(() => {
            // console.log('useLayoutEffect');
            if (game.current === null) {
                game.current = StartGame("game-container");

                if (typeof ref === "function") {
                    ref({ game: game.current, scene: null });
                } else if (ref) {
                    ref.current = { game: game.current, scene: null };
                }
            }

            return () => {
                if (game.current) {
                    game.current.destroy(true);
                    if (game.current !== null) {
                        game.current = null;
                    }
                }
            };
        }, [ref]);

        useEffect(() => {
            // console.log('useEffect');
            EventBus.on(
                "current-scene-ready",
                (scene_instance: Phaser.Scene) => {
                    console.log({ currentActiveScene, gameMapLayout });
                    if (
                        currentActiveScene &&
                        typeof currentActiveScene === "function"
                    ) {
                        currentActiveScene(scene_instance);
                    }

                    if (typeof ref === "function") {
                        ref({ game: game.current, scene: scene_instance });
                    } else if (ref) {
                        ref.current = {
                            game: game.current,
                            scene: scene_instance,
                        };
                    }

                    setIsSceneReady(true);
                }
            );

            EventBus.on(
                "game-map-initialization",
                (scene_instance: Phaser.Scene) => {
                  console.log({gameMapLayout})
                    setGameMapLayout(scene_instance, gameMapLayout);
                }
            );

            return () => {
                EventBus.removeListener("current-scene-ready");
                EventBus.removeListener("game-map-initialization");
            };
        }, [currentActiveScene, ref]);

        return <div id="game-container"></div>;
    }
);

