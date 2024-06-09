import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useTeams from '../utils/useTeams';

type ChartData = {
  name: string;
  tooltipText: string;
  value: number;
}[];

export default function PlayerComparison({ players }: { players: GamePlayer[] }) {
  const { orderPlayers, chaosPlayers } = useTeams({ players });

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const [killsData, setKillsData] = useState<ChartData>([]);
  const [deathsData, setDeathsData] = useState<ChartData>([]);
  const [assistsData, setAssistsData] = useState<ChartData>([]);

  useEffect(() => {
    updateData();
  }, [selectedPlayers]);

  const handleSelectPlayer = (riotId?: string | null) => {
    if (!riotId) return;

    if (selectedPlayers.findIndex(selectedPlayer => selectedPlayer === riotId) !== -1) {
      setSelectedPlayers(selectedPlayers.filter(selectedPlayer => selectedPlayer !== riotId));
    } else {
      setSelectedPlayers([...selectedPlayers, riotId]);
    }
  }

  const updateData = () => {
    let killData: ChartData = [];
    let deathData: ChartData = [];
    let assistData: ChartData = [];

    selectedPlayers.map(riotId => {
      const player = players.find(player => player.riotId === riotId);
      if (!player) return;

      killData.push({ name: player.riotIdGameName, value: player.scores.kills, tooltipText: "kills" });
      deathData.push({ name: player.riotIdGameName, value: player.scores.deaths, tooltipText: "deaths" });
      assistData.push({ name: player.riotIdGameName, value: player.scores.assists, tooltipText: "assists" });
    });

    setDeathsData(deathData);
    setKillsData(killData);
    setAssistsData(assistData);
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
            <BarChart layout='vertical' data={killsData}>
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
            <BarChart layout='vertical' data={deathsData}>
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
            <BarChart layout='vertical' data={assistsData}>
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
                  <div data-riot-id={orderPlayers[index].riotId} onClick={(event) => handleSelectPlayer(event.currentTarget.getAttribute('data-riot-id'))}>
                    {orderPlayers[index].riotIdGameName}
                  </div>
                )}
              </div>
              <div className='flex flex-col'>
                {chaosPlayers[index] && (
                  <div data-riot-id={chaosPlayers[index].riotId} onClick={(event) => handleSelectPlayer(event.currentTarget.getAttribute('data-riot-id'))}>
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