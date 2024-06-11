import React, { useEffect, useState } from 'react'

export default function ChampionCard({ champion, totalGames }: { champion: ChampionDocument, totalGames: number }) {
  const [pickRate, setPickRate] = useState<string>('-%');

  useEffect(() => {
    if (totalGames === 0) return;

    const newPickRate = Math.min(Math.round((champion.count / totalGames) * 100), 100);
    setPickRate(newPickRate + '%');
  }, [champion, totalGames]);

  return (
    <div className='flex items-center justify-between gap-3 p-6 w-ful rounded-3xl bg-dark-blue'>
      <div className='flex flex-col gap-1'>
        <span className='text-xl text-white/40'>pick rate</span>
        <span className='font-serif text-5xl font-bold leading-none text-white'>{pickRate}</span>
      </div>
    </div>
  )
}
