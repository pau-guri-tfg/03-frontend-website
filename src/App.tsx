import { useEffect } from 'react';
import './App.css'

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

    </main>
  )
}

export default App
