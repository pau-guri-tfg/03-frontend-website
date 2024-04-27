import axios from "axios";


export function fetchGameEndpoint(gameId: string, endpoint: "gamedata" | "players" | "events") {
  return axios.get(import.meta.env.VITE_BACKEND_URL + "/database/games/" + gameId + "/" + endpoint);
}