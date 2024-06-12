import axios from "axios";

export function registerVisit(data: Visitors.ChampionsVisit | Visitors.LiveVisit | Visitors.SummonerVisit | Visitors.MatchesVisit) {
  axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/visitors/visit?api_key=${import.meta.env.VITE_BACKEND_API_KEY}`,
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } }
  );
}