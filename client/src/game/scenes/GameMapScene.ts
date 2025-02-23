import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import { TILES, mapTilesBackground } from "../../images";
import { shuffleArray } from "../../utils";
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
        this.load.setPath("assets");

        this.load.image("background", "bg.png");

        this.load.image("dezert", TILES.DEZERT);
        this.load.image("sheep", TILES.SHEEP);
        this.load.image("wheat", TILES.WHEAT);
        this.load.image("stone", TILES.STONE);
        this.load.image("brick", TILES.BRICK);
        this.load.image("forest", TILES.FOREST);
    }

    /**
     * This method creates the game map. It shuffles tiles, draw the hexagons and places its numeric values
     */
    private generateTiles() {
        shuffleArray(mapTilesBackground);

        for (let i = 0; i < this.gridHexesCornersMap.length; i++) {
            const graphics = new GameObjects.Graphics(this);

            graphics.setDefaultStyles({
                lineStyle: { width: 8, color: 0xffff00, alpha: 1 },
                fillStyle: { color: 0xffffff, alpha: 0 },
            });

            const poly = new Phaser.Geom.Polygon(this.gridHexesCornersMap[i]);
            graphics.beginPath();
            graphics.strokePoints(poly.points, true);
            graphics.closePath();
            graphics.fillPath();

            const mask = graphics.createGeometryMask();

            // center of the hexagon on the x axis
            const centerX =
                this.gridHexesCornersMap[i].reduce((acc, xCorner) => {
                    acc += xCorner.x;
                    return acc;
                }, 0) / 6;

            // center of the hexagon on the y axis
            const centerY =
                this.gridHexesCornersMap[i].reduce((acc, yCorner) => {
                    acc += yCorner.y;
                    return acc;
                }, 0) / 6;

            const image = this.add.image(
                centerX,
                centerY,
                mapTilesBackground[i]
            );
            image.setDisplaySize(160, 160);
            image.setMask(mask);

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
