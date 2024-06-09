import { useContext } from "react";
import GameTimeline from "../partials/GameTimeline";
import { DataContext } from "../DataReceiver";
import PlayerComparison from "../partials/PlayerComparison";
import GameStats from "../components/GameStats";
import PlayerList from "../partials/PlayerList";

export default function Home() {
  const { events, players, gamedata } = useContext(DataContext);

  return (
    <main className="flex flex-col gap-8 py-14">
      {gamedata && players ?
        <>
          {events && players && gamedata &&
            <>
              <div className="container">
                <GameStats players={players} gamedata={gamedata} events={events} />
              </div>
              <GameTimeline events={events} players={players} gameTime={gamedata.gameTime} />
            </>
          }
          {players && <PlayerList players={players} />}
        </>
        :
        <p>No game data available</p>
      }
    </main>
  )
}
