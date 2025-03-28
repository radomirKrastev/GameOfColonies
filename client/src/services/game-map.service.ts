import { GameMapLayout } from "../interfaces";

export const fetchGameMapLayout = async (): Promise<GameMapLayout> => {
    try {
        const response = await fetch("http://localhost:3000/game/map");
        const gameMapLayout = await response.json();
        console.log({gameMapLayout})
        return gameMapLayout;
    } catch (error) {
        console.log("Bad request");
        throw new Error("...");
    }
};

