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
  TurretKilled?: string;
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
  puuid?: string;
  summonerId?: string;
  profileIconId?: number;
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

namespace Riot {
  namespace Summoner {
    type AccountDto = {
      gameName: string;
      tagLine: string;
      puuid: string;
    }
    type SummonerDto = {
      id: string;
      accountId: string;
      puuid: string;
      profileIconId: number;
      revisionDate: number;
      summonerLevel: number;
    };
    type LeagueEntryDTO = {
      leagueId: string;
      summonerId: string;
      summonerName: string;
      queueType: string;
      tier: string;
      rank: string;
      leaguePoints: number;
      wins: number;
      losses: number;
      hotStreak: boolean;
      veteran: boolean;
      freshBlood: boolean;
      inactive: boolean;
      miniSeries: MiniSeriesDTO;
    };
    type MiniSeriesDTO = {
      losses: number;
      progress: string;
      target: number;
      wins: number;
    };

  }

  namespace Match {
    type MatchDto = {
      metadata: MetadataDto;
      info: InfoDto;
    };

    type MetadataDto = {
      dataVersion: string;
      matchId: string;
      participants: string[];
    };

    type InfoDto = {
      gameCreation: number;
      gameDuration: number;
      gameEndTimestamp: number;
      gameId: number;
      gameMode: string;
      gameName: string;
      gameStartTimestamp: number;
      gameType: string;
      gameVersion: string;
      mapId: number;
      participants: ParticipantDto[];
      platformId: string;
      queueId: number;
      teams: TeamDto[];
      tournamentCode: string;
    };

    type ParticipantDto = {
      assists: number;
      baronKills: number;
      bountyLevel: number;
      champExperience: number;
      champLevel: number;
      championId: number;
      championName: string;
      championTransform: number;
      consumablesPurchased: number;
      damageDealtToBuildings: number;
      damageDealtToObjectives: number;
      damageDealtToTurrets: number;
      damageSelfMitigated: number;
      deaths: number;
      detectorWardsPlaced: number;
      doubleKills: number;
      dragonKills: number;
      firstBloodAssist: boolean;
      firstBloodKill: boolean;
      firstTowerAssist: boolean;
      firstTowerKill: boolean;
      gameEndedInEarlySurrender: boolean;
      gameEndedInSurrender: boolean;
      goldEarned: number;
      goldSpent: number;
      individualPosition: string;
      inhibitorKills: number;
      inhibitorTakedowns: number;
      inhibitorsLost: number;
      item0: number;
      item1: number;
      item2: number;
      item3: number;
      item4: number;
      item5: number;
      item6: number;
      itemsPurchased: number;
      killingSprees: number;
      kills: number;
      lane: string;
      largestCriticalStrike: number;
      largestKillingSpree: number;
      largestMultiKill: number;
      longestTimeSpentLiving: number;
      magicDamageDealt: number;
      magicDamageDealtToChampions: number;
      magicDamageTaken: number;
      neutralMinionsKilled: number;
      nexusKills: number;
      nexusLost: number;
      nexusTakedowns: number;
      objectivesStolen: number;
      objectivesStolenAssists: number;
      participantId: number;
      pentaKills: number;
      perks: PerksDto;
      physicalDamageDealt: number;
      physicalDamageDealtToChampions: number;
      physicalDamageTaken: number;
      profileIcon: number;
      puuid: string;
      quadraKills: number;
      riotIdName: string;
      riotIdTagline: string;
      role: string;
      sightWardsBoughtInGame: number;
      spell1Casts: number;
      spell2Casts: number;
      spell3Casts: number;
      spell4Casts: number;
      summoner1Casts: number;
      summoner1Id: number;
      summoner2Casts: number;
      summoner2Id: number;
      summonerId: string;
      summonerLevel: number;
      summonerName: string;
      teamEarlySurrendered: boolean;
      teamId: number;
      teamPosition: string;
      timeCCingOthers: number;
      timePlayed: number;
      totalDamageDealt: number;
      totalDamageDealtToChampions: number;
      totalDamageShieldedOnTeammates: number;
      totalDamageTaken: number;
      totalHeal: number;
      totalHealsOnTeammates: number;
      totalMinionsKilled: number;
      totalTimeCCDealt: number;
      totalTimeSpentDead: number;
      totalUnitsHealed: number;
      tripleKills: number;
      trueDamageDealt: number;
      trueDamageDealtToChampions: number;
      trueDamageTaken: number;
      turretKills: number;
      turretTakedowns: number;
      turretsLost: number;
      unrealKills: number;
      visionScore: number;
      visionWardsBoughtInGame: number;
      wardsKilled: number;
      wardsPlaced: number;
      win: boolean;
    };

    type PerksDto = {
      statPerks: PerkStatsDto;
      styles: PerkStyleDto[];
    };

    type PerkStatsDto = {
      defense: number;
      flex: number;
      offense: number;
    };

