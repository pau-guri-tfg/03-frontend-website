import axios from "axios";

export function fetchAccount(gameName: string, tagLine: string) {
  return axios.get<Riot.Summoner.AccountDto>(import.meta.env.VITE_BACKEND_URL + `/riot-api/account/${gameName}/${tagLine}`);
}

export async function fetchSummoner(puuid: string) {
  return axios.get<Riot.Summoner.SummonerDto>(import.meta.env.VITE_BACKEND_URL + '/riot-api/summoner/' + puuid);
}

export function fetchSummonerLeague(summonerId: string) {
  return axios.get<Riot.Summoner.LeagueEntryDTO[]>(import.meta.env.VITE_BACKEND_URL + "/riot-api/league/" + summonerId);
}