export type GameEventName = "GameStart" | "GameEnd" | "MinionsSpawning" | "TurretKilled" | "FirstBrick" | "InhibKilled" | "DragonKill" | "HeraldKill" | "BaronKill" | "ChampionKill" | "Multikill" | "Ace";
export type GameTeamName = "CHAOS" | "ORDER";

export type GameEvent = {
  EventID: number;
  EventName: GameEventName;
  EventTime: number;
  KillerName?: string;
  KillStreak?: number;
  Assisters?: string[];
  VictimName?: string;
  Acer?: string;
}

export type GamePlayer = {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: PlayerItem[];
  level: number;
  position: string;
  rawChampionName: string;
  respawnTimer: number;
  runes: {
    keystone: PlayerRune;
    primaryRuneTree: PlayerRune;
    secondaryRuneTree: PlayerRune;
  };
  scores: {
    assists: number;
    creepScore: number;
    deaths: number;
    kills: number;
    wardScore: number;
  };
  skinID: number;
  summonerName: string;
  summonerSpells: {
    summonerSpellOne: PlayerSpell;
    summonerSpellTwo: PlayerSpell;
  };
  team: string;
  gameId: string;
};

export type PlayerItem = {
  canUse: boolean;
  consumable: boolean;
  count: number;
  displayName: string;
  itemID: number;
  price: number;
  rawDescription: string;
  rawDisplayName: string;
  slot: number;
}

export type PlayerRune = {
  displayName: string;
  id: number;
  rawDescription: string;
  rawDisplayName: string;
}

export type PlayerSpell = {
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}