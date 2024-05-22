import './App.css'
import GameTimeline from './components/GameTimeline';
import { DataReceiver } from './DataReceiver';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './screens/Home';
import Matches from './screens/Matches';
import Champions from './screens/Champions';
import Summoner from './screens/Summoner';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/matches',
      element: <Matches />,
    },
    {
      path: '/champions',
      element: <Champions />,
    },
    {
      path: '/summoner/:gameName/:tagLine',
      element: <Summoner />,
    }
  ])

  return (
    <DataReceiver>
      <RouterProvider router={router} />
      {/* <main>
        <GameTimeline events={Events.Events as GameEvent[]} players={[]} gameTime={1363} />
      </main> */}
    </DataReceiver>
  )
}

export default App