    type PerkStyleDto = {
      description: string;
      selections: PerkStyleSelectionDto[];
      style: number;
    };

    type PerkStyleSelectionDto = {
      perk: number;
      var1: number;
      var2: number;
      var3: number;
    };

    type TeamDto = {
      bans: BanDto[];
      objectives: ObjectivesDto;
      teamId: number;
      win: boolean;
    };

    type BanDto = {
      championId: number;
      pickTurn: number;
    };

    type ObjectivesDto = {
      baron: ObjectiveDto;
      champion: ObjectiveDto;
      dragon: ObjectiveDto;
      inhibitor: ObjectiveDto;
      riftHerald: ObjectiveDto;
      tower: ObjectiveDto;
    };

    type ObjectiveDto = {
      first: boolean;
      kills: number;
    };
  }

  namespace DataDragon {
    type ChampionDto = {
      type: string;
      format: string;
      version: string;
      data: { [key: string]: ChampionDataDto };
    };

    type ChampionDataDto = {
      id: string;
      key: string;
      name: string;
      title: string;
      blurb: string;
      lore: string;
      allytips: string[];
      enemytips: string[];
      info: ChampionInfoDto;
      image: ChampionImageDto;
      tags: string[];
      partype: string;
      stats: ChampionStatsDto;
      spells: ChampionSpellDto[];
      passive: ChampionPassiveDto;
      skins: ChampionSkinDto[];
      recommended: any[];
    };

    type ChampionSkinDto = {
      id: string;
      num: number;
      name: string;
      chromas: boolean;
    }

    type ChampionInfoDto = {
      attack: number;
      defense: number;
      magic: number;
      difficulty: number;
    };

    type ChampionImageDto = {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };

    type ChampionStatsDto = {
      hp: number;
      hpperlevel: number;
      mp: number;
      mpperlevel: number;
      movespeed: number;
      armor: number;
      armorperlevel: number;
      spellblock: number;
      spellblockperlevel: number;
      attackrange: number;
      hpregen: number;
      hpregenperlevel: number;
      mpregen: number;
      mpregenperlevel: number;
      crit: number;
      critperlevel: number;
      attackdamage: number;
      attackdamageperlevel: number;
      attackspeedperlevel: number;
      attackspeed: number;
    };

    type ChampionSpellDto = {
      id: string;
      name: string;
      description: string;
      tooltip: string;
      leveltip: ChampionSpellLevelTipDto;
      maxrank: number;
      cooldown: number[];
      cooldownBurn: string;
      cost: number[];
      costBurn: string;
      datavalues: any;
      effect: any[];
      effectBurn: any[];
      vars: any[];
      costType: string;
      maxammo: string;
      range: number[];
      rangeBurn: string;
      image: ChampionImageDto;
      resource: string;
    };

    type ChampionSpellLevelTipDto = {
      label: string[];
      effect: string[];
    };

    type ChampionPassiveDto = {
      name: string;
      description: string;
      image: ChampionImageDto;
    };

    type ItemDto = {
      type: string;
      version: string;
      basic: ItemBasicDataDto;
      data: { [key: string]: ItemDataDto };
      groups: ItemGroupDto[];
      tree: ItemTreeDto[];
    };

    type ItemBasicDataDto = {
      name: string;
      rune: RuneDto;
      gold: GoldDto;
      group: string;
      description: string;
      colloq: string;
      plaintext: string;
      consumed: boolean;
      stacks: number;
      depth: number;
      consumeOnFull: boolean;
      from: string[];
      into: string[];
      specialRecipe: number;
      inStore: boolean;
      hideFromAll: boolean;
      requiredChampion: string;
      requiredAlly: string;
      stats: { [key: string]: number };
      tags: string[];
      maps: { [key: string]: boolean };
    };

    type RuneDto = {
      isrune: boolean;
      tier: number;
      type: string;
    };

    type GoldDto = {
      base: number;
      purchasable: boolean;
      total: number;
      sell: number;
    };

    type ItemDataDto = {
      name: string;
      description: string;
      colloq: string;
      plaintext: string;
      stacks: number;
      consumed: boolean;
      inStore: boolean;
      hideFromAll: boolean;
      consumeOnFull: boolean;
      into: string[];
      image: ItemImageDto;
      gold: ItemGoldDto;
      tags: string[];
      maps: { [key: string]: boolean };
      stats: { [key: string]: number };
      effect: { [key: string]: string };
      depth: number;
      from: string[];
    };

    type ItemImageDto = {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };

    type ItemGoldDto = {
      base: number;
      purchasable: boolean;
      total: number;
      sell: number;
    };

    type ItemGroupDto = {
      id: string;
      MaxGroupOwnable: string;
    };

    type ItemTreeDto = {
      header: string;
      tags: string[];
    };

    type QueueTypeDto = {
      queueId: number;
      map: string;
      description: string;
      notes: string;
    }
  }
}