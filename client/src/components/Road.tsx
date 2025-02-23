import { GameObjects } from "phaser";
import { useAppContext } from "./App";
import { Point } from "../interfaces";

function Road() {
    const { possibleRoadTargets, gameMapLayout, phaserRef } = useAppContext();
    const scene = phaserRef.current!.scene!;

    const chooseRoad = () => {
        const roadPositions = gameMapLayout!.roadPositions;

        for (let i = 0; i < roadPositions.length; i++) {
            const graphics = new GameObjects.Graphics(scene);

            graphics.setDefaultStyles({
                lineStyle: { width: 2, color: 0xf000000, alpha: 1 },
                fillStyle: { color: 0xffffff, alpha: 1 },
            });

            const circle = new Phaser.Geom.Circle(
                (roadPositions[i].a.x + roadPositions[i].b.x) / 2,
                (roadPositions[i].a.y + roadPositions[i].b.y) / 2,
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
            possibleRoadTargets[i] = graphics;
            graphics.addListener("pointerdown", (e) => {
                const removeIndexRoad = possibleRoadTargets.indexOf(graphics);

                if (removeIndexRoad !== -1) {
                    possibleRoadTargets[removeIndexRoad].setVisible(false);

                    possibleRoadTargets.splice(removeIndexRoad, 1);

                    possibleRoadTargets.forEach((x) => x.setVisible(false));
                    buildRoad(roadPositions[i]);
                }
            });

            scene.add.existing(graphics);
        }
    };

    const buildRoad = (roadPosition: { a: Point; b: Point }) => {
        const graphics = new GameObjects.Graphics(scene);

        graphics.setDefaultStyles({
            lineStyle: { width: 5, color: 0xff0000, alpha: 1 },
            fillStyle: { color: 0xffc0cb, alpha: 1 },
        });

        const line = new Phaser.Geom.Line(
            roadPosition.a.x,
            roadPosition.a.y,
            roadPosition.b.x,
            roadPosition.b.y
        );

        graphics.strokeLineShape(line);

        graphics.closePath();
        scene.add.existing(graphics);
    };

    return (
        <button className="button" onClick={chooseRoad}>
            Choose Road
        </button>
    );
}

export default Road;

