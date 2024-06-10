import { useContext } from "react";
import GameTimeline from "../partials/GameTimeline";
import { DataContext } from "../DataReceiver";
import PlayerList from "../partials/PlayerList";
import LiveGameStats from "../partials/LiveGameStats";

export default function Home() {
  const { events, players, gamedata, lastUpdate } = useContext(DataContext);

  return (
    <main className="flex flex-col gap-8 py-14">
      {gamedata && players ?
        <>
          {events && players && gamedata && <>
            <LiveGameStats players={players} gamedata={gamedata} events={events} lastUpdate={lastUpdate} />
            <GameTimeline container title="Timeline" events={events} players={players} gameTime={gamedata.gameTime} />
          </>}
          {players && <PlayerList container players={players} />}
        </>
        :
        <p>No game data available</p>
      }
    </main>
  )
}
