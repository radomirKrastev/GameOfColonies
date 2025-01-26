import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { GameObjects } from "phaser";
// import { generateHexagonalGrid, polygonCorners, hex, generateUniqueCornerCoordinates } from './hexagonMathFunctions.ts';
// import { BOARD_RADIUS_SIZE, SCREEN_LAYOUT } from './GameMapConstants';

// const gridHexesCoordinatesMap = generateHexagonalGrid(BOARD_RADIUS_SIZE);

// const gridHexesCornersMap: { x: number, y: number }[][] = [];
// gridHexesCoordinatesMap.slice().forEach(hexCoordinates => {
//   gridHexesCornersMap.push(polygonCorners(SCREEN_LAYOUT, hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)));
// });

// const uniqueHexagonCornerCoordinates = generateUniqueCornerCoordinates(gridHexesCornersMap);

// console.log({uniqueHexagonCornerCoordinates})

const uniqueHexagonCornerCoordinates = [
    {
        x: 304.1539030917348,
        y: 424,
    },
    {
        x: 304.1539030917348,
        y: 344,
    },
    {
        x: 234.87187078897966,
        y: 304,
    },
    {
        x: 165.58983848622455,
        y: 344,
    },
    {
        x: 165.58983848622455,
        y: 424,
    },
    {
        x: 234.87187078897963,
        y: 464,
    },
    {
        x: 373.43593539448983,
        y: 544,
    },
    {
        x: 373.43593539448983,
        y: 464,
    },
    {
        x: 234.8718707889796,
        y: 544,
    },
    {
        x: 304.1539030917347,
        y: 584,
    },
    {
        x: 442.71796769724494,
        y: 664,
    },
    {
        x: 442.71796769724494,
        y: 584,
    },
    {
        x: 304.1539030917347,
        y: 664,
    },
    {
        x: 373.43593539448983,
        y: 704,
    },
    {
        x: 373.43593539448983,
        y: 304,
    },
    {
        x: 373.43593539448983,
        y: 224,
    },
    {
        x: 304.1539030917347,
        y: 184,
    },
    {
        x: 234.8718707889796,
        y: 224,
    },
    {
        x: 442.71796769724494,
        y: 424,
    },
    {
        x: 442.71796769724494,
        y: 344,
    },
    {
        x: 512,
        y: 544,
    },
    {
        x: 512,
        y: 464,
    },
    {
        x: 581.282032302755,
        y: 664,
    },
    {
        x: 581.282032302755,
        y: 584,
    },
    {
        x: 512,
        y: 704,
    },
    {
        x: 442.71796769724494,
        y: 184,
    },
    {
        x: 442.71796769724494,
        y: 104,
    },
    {
        x: 373.43593539448983,
        y: 64,
    },
    {
        x: 304.1539030917347,
        y: 104,
    },
    {
        x: 512,
        y: 304,
    },
    {
        x: 512,
        y: 224,
    },
    {
        x: 581.282032302755,
        y: 424,
    },
    {
        x: 581.282032302755,
        y: 344,
    },
    {
        x: 650.5640646055101,
        y: 544,
    },
    {
        x: 650.5640646055101,
        y: 464,
    },
    {
        x: 719.8460969082652,
        y: 664,
    },
    {
        x: 719.8460969082652,
        y: 584,
    },
    {
        x: 650.5640646055101,
        y: 704,
    },
    {
        x: 581.282032302755,
        y: 184,
    },
    {
        x: 581.282032302755,
        y: 104,
    },
    {
        x: 512,
        y: 64,
    },
    {
        x: 650.5640646055101,
        y: 304,
    },
    {
        x: 650.5640646055101,
        y: 224,
    },
    {
        x: 719.8460969082652,
        y: 424,
    },
    {
        x: 719.8460969082652,
        y: 344,
    },
    {
        x: 789.1281292110203,
        y: 544,
    },
    {
        x: 789.1281292110203,
        y: 464,
    },
    {
        x: 719.8460969082652,
        y: 184,
    },
    {
        x: 719.8460969082652,
        y: 104,
    },
    {
        x: 650.5640646055101,
        y: 64,
    },
    {
        x: 789.1281292110203,
        y: 304,
    },
    {
        x: 789.1281292110203,
        y: 224,
    },
    {
        x: 858.4101615137754,
        y: 424,
    },
    {
        x: 858.4101615137754,
        y: 344,
    },
];

