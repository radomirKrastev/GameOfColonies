import { GameMapLayout } from "../game-map-layout.interface";
import { IRefPhaserGame } from "../../game/PhaserGame";
import { IPlayer } from "../player.interface";
import { ITurn } from "../turn.interface";
import { IGameAvailableSpots } from "../game-available-spots.interface";
import { IGameConstructions } from "../game-constructions.interface";

export interface IGameContext {
    gameMapLayout: GameMapLayout;
    phaserRef: React.MutableRefObject<IRefPhaserGame | null>;
    player: IPlayer | null;
    turn: ITurn | null;
    isPlayerTurn: boolean;
    availableSpots: IGameAvailableSpots | null;
    constructions: IGameConstructions | null;
    settlements: IGameConstructions["settlements"];
    roads: IGameConstructions["roads"];
    cities: IGameConstructions["cities"];
}

