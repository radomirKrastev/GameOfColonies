import { GameMapLayout, ICreateGameRequest, IGameResponse, IJoinGameRequest } from "../interfaces";

export const fetchGames = async (): Promise<IGameResponse[]> => {
  try {
    const res = await fetch("https://gameofcolonies.dev/api/games");
    console.log({ res })
    const response = await res.json();
    console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const fetchGameMapLayout = async (): Promise<GameMapLayout> => {
  try {
    const response = await fetch("https://localhost:3000/game/map");
    const gameMapLayout = await response.json();
    console.log({ gameMapLayout })
    return gameMapLayout;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const createGame = async (data: ICreateGameRequest): Promise<IGameResponse> => {
  try {
    const res = await fetch('https://gameofcolonies.dev/api/games', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const response = await res.json();
    console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const joinGame = async (gameId: string, data: IJoinGameRequest): Promise<IGameResponse> => {
  try {
    const res = await fetch(`https://gameofcolonies.dev/api/games/${gameId}/join`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const response = await res.json();
    console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

