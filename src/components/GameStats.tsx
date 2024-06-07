import React, { useEffect, useState } from 'react'

export default function GameStats({ players, gamedata, events }: { players: GamePlayer[], gamedata: GameData, events: GameEvent[] }) {
  const [globalScore, setGlobalScore] = useState<[number, number]>([0, 0]);
  const [globalTurretScore, setGlobalTurretScore] = useState<[number, number]>([0, 0]);
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

    const date = new Date(gamedata.gameStartTime);
    //const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setFormattedStartTime(`${formattedTime}`);

    const gameMinutes = Math.floor(gamedata.gameTime / 60);
    const gameSeconds = Math.floor(gamedata.gameTime % 60);
    setFormatedGameTime(`${gameMinutes}:${gameSeconds}`);
  }, [gamedata]);

  return (
    <div className='w-full max-w-[700px] mx-auto rounded-3xl bg-dark-blue p-6 flex flex-col gap-3'>
      <div className='flex items-center justify-between w-full gap-6'>
        <div className='flex items-center gap-6'>
          <h1 className='font-serif text-5xl font-semibold capitalize text-gold'>{gamedata.gameMode.toLowerCase()}</h1>
          <div className='flex items-center gap-2.5 border border-purple rounded-full p-3'>
            <div className='w-3 h-3 rounded-full bg-purple' />
            <span className='leading-none uppercase text-purple'>LIVE</span>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <span className='font-serif text-2xl font-semibold'>{formatedGameTime}</span>
          <span className='text-white/40'>started at {formattedStartTime}</span>
        </div>
      </div>
    </div>
  )
}
