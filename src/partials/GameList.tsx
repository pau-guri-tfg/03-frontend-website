import { useEffect, useState } from 'react'
import { fetchGamesByPlayerEndpoint, fetchGameEndpoint } from '../utils/gamesDatabase';
import GameCard from '../components/GameCard';
import Loader from '../components/Loader';

export default function GameList({ title = "", summonerId }: { title?: string, summonerId?: string }) {

  const [games, setGames] = useState<EverythingDocument[]>([]);

  useEffect(() => {
    if (summonerId) {
      // fetch the player data for the corresponding summonerId, and then fill the rest of the data
      fetchGamesByPlayerEndpoint(summonerId, "everything", 5).then((res) => {
        console.log(res.data);
        setGames(res.data);
      });
    } else {
      // fetch all games, starting with gamedata and then the corresponding players and events
      fetchGameEndpoint("all", "everything", 5).then((res) => {
        console.log(res.data);
        setGames(res.data);
      });
    }
  }, []);

  return (
    <div className='container flex flex-col gap-6'>
      {title !== "" && <h2 className='font-serif text-3xl font-semibold text-gold'>{title}</h2>}
      {games.length > 0 ?
        <div className='flex flex-col w-full gap-3'>
          {games.map((game, index) => <GameCard key={index} gamedata={game.gamedata} players={game.players} events={game.events.Events} />)}
        </div>
        :
        <div className='flex items-center justify-center w-full h-40'>
          <div className="p-6 shadow-big bg-dark-blue rounded-3xl shadow-purple/30">
            <Loader />
          </div>
        </div>
      }
    </div>
  )
}
