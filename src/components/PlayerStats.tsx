import React, { useState } from 'react'
import useTeams from '../utils/useTeams';
import { getChampionImage } from '../utils/datadragon';
import PlayerCard from './PlayerCard';

export default function PlayerStats({ players }: { players: GamePlayer[] }) {
  const { orderPlayers, chaosPlayers } = useTeams({ players });

  return (
    <div className='container flex flex-col gap-1 lg:flex-row'>
      <div className='flex flex-col w-full gap-1'>
        {orderPlayers.map(player => <PlayerCard key={player.riotId} player={player} />)}
      </div>
      <div className='flex flex-col w-full gap-1'>
        {chaosPlayers.map(player => <PlayerCard key={player.riotId} player={player} />)}
      </div>
    </div>
  )
}