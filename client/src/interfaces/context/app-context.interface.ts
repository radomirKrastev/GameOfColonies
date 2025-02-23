import { GameObjects } from "phaser";
import { GameMapLayout } from "../game-map-layout.interface";
import { IRoad } from "../road.interface";
import { IRefPhaserGame } from "../../game/PhaserGame";

export interface IAppContext {
    gameMapLayout: GameMapLayout;
    possibleSettlementTargets: GameObjects.Graphics[];
    possibleCityTargets: GameObjects.Graphics[];
    possibleRoadTargets: GameObjects.Graphics[];
    roadsBuild: IRoad[];
    phaserRef: React.MutableRefObject<IRefPhaserGame | null>;
}
