import { GameObjects } from "phaser";
import { useAppContext } from "./App";
import { Point } from "../interfaces";

function Settlement() {
    const {
        possibleSettlementTargets,
        possibleCityTargets,
        gameMapLayout,
        phaserRef,
    } = useAppContext();
    const scene = phaserRef.current!.scene!;

    let firstTimeChoosing = true;

    const buildCity = (hexagonCorner: Point) => {
        const graphics = new GameObjects.Graphics(scene);

        graphics.setDefaultStyles({
            lineStyle: { width: 2, color: 0xffc0cb, alpha: 1 },
            fillStyle: { color: 0xffc0cb, alpha: 1 },
        });

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
            lineStyle: { width: 2, color: 0xffc0cb, alpha: 1 },
            fillStyle: { color: 0xffc0cb, alpha: 1 },
        });

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
    };

    const chooseSettlement = () => {
        const uniqueHexagonCornerCoordinates =
            gameMapLayout!.uniqueHexagonCornerCoordinates;

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
                    // console.log({a, b, c, d})
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
                graphics.addListener("pointerdown", (e) => {
                    const removeIndexSettlement =
                        possibleSettlementTargets.indexOf(graphics);

                    if (removeIndexSettlement !== -1) {
                        console.log(
                            {
                                possibleSettlementTargets,
                                removeIndex: removeIndexSettlement,
                            },
                            possibleSettlementTargets[removeIndexSettlement],
                            removeIndexSettlement
                        );
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
                            possibleCityTargets[removeIndexCity].setVisible(
                                false
                            );
                            console.log(
                                "city",
                                possibleCityTargets[removeIndexCity]
                            );
                            buildCity(uniqueHexagonCornerCoordinates[i]);
                        }
                    }
                });

                // Add graphics to the scene
                scene.add.existing(graphics);
                scene.add.text(
                    uniqueHexagonCornerCoordinates[i].x,
                    uniqueHexagonCornerCoordinates[i].y,
                    `${i}`,
                    {
                        fontFamily: "Arial Black",
                        fontSize: 30,
                        color: "#ffffff",
                        stroke: "#000000",
                        strokeThickness: 8,
                        align: "center",
                    }
                );
                firstTimeChoosing = false;
            }
        } else {
            possibleSettlementTargets.forEach((x) => x.setVisible(true));
        }
    };

    return (
        <button className="button" onClick={chooseSettlement}>
            Choose Settlement
        </button>
    );
}

export default Settlement;

