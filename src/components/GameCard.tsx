import { useEffect, useState } from 'react'
import { formatDateTime, formatDuration } from '../utils/timeFormatter';
import GameTimeline from '../partials/GameTimeline';

export default function GameCard({ gamedata, players, events }: { players: GamePlayer[], gamedata: GameData, events: GameEvent[] }) {
  const [globalScore, setGlobalScore] = useState<[number, number]>([0, 0]);
  const [formattedStartTime, setFormattedStartTime] = useState<string>("");
  const [formatedGameTime, setFormatedGameTime] = useState<string>("");

  useEffect(() => {
    if (!players || players.length === 0) return;

    const blueTeamScore = players.filter(player => player.team === "ORDER").reduce((acc, player) => acc + player.scores.kills, 0);
    const redTeamScore = players.filter(player => player.team === "CHAOS").reduce((acc, player) => acc + player.scores.kills, 0);
    setGlobalScore([blueTeamScore, redTeamScore]);
  }, [players]);

  useEffect(() => {
    if (!gamedata) return;

    setFormattedStartTime(formatDateTime(gamedata.gameStartTime));
    setFormatedGameTime(formatDuration(gamedata.gameTime));
  }, [gamedata]);

  return (
    <div className='flex flex-col w-full max-w-[1200px] gap-3 p-6 mx-auto rounded-3xl bg-dark-blue'>
      <div className='grid items-center w-full grid-cols-3 gap-6'>
        <h2 className='font-serif text-2xl font-semibold capitalize text-gold'>{gamedata.gameMode.toLowerCase()}</h2>
        <div className='flex justify-center items-center gap-2.5'>
          <span className='font-serif text-5xl font-bold leading-none text-riot-blue'>{globalScore[0]}</span>
          <span className='text-lg leading-none text-white/40'>vs</span>
          <span className='font-serif text-5xl font-bold leading-none text-riot-red'>{globalScore[1]}</span>
        </div>
        <div className='flex flex-col items-end'>
          <span className='font-serif text-xl font-bold'>{formatedGameTime}</span>
          <span className='text-right text-white/40'>{formattedStartTime}</span>
        </div>
      </div>
      {events && <GameTimeline events={events} players={players} gameTime={gamedata.gameTime} />}
    </div>
  )
}
