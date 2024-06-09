import React, { useEffect, useState } from 'react'
import { fetchGameEndpoint, fetchPlayerGames } from '../utils/database';

export default function GameList({ summonerId }: { summonerId?: string }) {

  const [games, setGames] = useState<{ gameData: GameData, players: GamePlayer[], events: GameEvent[] }[]>([]);

  useEffect(() => {
    if (summonerId) {
      // fetch the player data for the corresponding summonerId, and then fill the rest of the data

    } else {
      // fetch all games, starting with gamedata and then the corresponding players and events

    }
  }, []);

  return (
    <div className='container'>

    </div>
  )
}
