import { GameObjects } from "phaser";
import { GameMapLayout } from "../game-map-layout.interface";
import { IRoad } from "../road.interface";
import { IRefPhaserGame } from "../../game/PhaserGame";
import { IPlayer } from "../player.interface";
import { ITurn } from "../turn.interface";

export interface IGameContext {
    gameMapLayout: GameMapLayout;
    possibleSettlementTargets: GameObjects.Graphics[];
    possibleCityTargets: GameObjects.Graphics[];
    possibleRoadTargets: GameObjects.Graphics[];
    roadsBuild: IRoad[];
    phaserRef: React.MutableRefObject<IRefPhaserGame | null>;
    player: IPlayer | null;
    turn: ITurn | null;
    isPlayerTurn: boolean
}

