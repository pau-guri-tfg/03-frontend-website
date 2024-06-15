import { Bar, BarChart, Brush, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import AdminChartTooltip from './AdminChartTooltip'

export default function AdminBarChart({ data }: { data: ChartData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <Tooltip content={<AdminChartTooltip />} />
        <XAxis dataKey="name" />
        <YAxis dataKey="value" />
        <Bar dataKey="value" fill="#1A1A1A" />
        <Brush dataKey="name" height={30} stroke="#1A1A1A" />
      </BarChart>
    </ResponsiveContainer>
  )
}
