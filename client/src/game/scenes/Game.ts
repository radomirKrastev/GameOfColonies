import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { generateHexagonalGrid, generateUniqueCornerCoordinates, hex, polygonCorners } from '../../hexagonMathFunctions';
import { BOARD_RADIUS_SIZE, SCREEN_LAYOUT } from '../../GameMapConstants';
import { TILES, mapTilesBackground } from '../../images';
import { shuffleArray } from '../../utils';

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.setPath('assets');

    this.load.image('background', 'bg.png');
  
    this.load.image('dezert', TILES.DEZERT);
    this.load.image('sheep', TILES.SHEEP);
    this.load.image('wheat', TILES.WHEAT);
    this.load.image('stone', TILES.STONE);
    this.load.image('brick', TILES.BRICK);
    this.load.image('forest', TILES.FOREST);
  }

  create() {
    this.add.image(512, 384, 'background');
    
    const gridHexesCoordinatesMap = generateHexagonalGrid(BOARD_RADIUS_SIZE);
    
    const gridHexesCornersMap: { x: number, y: number }[][] = [];
    gridHexesCoordinatesMap.slice().forEach(hexCoordinates => {
      gridHexesCornersMap.push(polygonCorners(SCREEN_LAYOUT, hex(hexCoordinates.q, hexCoordinates.r, hexCoordinates.s)));
    });
    
    // const uniqueHexagonCornerCoordinates = generateUniqueCornerCoordinates(gridHexesCornersMap);
    
    // console.log({uniqueHexagonCornerCoordinates});
    shuffleArray(mapTilesBackground);
    // console.log({mapTilesBackground})

    for (let i = 0; i < gridHexesCornersMap.length; i++) {
      const graphics = new GameObjects.Graphics(this);

      graphics.setDefaultStyles({
        lineStyle: {  width: 2, color: 0xf000000, alpha: 1 },
        fillStyle: { color: 0xffffff, alpha: 0 }
      });

      const poly = new Phaser.Geom.Polygon(gridHexesCornersMap[i]);
      graphics.beginPath();
      graphics.strokePoints(poly.points, true);
      graphics.closePath();
      graphics.fillPath();

      const mask = graphics.createGeometryMask();

      // center of the hexagon on the x axis
      const centerX = gridHexesCornersMap[i].reduce((acc, xCorner) => {
          acc += xCorner.x;
          return acc;
      }, 0) / 6;

      // center of the hexagon on the y axis
      const centerY = gridHexesCornersMap[i].reduce((acc, yCorner) => {
          acc += yCorner.y;
          return acc;
      }, 0) / 6;

      const image = this.add.image(centerX, centerY, mapTilesBackground[i]);
      image.setDisplaySize(160, 160);
      image.setMask(mask);

      // Add graphics to the scene
      this.add.existing(graphics); 
    }

    EventBus.emit('current-scene-ready', this);
  }
}
