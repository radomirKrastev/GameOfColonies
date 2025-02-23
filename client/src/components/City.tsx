import { GameObjects } from "phaser";
import { useAppContext } from "./App";
import { Point } from "../interfaces";

function City() {
    const { possibleCityTargets, phaserRef } = useAppContext();
    const scene = phaserRef.current!.scene!;

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

    return (
        <button className="button" onClick={chooseCity}>
            Choose City
        </button>
    );
}

export default City;

