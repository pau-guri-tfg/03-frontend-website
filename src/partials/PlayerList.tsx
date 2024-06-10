import useTeams from '../utils/useTeams';
import PlayerCard from '../components/PlayerCard';

export default function PlayerList({ players, container = false }: { players: GamePlayer[], container?: boolean }) {
  const { orderPlayers, chaosPlayers } = useTeams({ players });

  return (
    <div className={'flex flex-col lg:flex-row' + (container ? " container gap-1" : " w-full gap-6")}>
      <div className={'flex flex-col w-full' + (container ? " gap-1" : " gap-3")}>
        {orderPlayers.map((player, index) => <PlayerCard key={index} player={player} boxed={container} />)}
      </div>
      <div className={'flex flex-col w-full' + (container ? " gap-1" : " gap-3")}>
        {chaosPlayers.map((player, index) => <PlayerCard key={index} player={player} boxed={container} />)}
      </div>
    </div>
  )
}
