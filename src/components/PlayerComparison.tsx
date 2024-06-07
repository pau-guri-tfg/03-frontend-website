import React, { MouseEventHandler, useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ChartData = {
  name: string;
  [key: string]: any;
}[];

export default function PlayerComparison({ players }: { players: GamePlayer[] }) {
  const [orderPlayers, setOrderPlayers] = useState<GamePlayer[]>([]);
  const [chaosPlayers, setChaosPlayers] = useState<GamePlayer[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<GamePlayer[]>([]);

  useEffect(() => {
    const orderPlayers = players.filter(player => player.team === "ORDER");
    const chaosPlayers = players.filter(player => player.team === "CHAOS");

    setOrderPlayers(orderPlayers);
    setChaosPlayers(chaosPlayers);
  }, [players]);

  const handleSelectPlayer = (player: GamePlayer) => {

    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter(selectedPlayer => selectedPlayer !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  }

  const getSelectedPlayerData = (): ChartData => {
    let data: ChartData = [{ name: 'Kills' }, { name: 'Deaths' }, { name: 'Assists' }];

    selectedPlayers.map(player => {
      data[0][player.riotIdGameName] = player.scores.kills;
      data[1][player.riotIdGameName] = player.scores.deaths;
      data[2][player.riotIdGameName] = player.scores.assists;
    });

    return data;
  }

  useEffect(() => {
    console.log(selectedPlayers);
  }, [selectedPlayers]);

  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={getSelectedPlayerData()}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          {selectedPlayers.map(player => (
            <Bar key={player.riotIdGameName} dataKey={player.riotIdGameName} fill={player.team === 'ORDER' ? '#1a78ae' : '#d32f2f'} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className='flex flex-col'>
        {Array.from({ length: Math.max(orderPlayers.length, chaosPlayers.length) }).map((_, index) => {
          return (
            <div key={index} className='flex'>
              <div className='flex flex-col'>
                {orderPlayers[index] && (
                  <div data-index={index} onClick={(event) => handleSelectPlayer(orderPlayers[parseInt(event.currentTarget.getAttribute('data-index') ?? '0')])}>
                    {orderPlayers[index].riotIdGameName}
                  </div>
                )}
              </div>
              <div className='flex flex-col'>
                {chaosPlayers[index] && (
                  <div data-index={index} onClick={(event) => handleSelectPlayer(chaosPlayers[parseInt(event.currentTarget.getAttribute('data-index') ?? '0')])}>
                    <p>{chaosPlayers[index].riotIdGameName}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div >
  )
}
