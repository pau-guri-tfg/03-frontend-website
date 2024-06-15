import axios from "axios";

export function registerVisit(data: Visitors.ChampionsVisit | Visitors.LiveVisit | Visitors.SummonerVisit | Visitors.MatchesVisit) {
  axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/visit?api_key=${import.meta.env.VITE_BACKEND_API_KEY}`,
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } }
  );
}

export function fetchVisitsByTime(endpoint: Visitors.DatabaseEndpoint, timeframe: Visitors.DatabaseTimeframe, toTimestamp: number, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/${endpoint}?api_key=${import.meta.env.VITE_BACKEND_API_KEY}&timeframe=${timeframe}&toTimestamp=${toTimestamp}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchLiveVisitsByGame(gameId: string, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/live/${gameId}?api_key=${import.meta.env.VITE_BACKEND_API_KEY}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchSummonerVisitsBySummoner(riotIdGameName: string, riotIdTagLine?: string, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/summoner/${riotIdGameName}` + (riotIdTagLine ? `/${riotIdTagLine}` : "") + `?api_key=${import.meta.env.VITE_BACKEND_API_KEY}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}