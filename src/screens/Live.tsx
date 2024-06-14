import { useContext, useEffect, useRef, useState } from "react";
import GameTimeline from "../partials/GameTimeline";
import { DataContext } from "../PublicWrapper";
import PlayerList from "../partials/PlayerList";
import LiveGameStats from "../partials/LiveGameStats";
import Loader from "../components/Loader";
import { registerVisit } from "../utils/visitorsDatabase";

export default function Live() {
  const { events, players, gamedata, lastUpdate } = useContext(DataContext);

  const [waitingForData, setWaitingForData] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setWaitingForData(false);
    }, 7000);
  }, []);

  // visitor tracking
  const visitRegistered = useRef(false);
  useEffect(() => {
    if (!gamedata || visitRegistered.current) return;

    registerVisit({
      screen: "live",
      timestamp: Date.now(),
      gameId: gamedata.gameId
    });
    visitRegistered.current = true;
  }, [gamedata]);

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
        <div className='container'>
          <div className='w-full max-w-[700px] mx-auto rounded-3xl bg-dark-blue p-6 flex flex-col items-center gap-6 shadow-big shadow-purple/30'>
            <h1 className="font-serif text-3xl font-semibold text-gold">{waitingForData ? "Waiting for data..." : "Nothing here..."}</h1>
            <Loader />
            <p className="text-lg">{waitingForData ? "Connecting to the live match server. Please wait." : "Looks like there are no live matches right now. Please check back later."}</p>
          </div>
        </div>
      }
    </main>
  )
}
