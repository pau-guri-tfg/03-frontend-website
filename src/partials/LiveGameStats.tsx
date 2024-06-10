import { useEffect, useState } from 'react'
import BlueTurret from '../assets/timeline-icons/tower-blue.png';
import RedTurret from '../assets/timeline-icons/tower-red.png';
import identifyBuilding from '../utils/identifyBuilding';
import { formatDuration, formatTime } from '../utils/timeFormatter';
import Flasher from '../components/Flasher';
import LiveLabel from '../components/LiveLabel';
import useTeamScore from '../utils/useTeamScore';

export default function LiveGameStats({ players, gamedata, events, lastUpdate }: { players: GamePlayer[], gamedata: GameData, events: GameEvent[], lastUpdate: number }) {
  const { orderScore, chaosScore } = useTeamScore(players);
  const [globalTurretScore, setGlobalTurretScore] = useState<[number, number]>([0, 0]);
  const [formattedStartTime, setFormattedStartTime] = useState<string>("");
  const [formatedGameTime, setFormatedGameTime] = useState<string>("");

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
    <div className='container'>
      <div className='w-full max-w-[700px] mx-auto rounded-3xl bg-dark-blue p-6 flex flex-col gap-3'>
        <div className='flex items-center justify-between w-full gap-6'>
          <div className='flex items-center gap-6'>
            <h1 className='font-serif text-5xl font-semibold capitalize text-gold'>{gamedata.gameMode.toLowerCase()}</h1>
            <LiveLabel updateTime={lastUpdate} />
          </div>
          <div className='flex flex-col items-end'>
            <span className='font-serif text-2xl font-bold'>{formatedGameTime}</span>
            <span className='text-right text-white/40'>started at {formattedStartTime}</span>
          </div>
        </div>
        <div className='flex items-center justify-between gap-3 w-full max-w-[400px] mx-auto'>
          <div className='flex items-center gap-1'>
            <img src={BlueTurret} alt='blue-turret' className='w-9 h-9' />
            <Flasher className='font-serif text-2xl font-bold leading-none'>{globalTurretScore[0]}</Flasher>
          </div>
          <div className='flex items-center gap-2.5'>
            <Flasher className='font-serif text-6xl font-bold leading-none text-riot-blue' flashColor='#0096A8'>{orderScore}</Flasher>
            <span className='text-xl leading-none text-white/40'>vs</span>
            <Flasher className='font-serif text-6xl font-bold leading-none text-riot-red' flashColor='#C62139'>{chaosScore}</Flasher>
          </div>
          <div className='flex items-center gap-1'>
            <Flasher className='font-serif text-2xl font-bold leading-none'>{globalTurretScore[1]}</Flasher>
            <img src={RedTurret} alt='blue-turret' className='w-9 h-9' />
          </div>
        </div>
      </div>
    </div>
  )
}
