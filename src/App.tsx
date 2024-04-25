import { useEffect } from 'react';
import './App.css'
import GameTimeline from './components/GameTimeline';
import Events from "./sample_data/events.json";
import { GameEvent } from './@types/types';

function App() {
  useEffect(() => {
    const url: string = import.meta.env.VITE_EVENT_STREAM_URL;
    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
      console.log(event);
    }
  }, []);

  return (
    <main>
      <GameTimeline events={Events.Events as GameEvent[]} players={[]} gameTime={1363} />
    </main>
  )
}

export default App