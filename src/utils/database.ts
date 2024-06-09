import axios from "axios";


export function fetchGameEndpoint(gameId: string, endpoint: "gamedata" | "players" | "events") {
  return axios.get(import.meta.env.VITE_BACKEND_URL + "/games/" + gameId + "/" + endpoint);
}

export function fetchPlayerGames(summonerId: string) {
  return axios.get<GamePlayer[]>(import.meta.env.VITE_BACKEND_URL + "/players/" + summonerId);
}