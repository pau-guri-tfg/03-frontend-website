import { useContext } from "react";
import GameTimeline from "../components/GameTimeline";
import { DataContext } from "../DataReceiver";
import PlayerComparison from "../components/PlayerComparison";
import GameStats from "../components/GameStats";

export default function Home() {
  const { events, players, gamedata } = useContext(DataContext);

  return (
    <main className="container pt-14">
      {gamedata && players ?
        <>
          {events && players && gamedata &&
            <>
              <GameStats players={players} gamedata={gamedata} events={events} />
              <GameTimeline events={events} players={players} gameTime={gamedata.gameTime} />
            </>
          }
          {players && <PlayerComparison players={players} />}
        </>
        :
        <p>No game data available</p>
      }
    </main>
  )
}
