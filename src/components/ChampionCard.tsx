import { useEffect, useRef, useState } from 'react'
import { getChampionDataFromName, getChampionImageFromName } from '../utils/datadragon';

export default function ChampionCard({ champion, totalGames }: { champion: ChampionDocument, totalGames: number }) {
  const [pickRate, setPickRate] = useState<string>('-%');
  const [totalKills, setTotalKills] = useState<number | string>('-');
  const [topPlayer, setTopPlayer] = useState<GamePlayer | null>(null);
  const championData = useRef<Riot.DataDragon.ChampionDataDto | null>(getChampionDataFromName(champion.championName));

  useEffect(() => {
    const newTotalKills = champion.players.reduce((acc, player) => acc + player.scores.kills, 0);
    setTotalKills(newTotalKills);

    const playerCounts: { [riotId: string]: number } = {};
    champion.players.forEach(player => {
      if (player.isBot || !player.riotId) return;

      if (playerCounts.hasOwnProperty(player.riotId)) {
        playerCounts[player.riotId]++;
      } else {
        playerCounts[player.riotId] = 1;
      }
    });
    const newTopPlayerId = Object.entries(playerCounts).reduce((acc, entry) => entry[1] > acc[1] ? entry : acc, ["", 0])[0];
    const newTopPlayer = champion.players.find(player => player.riotId === newTopPlayerId);
    if (newTopPlayer) {
      setTopPlayer(newTopPlayer);
    }

    if (totalGames === 0) return;

    const newPickRate = Math.min(Math.round((champion.count / totalGames) * 100), 100);
    setPickRate(newPickRate + '%');
  }, [champion, totalGames]);

  return (
    <div className='flex items-center justify-between gap-3 p-6 w-ful rounded-3xl bg-dark-blue'>
      <div className='flex items-center w-1/2 gap-6'>
        <div className='flex flex-col gap-1'>
          <span className='text-xl text-white/40'>pick rate</span>
          <span className='font-serif text-5xl font-bold leading-none text-white'>{pickRate}</span>
        </div>
        <img src={getChampionImageFromName(champion.championName)} alt={champion.championName} className='w-16 h-16' />
        <div className='flex flex-col gap-1'>
          <h2 className='font-serif text-3xl font-semibold leading-none text-gold'>{champion.championName}</h2>
          {championData.current && <span className='text-white/40'>{championData.current.title}</span>}
        </div>
      </div>
      <div className='flex items-center justify-between w-1/2 gap-6'>
        <div className='flex items-center gap-6'>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-white/40'>matches</span>
            <span className='font-serif text-3xl font-bold leading-none text-white'>{champion.count}</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-white/40'>total kills</span>
            <span className='font-serif text-3xl font-bold leading-none text-white'>{totalKills}</span>
          </div>
        </div>
        <div className='flex flex-col items-end gap-1'>
          <span className='text-white/40'>top player</span>
          {topPlayer ?
            <a href={`/summoner/${topPlayer.riotIdGameName}/${topPlayer.riotIdTagLine}`} className='text-xl leading-none text-white transition-colors border-b border-transparent hover:text-gold hover:border-gold'>
              {topPlayer.riotIdGameName}
            </a>
            :
            <span className='text-xl leading-none text-white'>-</span>
          }
        </div>
      </div>
    </div>
  )
}
