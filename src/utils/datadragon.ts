import axios from "axios";

export async function getChampionData(championId: string) {
  const response = await axios.get<Riot.DataDragon.ChampionDto>(`https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/data/en_US/champion/${championId}.json`);
  return response.data;
}

export function getChampionImage(championId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/champion/${championId}.png`;
}

export function getItemImage(itemId: number) {
  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/item/${itemId}.png`;
}

export function getSpellImage(spellRawName: string) {
  const spellId = spellRawName.split('_')[2];
  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/spell/${spellId}.png`;
}

export function getProfileIcon(profileIconId: number) {
  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/profileicon/${profileIconId}.png`;
}