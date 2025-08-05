import { GameObjects } from "phaser";
import { Point } from "../../interfaces";
import { IAvailableSpot, IAvailableRoad } from "../../interfaces/game-available-spots.interface";
import { PointOrPair } from "../../types";

export const drawCircle = (
  spot: IAvailableSpot | IAvailableRoad,
  scene: Phaser.Scene,
  coordinates: Point,
  chooseHandler: (coordinates: PointOrPair) => void
) => {
  const graphics = new GameObjects.Graphics(scene);
  graphics.setDefaultStyles({
    lineStyle: { width: 2, color: 0xf000000, alpha: 1 },
    fillStyle: { color: 0xffffff, alpha: 1 },
  });

  const circle = new Phaser.Geom.Circle(
    coordinates.x,
    coordinates.y,
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
  graphics.setVisible(false);
  spot.graphics = graphics;
  scene.add.existing(graphics);
  graphics.addListener("pointerdown", () => chooseHandler(spot.coordinates));
}

export const drawTriangle = (
  scene: Phaser.Scene,
  hexagonCorner: Point,
  color: number
): GameObjects.Graphics => {

  const graphics = new GameObjects.Graphics(scene);

  graphics.setDefaultStyles({
    lineStyle: { width: 2, color, alpha: 1 },
    fillStyle: { color: color, alpha: 1 },
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
  console.log("Settlement graphics created:", graphics);
  return graphics;
}

export const drawLine = (
  scene: Phaser.Scene,
  roadPosition: { a: Point; b: Point },
  color: number
): GameObjects.Graphics => {
  const graphics = new GameObjects.Graphics(scene);

  graphics.setDefaultStyles({
    lineStyle: { width: 5, color, alpha: 1 },
    fillStyle: { color, alpha: 1 },
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
  console.log("Road graphics created:", graphics);
  return graphics;
}

export const drawRectangle = (
  scene: Phaser.Scene,
  coordinates: Point,
  color: number
): GameObjects.Graphics => {
  const graphics = new GameObjects.Graphics(scene);

  graphics.setDefaultStyles({
    lineStyle: { width: 2, color, alpha: 1 },
    fillStyle: { color, alpha: 1 },
  });
  graphics.setDepth(2);

  const rectangle = new Phaser.Geom.Rectangle(
    coordinates.x - 15,
    coordinates.y - 15,
    30,
    30
  );
  graphics.strokeRectShape(rectangle);
  graphics.fillRectShape(rectangle);

  graphics.closePath();
  graphics.fillPath();
  scene.add.existing(graphics);
  console.log("Road graphics created:", graphics);
  return graphics;
}