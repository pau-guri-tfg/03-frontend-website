import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

export default function AdminGameCard({ gameVisitGroup }: { gameVisitGroup: Visitors.GameVisitGroup }) {
  const [earliestTime, setEarliestTime] = useState<Moment | null>(null);
  const [latestTime, setLatestTime] = useState<Moment | null>(null);

  useEffect(() => {
    if (gameVisitGroup.timestamps.length === 0) return;

    setEarliestTime(moment(Math.min(...gameVisitGroup.timestamps)));
    setLatestTime(moment(Math.max(...gameVisitGroup.timestamps)));

  }, [gameVisitGroup]);

  return (
    <a href={`/matches#${gameVisitGroup.gameId}`} target='_blank' className="flex items-center justify-between px-4 py-2 transition-colors bg-white border border-dark-gray hover:bg-gray">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faExternalLink} className="w-3 h-3" />
        <span>ID {gameVisitGroup.gameId}:</span>
        <span className="text-lg font-semibold">{gameVisitGroup.count}</span>
      </div>
      <span>{earliestTime && earliestTime.format("MMM D HH:mm")} - {latestTime && latestTime.format(earliestTime?.isSame(latestTime, 'day') ? "HH:mm" : "MMM D HH:mm")}</span>
    </a>
  )
}
