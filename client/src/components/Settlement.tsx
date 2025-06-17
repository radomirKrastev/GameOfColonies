import { GameObjects } from "phaser";
import { useGameContext } from "./Game";
import { Point } from "../interfaces";
import { getStyleColor } from "../utils";

function Settlement() {
    const {
        possibleSettlementTargets,
        possibleCityTargets,
        possibleRoadTargets,
        gameMapLayout,
        phaserRef,
        player
    } = useGameContext();
    const scene = phaserRef.current!.scene!;
    const currentSettlements: {
        graphics: GameObjects.Graphics;
        corner: Point;
    }[] = [];

    let firstTimeChoosing = true;

    const buildCity = (hexagonCorner: Point) => {
        const graphics = new GameObjects.Graphics(scene);

        graphics.setDefaultStyles({
            lineStyle: { width: 2, color: getStyleColor(player?.color), alpha: 1 },
            fillStyle: { color: getStyleColor(player?.color), alpha: 1 },
        });
        graphics.setDepth(2);

        const rectangle = new Phaser.Geom.Rectangle(
            hexagonCorner.x - 15,
            hexagonCorner.y - 15,
            30,
            30
        );
        graphics.strokeRectShape(rectangle);
        graphics.fillRectShape(rectangle);

        graphics.closePath();
        graphics.fillPath();
        scene.add.existing(graphics);
    };

    const buildSettlement = (hexagonCorner: Point) => {
        const graphics = new GameObjects.Graphics(scene);

        graphics.setDefaultStyles({
            lineStyle: { width: 2, color: getStyleColor(player?.color), alpha: 1 },
            fillStyle: { color: getStyleColor(player?.color), alpha: 1 },
        });
        graphics.setDepth(2);

        const triangle = new Phaser.Geom.Triangle(
            hexagonCorner.x,
            hexagonCorner.y - 20,
            hexagonCorner.x - 20,
            hexagonCorner.y + 20,
            hexagonCorner.x + 20,
            hexagonCorner.y + 20
        );

        graphics.strokeTriangleShape(triangle);
        graphics.fillTriangleShape(triangle);

        graphics.closePath();
        graphics.fillPath();
        scene.add.existing(graphics);
        currentSettlements.push({ graphics, corner: hexagonCorner });
    };

    const chooseSettlement = () => {
        const uniqueHexagonCornerCoordinates =
            gameMapLayout!.uniqueHexagonCornerCoordinates;
        
        possibleCityTargets.forEach((x) => x.setVisible(false));
        possibleRoadTargets.forEach((x) => x.setVisible(false));

        if (firstTimeChoosing) {
            for (let i = 0; i < uniqueHexagonCornerCoordinates.length; i++) {
                const graphics = new GameObjects.Graphics(scene);

                graphics.setDefaultStyles({
                    lineStyle: { width: 2, color: 0xf000000, alpha: 1 },
                    fillStyle: { color: 0xffffff, alpha: 1 },
                });

                const circle = new Phaser.Geom.Circle(
                    uniqueHexagonCornerCoordinates[i].x,
                    uniqueHexagonCornerCoordinates[i].y,
                    20
                );
                graphics.strokeCircleShape(circle);
                graphics.fillCircleShape(circle);
                graphics.setInteractive(circle, (a, x, y) => {
                    if (
                        a.radius > 0 &&
                        x >= a.left &&
                        x <= a.right &&
                        y >= a.top &&
                        y <= a.bottom
                    ) {
                        return true;
                    }
                    return false;
                });

                graphics.closePath();
                graphics.fillPath();
                possibleSettlementTargets[i] = graphics;
                graphics.addListener("pointerdown", () => {
                    const removeIndexSettlement =
                        possibleSettlementTargets.indexOf(graphics);

                    if (removeIndexSettlement !== -1) {
                        possibleSettlementTargets[
                            removeIndexSettlement
                        ].setVisible(false);

                        possibleCityTargets.push(
                            possibleSettlementTargets[removeIndexSettlement]
                        );
                        possibleSettlementTargets.splice(
                            removeIndexSettlement,
                            1
                        );

                        possibleSettlementTargets.forEach((x) =>
                            x.setVisible(false)
                        );
                        buildSettlement(uniqueHexagonCornerCoordinates[i]);
                    } else {
                        const removeIndexCity =
                            possibleCityTargets.indexOf(graphics);

                        if (removeIndexCity) {
                            possibleCityTargets.forEach((cityTarget) => {
                                cityTarget.setVisible(false);
                            });

                            possibleCityTargets.splice(removeIndexCity, 1);

                            const settlementToRemove = currentSettlements.find(x => x.corner === uniqueHexagonCornerCoordinates[i]);

                            if (settlementToRemove) {
                                settlementToRemove.graphics.destroy(true);
                            }
                            
                            buildCity(uniqueHexagonCornerCoordinates[i]);
                        }
                    }
                });

                // Add graphics to the scene
                scene.add.existing(graphics);
                // scene.add.text(
                //     uniqueHexagonCornerCoordinates[i].x,
                //     uniqueHexagonCornerCoordinates[i].y,
                //     `${i}`,
                //     {
                //         fontFamily: "Arial Black",
                //         fontSize: 30,
                //         color: "#ffffff",
                //         stroke: "#000000",
                //         strokeThickness: 8,
                //         align: "center",
                //     }
                // );
                firstTimeChoosing = false;
            }
        } else {
            possibleSettlementTargets.forEach((x) => x.setVisible(true));
        }
    };

    return (
        <button className={`button ${player?.color}`} onClick={chooseSettlement}>
            Choose Settlement
        </button>
    );
}

export default Settlement;

