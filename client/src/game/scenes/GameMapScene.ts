import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import { TILES } from "../../images";
import { diceRollProbability } from "../../constants";
import { GameMap, Point, Tile } from "../../interfaces";

export class GameMapScene extends Scene implements GameMap {
  private _uniqueHexagonCornerCoordinates: Point[];
  private _tiles: Tile[];
  private _gridHexesCornersMap: Point[][];

  constructor() {
    super("GameMapScene");
  }

  get uniqueHexagonCornerCoordinates(): Point[] {
    return this._uniqueHexagonCornerCoordinates;
  }

  set uniqueHexagonCornerCoordinates(value: Point[]) {
    this._uniqueHexagonCornerCoordinates = value;
  }

  get tiles(): Tile[] {
    return this._tiles;
  }

  set tiles(value: Tile[]) {
    this._tiles = value;
  }

  get gridHexesCornersMap(): Point[][] {
    return this._gridHexesCornersMap;
  }

  set gridHexesCornersMap(value: Point[][]) {
    this._gridHexesCornersMap = value;
  }

  preload() {
    this.load.setPath("/assets");

    this.load.image("background", "bg.png");
    this.load.image("three", "three.png");

    this.load.image("empty", TILES.EMPTY);
    this.load.image("sheep", TILES.SHEEP);
    this.load.image("wheat", TILES.WHEAT);
    this.load.image("stone", TILES.STONE);
    this.load.image("brick", TILES.BRICK);
    this.load.image("wood", TILES.FOREST);
  }

  /**
* This method creates the game map. It shuffles tiles, draw the hexagons and places its numeric values
*/
  private generateTiles() {
    for (let t = 0; t < this.tiles.length; t++) {
      const tile = this.tiles[t];
      const corners = tile.corners;
      console.log({ tile })
      console.log({ corners })
      const graphics = new GameObjects.Graphics(this);

      graphics.setDefaultStyles({
        lineStyle: { width: 8, color: 0xffff00, alpha: 1 },
        fillStyle: { color: 0xffffff, alpha: 0 },
      });

      const poly = new Phaser.Geom.Polygon(corners);
      graphics.beginPath();
      graphics.strokePoints(poly.points, true);
      graphics.closePath();
      graphics.fillPath();

      const mask = graphics.createGeometryMask();

      const image = this.add.image(
        tile.center.x,
        tile.center.y,
        tile.resource
      );
      image.setDisplaySize(160, 160);
      image.setMask(mask);

      //-image 

      // const resourceValueImage = this.add.image(
      //   // centerX,
      //   // centerY,
      //   // this._tiles[i].point.x,
      //   // this._tiles[i].point.y,
      //   tile.center.x,
      //   tile.center.y,
      //   "three"
      // );
      // resourceValueImage.setDisplaySize(45, 45);
      // resourceValueImage.setMask(mask);

      const isHighChance = tile.value === 8 || tile.value === 6;

      if (tile.value) {
        this.add.text(
          tile.center.x - 15,
          tile.center.y - 15,
          `${tile.value}`,
          {
            fontFamily: "Arial Black",
            fontSize: 30,
            color:  isHighChance ? "#f50505" : "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
          }
        );

        this.add.text(
          tile.center.x - 10,
          tile.center.y + 20,
          `${diceRollProbability[tile.value]}`,
          {
            fontFamily: "Arial Black",
            fontSize: 12,
            color:  isHighChance ? "#f50505" : "#ffffff",
            stroke: "#000000",
            strokeThickness: 3,
            align: "center",
          }
        );
      }

      // Add graphics to the scene
      this.add.existing(graphics);
    }
  }

  create() {
    EventBus.emit("game-map-initialization", this);
    this.add.image(512, 384, "background");

    this.generateTiles();

    EventBus.emit("current-scene-ready", this);
  }
}
