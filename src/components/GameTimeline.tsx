import { GameEvent, GamePlayer } from "../@types/types";
import "./GameTimeline.css";
import { getTimelineIcon } from "../assets/assets_utils";

export default function GameTimeline({ events, players, gameTime }: { events: GameEvent[], players: GamePlayer[], gameTime: number }) {

  return (
    <div className="game-timeline">
      <div className="timeline-wrapper" style={{ width: (gameTime * 2).toString() + "px" }}>
        {events.map((event, index) => {
          if (event.EventName !== "GameStart") {
            if (event.EventName === "ChampionKill" || event.EventName === "Multikill") {
              return (
                <div key={index} className="timeline-item timeline-kill-line bg-riot-red" style={{ left: (event.EventTime / gameTime * 100).toString() + "%" }}></div>
              )
            } else {
              return (
                <div key={index} className="timeline-item timeline-image" style={{ left: (event.EventTime / gameTime * 100).toString() + "%" }}>
                  <img src={getTimelineIcon(event.EventName, "ORDER") ?? ''} alt={event.EventName} />
                </div>
              )
            }
          }
        })}
      </div>
    </div>
  )
}