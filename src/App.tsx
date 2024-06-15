import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './screens/Home';
import Matches from './screens/Matches';
import Champions from './screens/Champions';
import Summoner from './screens/Summoner';
import AdminHome from './screens/AdminHome';
import AdminLive from './screens/AdminLive';
import AdminMatches from './screens/AdminMatches';
import AdminChampions from './screens/AdminChampions';
import moment from 'moment';
import AdminSummoner from './screens/AdminSummoner';

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
    },
    {
      path: '/admin',
      element: <AdminHome />,
    },
    {
      path: '/admin/live',
      element: <AdminLive />,
    },
    {
      path: '/admin/matches',
      element: <AdminMatches />,
    },
    {
      path: '/admin/champions',
      element: <AdminChampions />,
    },
    {
      path: '/admin/summoner',
      element: <AdminSummoner />,
    }
  ])

  moment.locale('en');
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '%d seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      w: 'a week',
      ww: '%d weeks',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    }
  });

  return (
    <RouterProvider router={router} />
  )
}

export default App