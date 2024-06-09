import { useEffect, useState } from 'react'
import { fetchPlayerGames } from '../utils/database';
import { fetchSummonerLeague } from '../utils/riotApi';
import { getProfileIcon } from '../utils/datadragon';

export default function SummonerHeader({ summoner }: { summoner: Riot.Summoner.SummonerDto }) {
  const [playerGames, setPlayerGames] = useState<GamePlayer[]>([]);
  const [playerLeague, setPlayerLeague] = useState<Riot.Summoner.LeagueEntryDTO | null>(null);

  useEffect(() => {
    fetchPlayerGames(summoner.id).then(res => setPlayerGames(res.data));
    fetchSummonerLeague(summoner.id).then((res) => {
      res.data.forEach(entry => {
        if (entry.queueType === 'RANKED_SOLO_5x5') {
          setPlayerLeague(entry);
        }
      })
    });
  }, [summoner]);

  return (
    <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0">
      <img className="w-full h-full rounded-full select-none" src={getProfileIcon(summoner.profileIconId)} width={100} height={100} />
      {playerLeague &&
        <img
          className="absolute pointer-events-none select-none w-48 md:w-72 max-w-none left-1/2 transform -translate-x-1/2 bottom-[-4.2rem] md:bottom-[-6.4rem]"
          src={`/rank-frames/${playerLeague.tier}.png`} alt={playerLeague.tier}
        />
      }
      {playerLeague &&
        <span className="absolute select-none text-[10px] md:text-sm font-display font-bold text-center left-1/2 transform -translate-x-1/2 top-[-0.75rem] md:top-[-0.8rem]">
          {playerLeague.rank}
        </span>
      }
    </div>
  )
}
