import { useEffect, useState } from 'react'
import { fetchGamesByPlayerEndpoint, fetchGameEndpoint } from '../utils/gamesDatabase';
import GameCard from '../components/GameCard';

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
      fetchGameEndpoint("all", "everything", 10).then((res) => {
        console.log(res.data);
        setGames(res.data);
      });
    }
  }, []);

  return (
    <div className='container flex flex-col gap-6'>
      {title !== "" && <h2 className='font-serif text-3xl font-semibold text-gold'>{title}</h2>}
      <div className='flex flex-col w-full gap-3'>
        {games.map((game, index) => <GameCard key={index} gamedata={game.gamedata} players={game.players} events={game.events.Events} />)}
      </div>
    </div>
  )
}
