import { useEffect, useState } from 'react'
import { fetchPlayerGames } from '../utils/database';
import { fetchSummonerLeague } from '../utils/riotApi';
import { getProfileIcon } from '../utils/datadragon';

export default function SummonerHeader({ summoner, gameName = "", tagLine = "" }: { summoner: Riot.Summoner.SummonerDto | null, gameName?: string, tagLine?: string }) {
  const [playerLeague, setPlayerLeague] = useState<Riot.Summoner.LeagueEntryDTO | null>(null);

  useEffect(() => {
    if (!summoner) return;

    fetchSummonerLeague(summoner.id).then((res) => {
      res.data.forEach(entry => {
        if (entry.queueType === 'RANKED_SOLO_5x5') {
          setPlayerLeague(entry);
        }
      })
    });
  }, [summoner]);

  return (
    <div className='container'>
      <div className='flex items-center gap-16'>
        <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0">
          <img className="w-full h-full rounded-full select-none" src={getProfileIcon(summoner ? summoner.profileIconId : 29)} width={100} height={100} />
          {playerLeague &&
            <img
              className="absolute pointer-events-none select-none w-48 md:w-72 max-w-none left-1/2 transform -translate-x-1/2 bottom-[-4.2rem] md:bottom-[-6.4rem]"
              src={`/rank-frames/${playerLeague.tier}.png`} alt={playerLeague.tier}
            />
          }
          {playerLeague &&
            <span className="absolute select-none text-[10px] md:text-sm font-serif font-bold text-center left-1/2 transform -translate-x-1/2 top-[-0.5rem] md:top-[-0.65rem]">
              {playerLeague.rank}
            </span>
          }
        </div>
        <div className='flex items-center gap-3'>
          <h1 className='font-serif text-5xl font-semibold leading-none text-gold'>{gameName}</h1>
          <span className='text-2xl text-white/40'>#{tagLine.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}
