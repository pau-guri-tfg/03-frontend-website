import axios from "axios";

export function registerVisit(data: Visitors.ChampionsVisit | Visitors.LiveVisit | Visitors.SummonerVisit | Visitors.MatchesVisit) {
  axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/visit?api_key=${import.meta.env.VITE_BACKEND_API_KEY}`,
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } }
  );
}

export function fetchAllVisits(timeframe: Visitors.DatabaseTimeframe, toTimestamp: number, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/everything?api_key=${import.meta.env.VITE_BACKEND_API_KEY}&timeframe=${timeframe}&toTimestamp=${toTimestamp}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchMatchesVisits(timeframe: Visitors.DatabaseTimeframe, toTimestamp: number, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/matches?api_key=${import.meta.env.VITE_BACKEND_API_KEY}&timeframe=${timeframe}&toTimestamp=${toTimestamp}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchChampionsVisits(timeframe: Visitors.DatabaseTimeframe, toTimestamp: number, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/champions?api_key=${import.meta.env.VITE_BACKEND_API_KEY}&timeframe=${timeframe}&toTimestamp=${toTimestamp}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchLiveVisits(timeframe: Visitors.DatabaseTimeframe, toTimestamp: number, groupByGameId: boolean = false, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/live?api_key=${import.meta.env.VITE_BACKEND_API_KEY}&timeframe=${timeframe}&toTimestamp=${toTimestamp}&group=${groupByGameId}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchSummonerVisits(timeframe: Visitors.DatabaseTimeframe, toTimestamp: number, groupBySummoner: boolean = false, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/summoner?api_key=${import.meta.env.VITE_BACKEND_API_KEY}&timeframe=${timeframe}&toTimestamp=${toTimestamp}&group=${groupBySummoner}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchLiveVisitsByGame(gameId: string, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/live/${gameId}?api_key=${import.meta.env.VITE_BACKEND_API_KEY}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}

export function fetchSummonerVisitsBySummoner(riotIdGameName: string, riotIdTagLine: string, limit?: number, offset?: number) {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/summoner/${riotIdGameName}/${riotIdTagLine}?api_key=${import.meta.env.VITE_BACKEND_API_KEY}` + (limit ? `&limit=${limit}` : "") + (offset ? `&offset=${offset}` : "")
  );
}