import React, { MouseEventHandler, useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';
import { ValueType } from 'tailwindcss/types/config';

type ChartData = {
  name: string;
  tooltipText: string;
  value: number;
}[];

export default function PlayerComparison({ players }: { players: GamePlayer[] }) {
  const [orderPlayers, setOrderPlayers] = useState<GamePlayer[]>([]);
  const [chaosPlayers, setChaosPlayers] = useState<GamePlayer[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<GamePlayer[]>([]);

  // const [deathsData, setDeathsData] = useState<ChartData>([]);
  // const [killsData, setKillsData] = useState<ChartData>([]);
  // const [assistsData, setAssistsData] = useState<ChartData>([]);

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

  const getPlayerKills = (): ChartData => {
    let data: ChartData = [];
    selectedPlayers.map(player => {
      data.push({ name: player.riotIdGameName, value: player.scores.kills, tooltipText: "kills" });
    });
    return data;
  }
  const getPlayerDeaths = (): ChartData => {
    let data: ChartData = [];
    selectedPlayers.map(player => {
      data.push({ name: player.riotIdGameName, value: player.scores.deaths, tooltipText: "deaths" });
    });
    return data;
  }
  const getPlayerAssists = (): ChartData => {
    let data: ChartData = [];
    selectedPlayers.map(player => {
      data.push({ name: player.riotIdGameName, value: player.scores.assists, tooltipText: "assists" });
    });
    return data;
  }
  // const getPlayerCreepScore = (): ChartData => {
  //   let data: ChartData = [];
  //   selectedPlayers.map(player => {
  //     data.push({ name: player.riotIdGameName, value: player.scores.creepScore, tooltipText: "creep score" });
  //   });
  //   return data;
  // }
  // const getPlayerWardScore = (): ChartData => {
  //   let data: ChartData = [];
  //   selectedPlayers.map(player => {
  //     data.push({ name: player.riotIdGameName, value: player.scores.wardScore, tooltipText: "ward score" });
  //   });
  //   return data;
  // }

  useEffect(() => {
    console.log(selectedPlayers);
  }, [selectedPlayers]);

  return (
    <div className='container flex flex-col gap-3'>
      <h2 className="py-2 font-serif text-3xl font-semibold leading-none">Summoner stats</h2>
      <div className='flex flex-wrap justify-center'>
        <div className='w-1/3 px-3 min-w-[400px] flex flex-col'>
          <h3 className='font-sans text-xl text-gold'>Kills</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout='vertical' data={getPlayerKills()}>
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={"value"} className="fill-gold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='w-1/3 px-3 min-w-[400px] flex flex-col'>
          <h3 className='font-sans text-xl text-gold'>Deaths</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout='vertical' data={getPlayerDeaths()}>
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={"value"} className="fill-gold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='w-1/3 px-3 min-w-[400px] flex flex-col'>
          <h3 className='font-sans text-xl text-gold'>Assists</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout='vertical' data={getPlayerAssists()}>
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={"value"} className="fill-gold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* <ResponsiveContainer width='20%' minWidth={400} height={250} >
          <BarChart layout='vertical' data={getPlayerCreepScore()}>
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={"value"} className="fill-gold" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width='20%' minWidth={400} height={250} >
          <BarChart layout='vertical' data={getPlayerWardScore()}>
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={"value"} className="fill-gold" />
          </BarChart>
        </ResponsiveContainer> */}
      </div>
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
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex gap-3 p-3 bg-dark-blue rounded-3xl">
        <span className="label text-white/40">{label}</span>
        <div>
          <span className='font-serif text-xl font-bold'>{payload[0].value}</span> <span>{payload[0].payload.tooltipText}</span>
        </div>
      </div>
    );
  }

  return null;
};