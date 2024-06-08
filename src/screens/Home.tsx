import { useContext } from "react";
import GameTimeline from "../components/GameTimeline";
import { DataContext } from "../DataReceiver";
import PlayerComparison from "../components/PlayerComparison";
import GameStats from "../components/GameStats";
import PlayerStats from "../components/PlayerStats";

export default function Home() {
  const { events, players, gamedata } = useContext(DataContext);

  return (
    <main className="flex flex-col gap-8 pt-14">
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
          {/* {players && <PlayerComparison players={players} />} */}
          {players && <PlayerStats players={players} />}
        </>
        :
        <p>No game data available</p>
      }
    </main>
  )
}
