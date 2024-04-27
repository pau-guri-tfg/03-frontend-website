import { useEffect } from 'react';
import './App.css'
import GameTimeline from './components/GameTimeline';
import Events from "./sample_data/events.json";
import { GameEvent } from './@types/types';
import { useDataReceiver } from './useDataReceiver';

function App() {
  const { gamedata, players, events } = useDataReceiver();

  if (gamedata === null || players === null || events === null) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main>
      <GameTimeline events={Events.Events as GameEvent[]} players={[]} gameTime={1363} />
    </main>
  )
}

export default App