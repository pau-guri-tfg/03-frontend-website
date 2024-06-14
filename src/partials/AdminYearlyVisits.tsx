import moment from 'moment';
import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminChartTooltip from '../components/AdminChartTooltip';

type ChartData = {
  name: string;
  tooltipText: string;
  visits: number;
}[];

export default function AdminYearlyVisits({ visitGroups }: { visitGroups: Visitors.VisitGroup[] }) {
  const [visits, setVisits] = useState<ChartData>([]);

  useEffect(() => {
    if (visitGroups.length === 0) return;

    const currentMoment = moment();
    let year = [];
    for (let i = 11; i >= 0; i--) {
      const currentMonth = moment(currentMoment).subtract(i, "months");
      const visits = visitGroups.find((visit: Visitors.VisitGroup) => moment(visit.timestamp).isSame(currentMonth, "month"))?.count || 0;
      year.push({ name: currentMonth.format("MMM"), visits, tooltipText: currentMonth.format("MMMM YYYY") });
    }
    setVisits(year);
  }, [visitGroups]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Last year</h2>
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
