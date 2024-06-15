import moment from 'moment';
import { useEffect, useRef, useState } from 'react'
import { fetchVisitsByTime } from '../utils/visitorsDatabase';
import AdminBarChart from '../components/AdminBarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

export default function AdminMonthlyVisits({ endpoint }: { endpoint: Visitors.DatabaseEndpoint }) {
  const [visits, setVisits] = useState<ChartData>([]);
  const updateIcon = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    updateVisits();
  }, []);

  const updateVisits = () => {
    fetchVisitsByTime(endpoint, "month", Date.now())
      .then((res) => {
        const visitGroups = res.data;
        if (visitGroups.length === 0) return;

        const currentMoment = moment();
        let month = [];
        for (let i = 30; i >= 0; i--) {
          const currentDay = moment(currentMoment).subtract(i, "days");
          const visits = visitGroups.find((visit: Visitors.VisitGroup) => moment(visit.timestamp).isSame(currentDay, "day"))?.count || 0;
          month.push({ name: currentDay.format("MMM D"), value: visits, tooltipText: currentDay.format("MMMM D, YYYY") });
        }
        setVisits(month);
      });

    // rotate update icon
    if (updateIcon.current) {
      gsap.to(updateIcon.current, { rotation: '+=360', duration: 0.5 })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className='flex items-center justify-between gap-4'>
        <h2 className="text-2xl font-semibold">Last month</h2>
        <button ref={updateIcon} onClick={updateVisits}>
          <FontAwesomeIcon icon={faRotate} title='Refresh data' />
        </button>
      </div>

      <AdminBarChart data={visits} />
    </div>
  )
}