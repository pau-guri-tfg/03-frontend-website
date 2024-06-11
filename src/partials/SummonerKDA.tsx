import { useEffect, useState } from 'react'
import { fetchGamesByPlayerEndpoint } from '../utils/gamesDatabase';
import { Cell, Pie, PieChart, PieLabel, ResponsiveContainer, Tooltip } from 'recharts';

type ChartData = {
  name: string,
  value: number | null,
  color: string,
  tooltipText: string,
}[];

export default function SummonerKDA({ summoner = null }: { summoner?: Riot.Summoner.SummonerDto | null }) {
  const [chartData, setChartData] = useState<ChartData>([
    { name: 'kills', value: null, color: '#0096A8', tooltipText: 'kills' },
    { name: 'deaths', value: null, color: '#C62139', tooltipText: 'deaths' },
    { name: 'assists', value: null, color: '#f97316', tooltipText: 'assists' },
  ]);

  useEffect(() => {
    if (!summoner) return;

    // fetch the kda data for the summoner
    fetchGamesByPlayerEndpoint(summoner.id, "players", 20)
      .then(res => {
        const gamePlayers: GamePlayer[] = res.data;
        let k = 0, d = 0, a = 0;
        gamePlayers.forEach(player => {
          k += player.scores.kills;
          d += player.scores.deaths;
          a += player.scores.assists;
        });
        setChartData([
          { name: 'kills', value: k, color: '#0096A8', tooltipText: 'kills' },
          { name: 'deaths', value: d, color: '#C62139', tooltipText: 'deaths' },
          { name: 'assists', value: a, color: '#f97316', tooltipText: 'assists' },
        ]);
      });
  }, [summoner])

  const RADIAN = Math.PI / 180;
  const renderCustomLabel: PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;
    return (
      <text x={x} y={y} fill="#000" fontSize={20} textAnchor={'middle'} dominantBaseline="central" pointerEvents="none">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='container flex items-center justify-between gap-6'>
      <div className='flex flex-col flex-1 gap-3'>
        <h2 className='font-serif text-3xl font-semibold text-gold'>Global stats</h2>
        <div className='flex items-center w-full justify-evenly'>
          {chartData.map((data, index) => (
            <div key={index} className='flex flex-col items-center gap-1'>
              <h3 className='text-lg'>{data.name}</h3>
              <p className='font-serif text-6xl font-bold leading-none' style={{ color: data.color }}>{data.value ?? "-"}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-52 aspect-square">
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <PieChart>
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={"100%"}
              fill="#FFFFFF"
              stroke='#0C0C1F'

              labelLine={false}
              label={renderCustomLabel}
            >
              {chartData.map((entry, index) => (
                <Cell onPointerEnter={() => console.log("Enter", entry.name)} onPointerLeave={() => console.log("Leave", entry.name)} key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="flex gap-3 p-3 bg-dark-blue rounded-3xl">
//         <span className="label text-white/40">{label}</span>
//         <div>
//           <span className='font-serif text-xl font-bold'>{payload[0].value}</span> <span>{payload[0].payload.tooltipText}</span>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };