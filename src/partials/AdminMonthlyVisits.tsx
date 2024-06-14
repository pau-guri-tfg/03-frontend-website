import moment from 'moment';
import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminChartTooltip from '../components/AdminChartTooltip';

type ChartData = {
  name: string;
  tooltipText: string;
  visits: number;
}[];

export default function AdminMonthlyVisits({ visitGroups }: { visitGroups: Visitors.VisitGroup[] }) {
  const [visits, setVisits] = useState<ChartData>([]);

  useEffect(() => {
    if (visitGroups.length === 0) return;

    const currentMoment = moment();
    let month = [];
    for (let i = 30; i >= 0; i--) {
      const currentDay = moment(currentMoment).subtract(i, "days");
      const visits = visitGroups.find((visit: Visitors.VisitGroup) => moment(visit.timestamp).isSame(currentDay, "day"))?.count || 0;
      month.push({ name: currentDay.format("MMM D"), visits, tooltipText: currentDay.format("MMMM D, YYYY") });
    }
    setVisits(month);
  }, [visitGroups]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Last month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={visits}>
          <Tooltip content={<AdminChartTooltip />} />
          <XAxis dataKey="name" />
          <YAxis dataKey="visits" />
          <Bar dataKey="visits" fill="#1A1A1A" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
