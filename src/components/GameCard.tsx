import { useEffect, useRef, useState } from 'react'
import { formatDateTime, formatDuration } from '../utils/timeFormatter';
import GameTimeline from '../partials/GameTimeline';
import useTeamScore from '../utils/useTeamScore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PlayerList from '../partials/PlayerList';
import getWinningTeam from '../utils/getWinningTeam';
import useExpandable from '../utils/useExpandable';

export default function GameCard({ gamedata, players, events }: { players: GamePlayer[], gamedata: GameData, events: GameEvent[] }) {
  const { expandable, expandableChevron, setIsExpanded } = useExpandable();
  const { orderScore, chaosScore } = useTeamScore(players);
  const [formattedStartTime, setFormattedStartTime] = useState<string>("");
  const [formatedGameTime, setFormatedGameTime] = useState<string>("");
  const [winningTeam, setWinningTeam] = useState<GameTeamName | null>(null);

  useEffect(() => {
    if (!gamedata) return;

    setFormattedStartTime(formatDateTime(gamedata.gameStartTime));
    setFormatedGameTime(formatDuration(gamedata.gameTime));
  }, [gamedata]);

  useEffect(() => {
    if (!events || !players) return;

    const gameEndEvent = events.find(event => event.EventName === "GameEnd");
    if (gameEndEvent && gameEndEvent.Result) {
      setWinningTeam(getWinningTeam(gameEndEvent.Result, players));
    }
  }, [events, players]);

  return (
    <div className='flex flex-col p-6 w-ful rounded-3xl bg-dark-blue'>
      <div onClick={() => setIsExpanded((oldIsExpanded) => !oldIsExpanded)} className='grid items-center w-full grid-cols-3 gap-6 cursor-pointer select-none group'>
        <div className='flex items-center gap-6'>
          <div className='flex flex-col'>
            <h2 className='font-serif text-3xl font-semibold capitalize text-gold'>{gamedata.gameMode.toLowerCase()}</h2>
            <span className='text-xs text-white/20'>ID: {gamedata.gameId}</span>
          </div>
          <FontAwesomeIcon ref={expandableChevron} icon={faChevronDown} className='w-6 h-6 text-white transition-colors group-hover:text-gold' />
        </div>
        <div className='flex justify-center items-center gap-2.5'>
          <span className={'font-serif text-5xl font-bold leading-none text-riot-blue' + (winningTeam && winningTeam === "CHAOS" ? ' opacity-40' : '')}>{orderScore}</span>
          <span className='text-lg leading-none text-white/40'>vs</span>
          <span className={'font-serif text-5xl font-bold leading-none text-riot-red' + (winningTeam && winningTeam === "ORDER" ? ' opacity-40' : '')}>{chaosScore}</span>
        </div>
        <div className='flex flex-col items-end'>
          <span className='font-serif text-xl font-bold'>{formatedGameTime}</span>
          <span className='text-right text-white/40'>{formattedStartTime}</span>
        </div>
      </div>
      <div ref={expandable} className='w-full h-0 overflow-hidden'>
        <div className='flex flex-col w-full gap-6 pt-3'>
          {events && <GameTimeline events={events} players={players} gameTime={gamedata.gameTime} />}
          {players && <PlayerList players={players} />}
        </div>
      </div>
    </div>
  )
}
