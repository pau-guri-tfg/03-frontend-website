export async function getChampionData(championId: string) {
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/${championId}.json`);
  const data = await response.json();
  return data.data;
}

export function getChampionImage(championId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${championId}.png`;
}

export function getItemImage(itemId: number) {
  return `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${itemId}.png`;
}

export function getSpellImage(spellRawName: string) {
  const spellId = spellRawName.split('_')[2];
  return `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/spell/${spellId}.png`;
}