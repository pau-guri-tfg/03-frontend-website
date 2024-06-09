import axios from "axios";


export function fetchGameEndpoint(gameId: string, endpoint: GameDatabaseEndpoint, limit?: number, offset?: number) {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/${endpoint}?api_key=${import.meta.env.VITE_BACKEND_API_KEY}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : ""));
}

export function fetchGamesByPlayerEndpoint(summonerId: string, endpoint: GameDatabaseEndpoint, limit?: number, offset?: number) {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/games-by-player/${summonerId}/${endpoint}?api_key=${import.meta.env.VITE_BACKEND_API_KEY}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : ""));
}