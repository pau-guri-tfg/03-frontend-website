import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../PublicWrapper'
import LiveLabel from './LiveLabel';
import { formatDuration } from '../utils/timeFormatter';
import Flasher from './Flasher';
import useTeamScore from '../utils/useTeamScore';
import getWinningTeam from '../utils/getWinningTeam';
import useExpandable from '../utils/useExpandable';
import { faChevronDown, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LiveGamePopup() {
  const { gamedata, players, events, lastUpdate } = useContext(DataContext);
  const { expandable, expandableChevron, isExpanded, setIsExpanded } = useExpandable();
  const { orderScore, chaosScore } = useTeamScore(players);
  const [winningTeam, setWinningTeam] = useState<GameTeamName | null>(null);

  useEffect(() => {
    if (!events || events.length === 0 || !players) return;

    const gameEndEvent = events.find(event => event.EventName === "GameEnd");
    if (gameEndEvent && gameEndEvent.Result) {
      setWinningTeam(getWinningTeam(gameEndEvent.Result, players));
    }
  }, [events, players]);

  if (!gamedata || !players) return null;
  return (
    <>
      <div className='w-full h-16 popup-spacer' />
      <div className={'fixed flex flex-col p-3 bottom-3 right-3 rounded-3xl bg-dark-blue shadow-big shadow-purple' + (winningTeam ? (winningTeam === "ORDER" ? ' shadow-riot-blue/60' : ' shadow-riot-red/60') : ' shadow-purple/30')}>
        <div className='flex items-center gap-6'>
          <div onClick={() => setIsExpanded((oldIsExpanded) => !oldIsExpanded)} className='flex items-center justify-between flex-1 gap-6 cursor-pointer select-none group'>
            <LiveLabel updateTime={lastUpdate} />
            <FontAwesomeIcon ref={expandableChevron} icon={faChevronDown} className='w-6 h-6 text-white transition-colors group-hover:text-gold' />
          </div>
          <a href='/' className='group'>
            <FontAwesomeIcon icon={faExternalLink} className='w-5 h-5 text-white transition-colors group-hover:text-gold' />
          </a>
        </div>
        <div ref={expandable} className='w-full h-0 overflow-hidden'>
          <div className='flex items-center justify-center w-full gap-6 pt-3'>
            <div className='flex items-center gap-2'>
              <Flasher
                className={'font-serif text-3xl font-bold leading-none text-riot-blue' + (winningTeam && winningTeam === "CHAOS" ? ' opacity-40' : '')}
                flashColor='#0096A8'>
                {orderScore}
              </Flasher>
              <span className='leading-none text-white/40'>vs</span>
              <Flasher
                className={'font-serif text-3xl font-bold leading-none text-riot-red' + (winningTeam && winningTeam === "ORDER" ? ' opacity-40' : '')}
                flashColor='#C62139'>
                {chaosScore}
              </Flasher>
            </div>
            <span className='font-serif text-lg font-bold'>{formatDuration(gamedata.gameTime)}</span>
          </div>
        </div>
      </div>
    </>
  )
}
