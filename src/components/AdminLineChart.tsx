import moment from "moment"
import { ResponsiveContainer, LineChart, Tooltip, XAxis, YAxis, Line, Brush } from "recharts"
import AdminChartTooltip from "./AdminChartTooltip"

export default function AdminLineChart({ data, tickFormat }: { data: ChartData, tickFormat: string }) {
  function CustomTick({ x, y, payload }: any) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">{moment(payload.value).format(tickFormat)}</text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Tooltip content={<AdminChartTooltip />} />
        <XAxis dataKey="name" type='number' domain={['dataMin', 'dataMax']} padding={{ left: 16, right: 16 }} tick={<CustomTick />} />
        <YAxis dataKey="value" allowDecimals={false} />
        <Line dataKey="value" type="monotone" stroke="#1A1A1A" />
        <Brush dataKey="name" height={30} stroke="#1A1A1A" tickFormatter={(value) => moment(value).format(tickFormat)} />
      </LineChart>
    </ResponsiveContainer>
  )
}
