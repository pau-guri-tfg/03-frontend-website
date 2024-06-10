import axios from "axios";

export function fetchAccount(gameName: string, tagLine: string) {
  return axios.get<Riot.Summoner.AccountDto>(import.meta.env.VITE_BACKEND_URL + `/riot-api/account/${gameName}/${tagLine}` + "?api_key=" + import.meta.env.VITE_BACKEND_API_KEY);
}

export async function fetchSummoner(puuid: string) {
  return axios.get<Riot.Summoner.SummonerDto>(import.meta.env.VITE_BACKEND_URL + '/riot-api/summoner/' + puuid + "?api_key=" + import.meta.env.VITE_BACKEND_API_KEY);
}

export function fetchSummonerLeague(summonerId: string) {
  return axios.get<Riot.Summoner.LeagueEntryDTO[]>(import.meta.env.VITE_BACKEND_URL + "/riot-api/league/" + summonerId + "?api_key=" + import.meta.env.VITE_BACKEND_API_KEY);
}

export function fetchMatch(gameId: string) {
  return axios.get<Riot.Match.MatchDto>(import.meta.env.VITE_BACKEND_URL + "/riot-api/match/" + gameId + "?api_key=" + import.meta.env.VITE_BACKEND_API_KEY);
}