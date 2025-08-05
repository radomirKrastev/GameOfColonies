import { GameMapLayout, ICreateGameRequest, IDicesResponseDto, IGameResponse, IPlayer, ITurn, Point } from "../interfaces";
import { IGameAvailableSpots } from "../interfaces/game-available-spots.interface";
import { IGameConstructions } from "../interfaces/game-constructions.interface";

export const fetchGames = async (): Promise<IGameResponse[]> => {
  try {
    const res = await fetch("https://gameofcolonies.com/api/games");
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const fetchGameMapLayout = async (gameId: string): Promise<GameMapLayout> => {
  try {
    const response = await fetch(`https://gameofcolonies.com/api/games/${gameId}/map`);
    const gameMapLayout = await response.json();
    // console.log({ gameMapLayout })
    return gameMapLayout;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const createGame = async (data: ICreateGameRequest): Promise<IGameResponse> => {
  try {
    const res = await fetch('https://gameofcolonies.com/api/games', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const joinGame = async (gameId: string): Promise<IGameResponse> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/join`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      }
    });
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const fetchGame = async (gameId: string): Promise<IGameResponse> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}`);
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const startGame = async (gameId: string): Promise<IGameResponse> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/start`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      }
    });
    console.log({ res })
    const response = await res.json();
    console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

//Posible extract in a separate file
export const rollDices = async (gameId: string): Promise<IDicesResponseDto> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/dices/roll`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      }
    });
    console.log({ res })
    const response = await res.json();
    console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

//Posible extract in a separate file
export const fetchDices = async (gameId: string): Promise<IDicesResponseDto> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/dices`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    console.log({ res })
    const response = await res.json();
    console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const fetchPlayer = async (gameId: string, userId: string): Promise<IPlayer> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/players/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const fetchTurn = async (gameId: string): Promise<ITurn> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/turn`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const endTurn = async (gameId: string): Promise<ITurn> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/turn`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      }
    });
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const fetchAvailableSpots = async (gameId: string): Promise<IGameAvailableSpots> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/available-spots`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    // console.log({ res })
    const response = await res.json();
    console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const fetchConstructions = async (gameId: string): Promise<IGameConstructions> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/constructions`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const buildSettlement = async (gameId: string, data: { coordinates: Point }): Promise<IGameConstructions> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/constructions/settlement`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const buildRoad = async (gameId: string, data: { coordinates: { a: Point; b: Point } }): Promise<IGameConstructions> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/constructions/road`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};

export const buildCity = async (gameId: string, data: { coordinates: Point }): Promise<IGameConstructions> => {
  try {
    const res = await fetch(`https://gameofcolonies.com/api/games/${gameId}/constructions/city`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    // console.log({ res })
    const response = await res.json();
    // console.log({ response })
    return response;
  } catch (error) {
    console.log("Bad request");
    throw new Error("...");
  }
};
