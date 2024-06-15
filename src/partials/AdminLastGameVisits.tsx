import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react'
import { fetchGameEndpoint } from '../utils/gamesDatabase';
import { fetchLiveVisitsByGame } from '../utils/visitorsDatabase';
import gsap from 'gsap';
import AdminLineChart from '../components/AdminLineChart';
import UpdateButton from '../components/UpdateButton';

export default function AdminLastGameVisits() {
  const [game, setGame] = useState<GameData | null>(null);
  const [visits, setVisits] = useState<ChartData | null>([]);
  const updateIcon = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    updateVisits();
  }, []);

  const updateVisits = async () => {
    // rotate update icon
    if (updateIcon.current) {
      gsap.to(updateIcon.current, { rotation: '+=360', duration: 0.5 })
    }

    const gameRes = await fetchGameEndpoint("all", "gamedata", 1);
    const gameData = gameRes.data;
    if (gameData.length === 0) return;
    setGame(gameData[0]);

    try {
      const visitRes = await fetchLiveVisitsByGame(gameData[0].gameId);
      const gameVisits: Visitors.LiveVisit[] = visitRes.data;
      console.log(gameVisits);
      if (gameVisits.length === 0) {
        setVisits(null);
        return;
      }

      let normalizedMoments: { moment: Moment, count: number }[] = [];
      gameVisits.forEach((visit) => {
        const closestMinute = moment(visit.timestamp).startOf('minute');
        const existingVisit = normalizedMoments.find((item) => closestMinute.isSame(item.moment));
        if (existingVisit) {
          existingVisit.count++;
        } else {
          normalizedMoments.push({ moment: closestMinute, count: 1 });
        }
      });

      const chartData: ChartData = normalizedMoments.map((item) => (
        { name: item.moment.valueOf(), value: item.count, tooltipText: item.moment.format("MMMM D HH:mm") }
      ));
      setVisits(chartData);
    } catch (error) {
      setVisits(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className='flex items-center justify-between gap-4'>
        <div>
          {game &&
            <a href={`/matches#${game.gameId}`} target='_blank' className='flex items-center gap-2 transition-colors hover:text-dark-gray'>
              <h2 className="text-lg font-semibold">Match ID: {game.gameId}</h2>
              <FontAwesomeIcon icon={faExternalLink} />
            </a>
          }
        </div>
        <UpdateButton onClick={updateVisits} />
      </div>

      {visits ?
        <AdminLineChart data={visits} tickFormat="HH:mm" />
        :
        <p>This match has no visits.</p>
      }
    </div>
  )
}