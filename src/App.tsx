import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './screens/Home';
import Matches from './screens/Matches';
import Champions from './screens/Champions';
import Summoner from './screens/Summoner';
import AdminHome from './screens/AdminHome';

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
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App