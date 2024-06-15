import moment from 'moment';
import { useEffect, useRef, useState } from 'react'
import { fetchVisitsByTime } from '../utils/visitorsDatabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AdminBarChart from '../components/AdminBarChart';
import UpdateButton from '../components/UpdateButton';

export default function AdminYearlyVisits({ endpoint }: { endpoint: Visitors.DatabaseEndpoint }) {
  const [visits, setVisits] = useState<ChartData>([]);
  const updateIcon = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    updateVisits();
  }, []);

  const { contextSafe } = useGSAP();

  const updateVisits = contextSafe(() => {
    fetchVisitsByTime(endpoint, "year", Date.now())
      .then((res) => {
        const visitGroups = res.data;
        if (visitGroups.length === 0) return;

        const currentMoment = moment();
        let year = [];
        for (let i = 11; i >= 0; i--) {
          const currentMonth = moment(currentMoment).subtract(i, "months");
          const visits = visitGroups.find((visit: Visitors.TimeVisitGroup) => moment(visit.timestamp).isSame(currentMonth, "month"))?.count || 0;
          year.push({ name: currentMonth.format("MMM"), value: visits, tooltipText: currentMonth.format("MMMM YYYY") });
        }
        setVisits(year);
      });

    // rotate update icon
    if (updateIcon.current) {
      gsap.to(updateIcon.current, { rotation: '+=360', duration: 0.5 })
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <div className='flex items-center justify-between gap-4'>
        <h2 className="text-2xl font-semibold">Last year</h2>
        <UpdateButton onClick={updateVisits} />
      </div>
      <AdminBarChart data={visits} />
    </div>
  )
}
