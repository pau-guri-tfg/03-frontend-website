import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getChampionImageFromName, getItemImage, getSpellImage } from '../utils/datadragon';
import Flasher from './Flasher';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function PlayerCard({ player, boxed = false }: { player: GamePlayer, boxed?: boolean }) {
  const wardItem = player.items.find(item => item.slot === 6);

  return (
    <a
      {...(!player.isBot && player.riotId ? { href: `/summoner/${player.riotIdGameName}/${player.riotIdTagLine}` } : {})}
      className={'flex items-center justify-between gap-3' + (boxed ? " px-6 py-3 rounded-3xl bg-dark-blue" : "") + (!player.isBot && player.riotId ? " cursor-pointer group" : "")}
    >
      <div className='flex items-center w-1/4 gap-3'>
        <Flasher className={'relative shrink-0 w-10 h-10 border' + (player.team === "ORDER" ? " border-riot-blue" : " border-riot-red")} shadowType='box' customTrigger={[player.isDead]}>
          {player.isDead && <div className='absolute inset-0 flex items-center justify-center bg-black/80'>
            <span className='font-serif text-xl font-bold text-red-600'>{Math.ceil(player.respawnTimer)}</span>
          </div>}
          <img src={getChampionImageFromName(player.championName)} title={player.championName} className="w-full h-full" />
          <div className='absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 translate-x-1/2 translate-y-1/2 rounded-full bg-dark-blue'>
            <Flasher className='pt-1 font-serif text-xs font-bold'>{player.level}</Flasher>
          </div>
        </Flasher>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2 w-fit'>
            <h3 className='text-lg leading-none transition-colors border-b border-transparent group-hover:border-gold group-hover:text-gold'>{player.riotId ? player.riotIdGameName : player.summonerName}</h3>
            {player.isBot && <FontAwesomeIcon icon={faRobot} title="Bot" className='w-3 h-3 text-white/40' />}
          </div>
          <span className='text-sm leading-none text-white/40'>{player.championName}</span>
        </div>
      </div>
      <div className='flex items-center gap-1 font-serif text-lg shrink-0 w-fit'>
        <Flasher className='font-bold'>{player.scores.kills}</Flasher>
        <span>/</span>
        <Flasher className='font-bold'>{player.scores.deaths}</Flasher>
        <span>/</span>
        <Flasher className='font-bold'>{player.scores.assists}</Flasher>
      </div>

      <div className='flex items-center gap-3 shrink-0'>
        <div className='flex flex-col items-center gap-1'>
          <span className='text-sm text-white/40'>CS</span>
          <Flasher className='font-serif text-lg font-bold leading-none'>{player.scores.creepScore}</Flasher>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <span className='text-sm text-white/40'>VS</span>
          <Flasher className='font-serif text-lg font-bold leading-none'>{Math.round(player.scores.wardScore)}</Flasher>
        </div>
      </div>

      <div className='flex items-center gap-3 shrink-0'>
        <div className='flex flex-col items-center gap-1'>
          <div className='w-6 h-6'>
            <img src={getSpellImage(player.summonerSpells.summonerSpellOne.displayName)} title={player.summonerSpells.summonerSpellOne.displayName} className='w-full h-full' />
          </div>
          <div className='w-6 h-6'>
            <img src={getSpellImage(player.summonerSpells.summonerSpellTwo.displayName)} title={player.summonerSpells.summonerSpellTwo.displayName} className='w-full h-full' />
          </div>
        </div>
        <div className='flex gap-1'>
          <div className='grid grid-cols-3 gap-1'>
            {Array.from({ length: 6 }).map((_, index) => {
              const item = player.items.find(item => item.slot === index);
              return (
                <div key={index} className='w-6 h-6 border border-white/40'>
                  {item && <img src={getItemImage(item.itemID)} title={item.displayName} className='w-full h-full' />}
                </div>
              )
            })}
          </div>
          <div className='w-6 h-6 border border-white/40'>
            {wardItem && <img src={getItemImage(wardItem.itemID)} title={wardItem.displayName} className='w-full h-full' />}
          </div>
        </div>
      </div>
    </a>
  )
}
