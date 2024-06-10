import axios from "axios";
import Spells from "../data/spells.json";
import Champions from "../data/champions.json";

export async function getChampionData(championId: string) {
  const response = await axios.get<Riot.DataDragon.ChampionDto>(`https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/data/en_US/champion/${championId}.json`);
  return response.data;
}

export function getChampionImageFromId(championId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/champion/${championId}.png`;
}

export function getChampionImageFromName(championName: string) {
  const championData = Object.values((Champions as Riot.DataDragon.ChampionDto).data).find(champion => champion.name === championName);
  if (!championData) return "";

  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/champion/${championData.image.full}`;
}

export function getItemImage(itemId: number) {
  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/item/${itemId}.png`;
}

export function getSpellImage(spellName: string) {
  const spellData = Object.values((Spells as Riot.DataDragon.SummonerSpellDto).data).find(spell => spell.name === spellName);
  if (!spellData) return "";

  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/spell/${spellData?.image.full}`;
}

export function getProfileIcon(profileIconId: number) {
  return `https://ddragon.leagueoflegends.com/cdn/${import.meta.env.VITE_DATA_DRAGON_API_VERSION}/img/profileicon/${profileIconId}.png`;
}