const roadPositions = [
    {
        a: {
            x: 304.1539030917348,
            y: 424,
        },
        b: {
            x: 304.1539030917348,
            y: 344,
        },
    },
    {
        a: {
            x: 304.1539030917348,
            y: 344,
        },
        b: {
            x: 373.43593539448983,
            y: 304,
        },
    },
    {
        a: {
            x: 304.1539030917348,
            y: 344,
        },
        b: {
            x: 234.87187078897966,
            y: 304,
        },
    },
    {
        a: {
            x: 234.87187078897966,
            y: 304,
        },
        b: {
            x: 234.87187078897966,
            y: 224,
        },
    },
    {
        a: {
            x: 165.58983848622455,
            y: 344,
        },
        b: {
            x: 234.87187078897966,
            y: 304,
        },
    },
    {
        a: {
            x: 165.58983848622455,
            y: 424,
        },
        b: {
            x: 165.58983848622455,
            y: 344,
        },
    },
    {
        a: {
            x: 234.87187078897963,
            y: 464,
        },
        b: {
            x: 304.1539030917348,
            y: 424,
        },
    },
    {
        a: {
            x: 234.87187078897963,
            y: 464,
        },
        b: {
            x: 165.58983848622455,
            y: 424,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 544,
        },
        b: {
            x: 373.43593539448983,
            y: 464,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 464,
        },
        b: {
            x: 442.71796769724494,
            y: 424,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 464,
        },
        b: {
            x: 304.1539030917348,
            y: 424,
        },
    },
    {
        a: {
            x: 234.8718707889796,
            y: 544,
        },
        b: {
            x: 234.8718707889796,
            y: 464,
        },
    },
    {
        a: {
            x: 304.1539030917347,
            y: 584,
        },
        b: {
            x: 373.43593539448983,
            y: 544,
        },
    },
    {
        a: {
            x: 304.1539030917347,
            y: 584,
        },
        b: {
            x: 234.8718707889796,
            y: 544,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 664,
        },
        b: {
            x: 442.71796769724494,
            y: 584,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 584,
        },
        b: {
            x: 512,
            y: 544,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 584,
        },
        b: {
            x: 373.43593539448983,
            y: 544,
        },
    },
    {
        a: {
            x: 304.1539030917347,
            y: 664,
        },
        b: {
            x: 304.1539030917347,
            y: 584,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 704,
        },
        b: {
            x: 442.71796769724494,
            y: 664,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 704,
        },
        b: {
            x: 304.1539030917347,
            y: 664,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 304,
        },
        b: {
            x: 373.43593539448983,
            y: 224,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 224,
        },
        b: {
            x: 442.71796769724494,
            y: 184,
        },
    },
    {
        a: {
            x: 373.43593539448983,
            y: 224,
        },
        b: {
            x: 304.1539030917347,
            y: 184,
        },
    },
    {
        a: {
            x: 304.1539030917347,
            y: 184,
        },
        b: {
            x: 304.1539030917347,
            y: 104,
        },
    },
    {
        a: {
            x: 234.8718707889796,
            y: 224,
        },
        b: {
            x: 304.1539030917347,
            y: 184,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 424,
        },
        b: {
            x: 442.71796769724494,
            y: 344,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 344,
        },
        b: {
            x: 512,
            y: 304,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 344,
        },
        b: {
            x: 373.43593539448983,
            y: 304,
        },
    },
    {
        a: {
            x: 512,
            y: 544,
        },
        b: {
            x: 512,
            y: 464,
        },
    },
    {
        a: {
            x: 512,
            y: 464,
        },
        b: {
            x: 581.282032302755,
            y: 424,
        },
    },
    {
        a: {
            x: 512,
            y: 464,
        },
        b: {
            x: 442.71796769724494,
            y: 424,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 664,
        },
        b: {
            x: 581.282032302755,
            y: 584,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 584,
        },
        b: {
            x: 650.5640646055101,
            y: 544,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 584,
        },
        b: {
            x: 512,
            y: 544,
        },
    },
    {
        a: {
            x: 512,
            y: 704,
        },
        b: {
            x: 581.282032302755,
            y: 664,
        },
    },
    {
        a: {
            x: 512,
            y: 704,
        },
        b: {
            x: 442.71796769724494,
            y: 664,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 184,
        },
        b: {
            x: 442.71796769724494,
            y: 104,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 104,
        },
        b: {
            x: 512,
            y: 64,
        },
    },
    {
        a: {
            x: 442.71796769724494,
            y: 104,
        },
        b: {
            x: 373.43593539448983,
            y: 64,
        },
    },
    {
        a: {
            x: 304.1539030917347,
            y: 104,
        },
        b: {
            x: 373.43593539448983,
            y: 64,
        },
    },
    {
        a: {
            x: 512,
            y: 304,
        },
        b: {
            x: 512,
            y: 224,
        },
    },
    {
        a: {
            x: 512,
            y: 224,
        },
        b: {
            x: 581.282032302755,
            y: 184,
        },
    },
    {
        a: {
            x: 512,
            y: 224,
        },
        b: {
            x: 442.71796769724494,
            y: 184,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 424,
        },
        b: {
            x: 581.282032302755,
            y: 344,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 344,
        },
        b: {
            x: 650.5640646055101,
            y: 304,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 344,
        },
        b: {
            x: 512,
            y: 304,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 544,
        },
        b: {
            x: 650.5640646055101,
            y: 464,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 464,
        },
        b: {
            x: 719.8460969082652,
            y: 424,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 464,
        },
        b: {
            x: 581.282032302755,
            y: 424,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 664,
        },
        b: {
            x: 719.8460969082652,
            y: 584,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 584,
        },
        b: {
            x: 789.1281292110203,
            y: 544,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 584,
        },
        b: {
            x: 650.5640646055101,
            y: 544,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 704,
        },
        b: {
            x: 719.8460969082652,
            y: 664,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 704,
        },
        b: {
            x: 581.282032302755,
            y: 664,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 184,
        },
        b: {
            x: 581.282032302755,
            y: 104,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 104,
        },
        b: {
            x: 650.5640646055101,
            y: 64,
        },
    },
    {
        a: {
            x: 581.282032302755,
            y: 104,
        },
        b: {
            x: 512,
            y: 64,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 304,
        },
        b: {
            x: 650.5640646055101,
            y: 224,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 224,
        },
        b: {
            x: 719.8460969082652,
            y: 184,
        },
    },
    {
        a: {
            x: 650.5640646055101,
            y: 224,
        },
        b: {
            x: 581.282032302755,
            y: 184,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 424,
        },
        b: {
            x: 719.8460969082652,
            y: 344,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 344,
        },
        b: {
            x: 789.1281292110203,
            y: 304,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 344,
        },
        b: {
            x: 650.5640646055101,
            y: 304,
        },
    },
    {
        a: {
            x: 789.1281292110203,
            y: 544,
        },
        b: {
            x: 789.1281292110203,
            y: 464,
        },
    },
    {
        a: {
            x: 789.1281292110203,
            y: 464,
        },
        b: {
            x: 858.4101615137754,
            y: 424,
        },
    },
    {
        a: {
            x: 789.1281292110203,
            y: 464,
        },
        b: {
            x: 719.8460969082652,
            y: 424,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 184,
        },
        b: {
            x: 719.8460969082652,
            y: 104,
        },
    },
    {
        a: {
            x: 719.8460969082652,
            y: 104,
        },
        b: {
            x: 650.5640646055101,
            y: 64,
        },
    },
    {
        a: {
            x: 789.1281292110203,
            y: 304,
        },
        b: {
            x: 789.1281292110203,
            y: 224,
        },
    },
    {
        a: {
            x: 789.1281292110203,
            y: 224,
        },
        b: {
            x: 719.8460969082652,
            y: 184,
        },
    },
    {
        a: {
            x: 858.4101615137754,
            y: 424,
        },
        b: {
            x: 858.4101615137754,
            y: 344,
        },
    },
    {
        a: {
            x: 858.4101615137754,
            y: 344,
        },
        b: {
            x: 789.1281292110203,
            y: 304,
        },
    },
];

