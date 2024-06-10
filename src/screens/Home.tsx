import { useContext } from "react";
import GameTimeline from "../partials/GameTimeline";
import { DataContext } from "../DataReceiver";
import PlayerList from "../partials/PlayerList";
import LiveGameStats from "../components/LiveGameStats";

export default function Home() {
  const { events, players, gamedata, lastUpdate } = useContext(DataContext);

  return (
    <main className="flex flex-col gap-8 py-14">
      {gamedata && players ?
        <>
          {events && players && gamedata &&
            <>
              <div className="container">
                <LiveGameStats players={players} gamedata={gamedata} events={events} lastUpdate={lastUpdate} />
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
