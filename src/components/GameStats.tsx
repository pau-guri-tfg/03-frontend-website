import React, { useEffect, useState } from 'react'
import BlueTurret from '../assets/timeline-icons/tower-blue.png';
import RedTurret from '../assets/timeline-icons/tower-red.png';
import identifyBuilding from '../utils/identifyBuilding';
import { formatDate, formatDuration, formatTime } from '../utils/timeFormatter';

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

    setFormattedStartTime(formatTime(gamedata.gameStartTime));

    setFormatedGameTime(formatDuration(gamedata.gameTime));
  }, [gamedata]);

  useEffect(() => {
    if (!events || events.length === 0) return;

    const blueTurretKills = events.filter(event => event.EventName === "TurretKilled" && identifyBuilding(event.TurretKilled as string)?.team === "CHAOS").length;
    const redTurretKills = events.filter(event => event.EventName === "TurretKilled" && identifyBuilding(event.TurretKilled as string)?.team === "ORDER").length;
    setGlobalTurretScore([blueTurretKills, redTurretKills]);
  }, [events]);

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
          <span className='font-serif text-2xl font-bold'>{formatedGameTime}</span>
          <span className='text-white/40'>started at {formattedStartTime}</span>
        </div>
      </div>
      <div className='flex items-center justify-between gap-3 w-full max-w-[400px] mx-auto'>
        <div className='flex items-center gap-1'>
          <img src={BlueTurret} alt='blue-turret' className='w-9 h-9' />
          <span className='font-serif text-2xl font-bold leading-none'>{globalTurretScore[0]}</span>
        </div>
        <div className='flex items-center gap-2.5'>
          <span
            className='font-serif text-6xl font-bold leading-none text-riot-blue'
            style={{ textShadow: globalScore[0] > globalScore[1] ? "0px 4px 20px #0096A8AA" : "none" }}
          >{globalScore[0]}</span>
          <span className='text-xl leading-none text-white/40'>vs</span>
          <span
            className='font-serif text-6xl font-bold leading-none text-riot-red'
            style={{ textShadow: globalScore[1] > globalScore[0] ? "0px 4px 20px #C62139AA" : "none" }}
          >{globalScore[1]}</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className='font-serif text-2xl font-bold leading-none'>{globalTurretScore[1]}</span>
          <img src={RedTurret} alt='blue-turret' className='w-9 h-9' />
        </div>
      </div>
    </div>
  )
}
