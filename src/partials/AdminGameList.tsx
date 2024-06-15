import React, { createRef, useEffect, useState } from 'react'
import { fetchLiveVisitsByGame } from '../utils/visitorsDatabase';
import AdminGameCard from '../components/AdminGameCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

export default function AdminGameList() {
  const [liveGames, setLiveGames] = useState<Visitors.GameVisitGroup[]>([]);
  const updateIcon = createRef<HTMLButtonElement>();

  useEffect(() => {
    updateVisits();
  }, []);

  const updateVisits = () => {
    fetchLiveVisitsByGame("all", 10)
      .then((res) => setLiveGames(res.data))

    // rotate update icon
    if (updateIcon.current) {
      gsap.to(updateIcon.current, { rotation: '+=360', duration: 0.5 })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className='flex items-center justify-between gap-4'>
        <h2 className="text-3xl font-semibold">Most visited matches</h2>
        <button ref={updateIcon} onClick={updateVisits}>
          <FontAwesomeIcon icon={faRotate} title='Refresh data' />
        </button>
      </div>
      <div className='flex flex-col w-full gap-1'>
        {liveGames.map((game, index) => <AdminGameCard key={index} gameVisitGroup={game} />)}
      </div>
    </div>
  )
}
