import React, { useEffect, useState } from 'react'
import { fetchLiveVisitsByGame } from '../utils/visitorsDatabase';
import AdminGameCard from '../components/AdminGameCard';

export default function AdminGameList() {
  const [liveGames, setLiveGames] = useState<Visitors.GameVisitGroup[]>([]);

  useEffect(() => {
    fetchLiveVisitsByGame("all", 10)
      .then((res) => setLiveGames(res.data))
  }, []);

  return (
    <div className='flex flex-col w-full gap-1'>
      {liveGames.map((game, index) => <AdminGameCard key={index} gameVisitGroup={game} />)}
    </div>
  )
}
