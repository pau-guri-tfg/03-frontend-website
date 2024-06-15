import { useEffect, useRef, useState } from 'react'
import { fetchSummonerVisitsBySummoner } from '../utils/visitorsDatabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faRotate } from '@fortawesome/free-solid-svg-icons';
import AdminLineChart from '../components/AdminLineChart';
import moment, { Moment } from 'moment';
import gsap from 'gsap';

export default function AdminSummonerList() {
  const [summoners, setSummoners] = useState<Visitors.SummonerVisitGroup[]>([]);
  const [chosenSummonerIndex, setChosenSummonerIndex] = useState<number | null>(null);
  const [chosenSummonerData, setChosenSummonerData] = useState<ChartData | null>(null);
  const updateIcon = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    updateVisits();
  }, []);

  const updateVisits = () => {
    // rotate update icon
    if (updateIcon.current) {
      gsap.to(updateIcon.current, { rotation: '+=360', duration: 0.5 })
    }

    fetchSummonerVisitsBySummoner("all", null, 10)
      .then((res) => {
        setSummoners(res.data);
        if (chosenSummonerIndex !== null && res.data.length < chosenSummonerIndex) {
          setChosenSummonerIndex(null);
        }
      })
  }

  useEffect(() => {
    console.log(chosenSummonerIndex, summoners.length);
    if (chosenSummonerIndex === null || summoners.length < chosenSummonerIndex) return;

    const summoner = summoners[chosenSummonerIndex];

    let normalizedMoments: { moment: Moment, count: number }[] = [];
    summoner.timestamps.forEach((timestamp) => {
      const closestDay = moment(timestamp).startOf('day');
      const existingVisit = normalizedMoments.find((item) => closestDay.isSame(item.moment));
      if (existingVisit) {
        existingVisit.count++;
      } else {
        normalizedMoments.push({ moment: closestDay, count: 1 });
      }
    });

    const chartData: ChartData = normalizedMoments.map((item) => (
      { name: item.moment.valueOf(), value: item.count, tooltipText: item.moment.format("MMMM D YYYY") }
    ));
    setChosenSummonerData(chartData);
  }, [chosenSummonerIndex]);

  return (
    <div className="flex flex-col gap-6">
      <div className='flex items-center justify-between gap-4'>
        <h2 className="text-3xl font-semibold">Most visited summoners</h2>
        <button ref={updateIcon} onClick={updateVisits}>
          <FontAwesomeIcon icon={faRotate} title='Refresh data' />
        </button>
      </div>
      <div className='flex'>
        <div className='flex flex-col w-full gap-1 max-w-40'>
          {summoners.map((summoner, index) => (
            <div key={index} onClick={() => setChosenSummonerIndex(index)} className="flex items-center justify-between w-full px-4 py-2 transition-colors bg-white border cursor-pointer border-dark-gray hover:bg-gray">
              <span className='flex-1 overflow-hidden text-ellipsis'>{summoner.riotIdGameName}#{summoner.riotIdTagLine}</span>
              {chosenSummonerIndex === index && <FontAwesomeIcon icon={faArrowRight} className='shrink-0' />}
            </div>
          ))}
        </div>
        <div className='flex flex-col justify-center flex-1'>
          {chosenSummonerData ?
            <AdminLineChart data={chosenSummonerData} tickFormat="MMM D" />
            :
            <div className='h-[300px] w-[calc(100%_-_32px)] border border-dark-gray flex items-center justify-center p-4 ml-auto'>
              <span>Select a summoner to view data</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
