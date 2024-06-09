import axios from "axios";

export async function fetchSummoner(gameName: string, tagLine: string) {
  const accountFetch = await axios.get(import.meta.env.VITE_BACKEND_URL + `/riot-api/account/${gameName}/${tagLine}`);
  const accountData = accountFetch.data;
  const puuid = accountData.puuid;

  return axios.get<Riot.Summoner.SummonerDto>(import.meta.env.VITE_BACKEND_URL + '/riot-api/summoner/' + puuid);
}

export function fetchSummonerLeague(summonerId: string) {
  return axios.get<Riot.Summoner.LeagueEntryDTO[]>(import.meta.env.VITE_BACKEND_URL + "/riot-api/league/" + summonerId);
}