//TODO extract
interface Point {
    x: number;
    y: number;
}

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const possibleSettlementTargets: GameObjects.Graphics[] = new Array(56);
    const possibleCityTargets: GameObjects.Graphics[] = new Array(4);
    const possibleRoadTargets: GameObjects.Graphics[] = new Array(56);
    const roadsBuild: { a: Point; b: Point }[] = new Array(60);

    let firstTimeChoosing = true;

    const buildSettlement = (hexagonCorner: Point) => {
        const scene = phaserRef.current!.scene!;
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
        const scene = phaserRef.current?.scene;

        if (scene && firstTimeChoosing) {
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
                // graphics.beginPath();
                graphics.strokeCircleShape(circle);
                graphics.fillCircleShape(circle);
                // console.log(circle.contains, circle.left);
                graphics.setInteractive(circle, (a, x, y, d) => {
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
                    // console.log(123, circle.contains());
                    return false;
                });

                graphics.closePath();
                graphics.fillPath();
                possibleSettlementTargets[i] = graphics;
                graphics.addListener("pointerdown", (e) => {
                    // graphics.removeFromDisplayList();
                    
                    const removeIndexSettlement =
                        possibleSettlementTargets.indexOf(graphics);

                    if(removeIndexSettlement !== -1) {
                      console.log({possibleSettlementTargets, removeIndex: removeIndexSettlement}, possibleSettlementTargets[removeIndexSettlement], removeIndexSettlement);
                      possibleSettlementTargets[removeIndexSettlement].setVisible(false);
                      possibleCityTargets.push(
                          possibleSettlementTargets[removeIndexSettlement]
                      );
                      possibleSettlementTargets.splice(removeIndexSettlement, 1);
  
                      possibleSettlementTargets.forEach((x) =>
                          x.setVisible(false)
                      );
                      buildSettlement(uniqueHexagonCornerCoordinates[i]);
                    } else {
                      const removeIndexCity = possibleCityTargets.indexOf(graphics);

                      if(removeIndexCity) {
                        possibleCityTargets[removeIndexCity].setVisible(false);
                        console.log('city', possibleCityTargets[removeIndexCity]);
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

    const chooseRoad = () => {
      const scene = phaserRef.current!.scene!;
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
          // graphics.beginPath();
          graphics.strokeCircleShape(circle);
          graphics.fillCircleShape(circle);

          graphics.setInteractive(circle, (a, x, y, d) => {
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
            // console.log(123, circle.contains());
            return false;
        });

        graphics.closePath();
        graphics.fillPath();
        possibleRoadTargets[i] = graphics;
        graphics.addListener("pointerdown", (e) => {
            // graphics.removeFromDisplayList();
            
            const removeIndexRoad =
              possibleRoadTargets.indexOf(graphics);

            if(removeIndexRoad !== -1) {
              // console.log({possibleSettlementTargets, removeIndex: removeIndexRoad}, possibleSettlementTargets[removeIndexRoad], removeIndexRoad);
              possibleRoadTargets[removeIndexRoad].setVisible(false);
              
              possibleRoadTargets.splice(removeIndexRoad, 1);

              possibleRoadTargets.forEach((x) =>
                  x.setVisible(false)
              );
              buildRoad(roadPositions[i]);
            }
        });

          scene.add.existing(graphics);
      }
    };

    // const buildRoad = () => {
    //     const scene = phaserRef.current!.scene!;
    //     for (let i = 0; i < roadPositions.length; i++) {
    //         const graphics = new GameObjects.Graphics(scene);

    //         graphics.setDefaultStyles({
    //             lineStyle: { width: 2, color: 0xff0000, alpha: 1 },
    //             fillStyle: { color: 0xffc0cb, alpha: 1 },
    //         });

    //         const line = new Phaser.Geom.Line(
    //             roadPositions[i].a.x,
    //             roadPositions[i].a.y,
    //             roadPositions[i].b.x,
    //             roadPositions[i].b.y
    //         );
    //         // graphics.beginPath();
    //         graphics.strokeLineShape(line);

    //         graphics.closePath();
    //         scene.add.existing(graphics);
    //     }
    // };

    const buildRoad = (roadPosition: {
        a: Point;
        b: Point;
    }) => {
        const scene = phaserRef.current!.scene!;
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
        // graphics.beginPath();
        graphics.strokeLineShape(line);

        graphics.closePath();
        scene.add.existing(graphics);
    };

    const chooseCity = () => {
      console.log({ possibleCityTargets });
        // const scene = phaserRef.current?.scene;

        // if (scene && firstTimeChoosing) {
        //     // for (let i = 0; i < uniqueHexagonCornerCoordinates.length; i++) {
        //     //     const graphics = new GameObjects.Graphics(scene);

        //     //     graphics.setDefaultStyles({
        //     //         lineStyle: { width: 2, color: 0xf000000, alpha: 1 },
        //     //         fillStyle: { color: 0xffffff, alpha: 1 },
        //     //     });

        //     //     const circle = new Phaser.Geom.Circle(
        //     //         uniqueHexagonCornerCoordinates[i].x,
        //     //         uniqueHexagonCornerCoordinates[i].y,
        //     //         20
        //     //     );
        //     //     // graphics.beginPath();
        //     //     graphics.strokeCircleShape(circle);
        //     //     graphics.fillCircleShape(circle);
        //     //     // console.log(circle.contains, circle.left);
        //     //     graphics.setInteractive(circle, (a, x, y, d) => {
        //     //         // console.log({a, b, c, d})
        //     //         if (
        //     //             a.radius > 0 &&
        //     //             x >= a.left &&
        //     //             x <= a.right &&
        //     //             y >= a.top &&
        //     //             y <= a.bottom
        //     //         ) {
        //     //             return true;
        //     //         }
        //     //         // console.log(123, circle.contains());
        //     //         return false;
        //     //     });

        //     //     graphics.closePath();
        //     //     graphics.fillPath();
        //     //     possibleSettlementTargets.push(graphics);
        //     //     graphics.addListener("pointerdown", (e) => {
        //     //         graphics.removeFromDisplayList();

        //     //         const removeIndex =
        //     //             possibleSettlementTargets.indexOf(graphics);

        //     //         possibleCityTargets.push(possibleSettlementTargets[removeIndex]);
        //     //         possibleSettlementTargets.splice(removeIndex, 1);

        //     //         possibleSettlementTargets.forEach((x) => x.setVisible(false));
        //     //         buildSettlement(uniqueHexagonCornerCoordinates[i]);
        //     //     });

        //     //     // Add graphics to the scene
        //     //     scene.add.existing(graphics);
        //     //     scene.add.text(uniqueHexagonCornerCoordinates[i].x, uniqueHexagonCornerCoordinates[i].y, `${i}`, {
        //     //       fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
        //     //       stroke: '#000000', strokeThickness: 8,
        //     //       align: 'center'
        //     //   })
        //     //     firstTimeChoosing = false;
        //     // }
        // } else {

        // }
        possibleCityTargets.forEach((x) => x.setVisible(true));
    };

    const buildCity = (hexagonCorner: Point) => {
      const scene = phaserRef.current!.scene!;
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
      // graphics.beginPath();
      graphics.strokeRectShape(rectangle);
      graphics.fillRectShape(rectangle);

      graphics.closePath();
      graphics.fillPath();
      scene.add.existing(graphics);
  };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            <div>
                <div>
                    <button className="button" onClick={chooseSettlement}>
                      Choose Settlement
                    </button>

                    <button className="button" onClick={chooseRoad}>
                      Choose Road
                    </button>

                    <button className="button" onClick={chooseCity}>
                      Choose City
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;




