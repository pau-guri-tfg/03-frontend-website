type GameEventName = string | "GameStart" | "GameEnd" | "MinionsSpawning" | "FirstBlood" | "TurretKilled" | "FirstBrick" | "InhibKilled" | "DragonKill" | "HeraldKill" | "BaronKill" | "ChampionKill" | "Multikill" | "Ace";
type GameTeamName = string | "CHAOS" | "ORDER";
type GameLane = "TOP" | "MID" | "BOT" | "JUN";

type GameData = {
  _id: any;
  gameMode: string;
  gameTime: number;
  mapName: string;
  mapNumber: number;
  mapTerrain: string;
  gameStartTime: number;
  bannedChampions: string[];
  gameId: string;
}

type EventsDocument = {
  _id: any;
  Events: GameEvent[];
  gameId: string;
};

type GameEvent = {
  EventID: number;
  EventName: GameEventName;
  EventTime: number;
  KillerName?: string;
  KillStreak?: number;
  Assisters?: string[];
  VictimName?: string;
  Acer?: string;
}

type GamePlayer = {
  _id: any;
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: PlayerItem[];
  level: number;
  position: string;
  rawChampionName: string;
  rawSkinName?: string;
  respawnTimer: number;
  riotId: string;
  riotIdGameName: string;
  riotIdTagLine: string;
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
  team: GameTeamName;
  gameId: string;
};

type PlayerItem = {
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

type PlayerRune = {
  displayName: string;
  id: number;
  rawDescription: string;
  rawDisplayName: string;
}

type PlayerSpell = {
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}

type GameBuilding = | {
  type: "TURRET";
  team: GameTeamName;
  lane: GameLane;
  position: string;
} | {
  type: "INHIB";
  team: GameTeamName;
  lane: GameLane;
};