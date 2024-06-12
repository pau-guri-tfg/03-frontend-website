import { useEffect } from 'react';
import LiveGamePopup from '../components/LiveGamePopup'
import GameList from '../partials/GameList'
import { registerVisit } from '../utils/visitorsDatabase';

export default function Matches() {

  // visitor tracking
  useEffect(() => {
    registerVisit({
      screen: "matches",
      timestamp: Date.now()
    });
  }, []);

  return (
    <main className='flex flex-col gap-8 py-14'>
      <GameList title='Last 10 matches' limit={10} />
      <LiveGamePopup />
    </main>
  )
}
