import "./GameTimeline.css";
import { getTimelineIcon } from "../assets/assets_utils";
import identifyBuilding from "../utils/identifyBuilding";

export default function GameTimeline({ events, players, gameTime }: { events: GameEvent[], players: GamePlayer[], gameTime: number }) {

  //console.log(events);

  return (
    <div className="game-timeline">
      <div className="timeline-wrapper" style={{ width: (gameTime * 2).toString() + "px" }}>
        {events.map((event, index) => {
          if (event.EventName === "GameStart" || event.EventName === "MinionsSpawning") return null;

          // determine the event team
          let team: GameTeamName = "ORDER";
          if (event.KillerName) {
            const killer = players.find(player => player.summonerName.split('#')[0] === event.KillerName);
            if (killer) {
              team = killer.team;
            } else {
              const turret = identifyBuilding(event.KillerName);
              if (turret) {
                team = turret.team;
              }
            }
          } else if (event.Acer) {
            const acer = players.find(player => player.summonerName.split('#')[0] === event.Acer);
            if (acer) {
              team = acer.team;
            }
          }

          if (event.EventName === "ChampionKill" || event.EventName === "Multikill") {
            return (
              <div key={index} className={("timeline-item timeline-kill-line ") + (team === "ORDER" ? "bg-riot-blue" : "bg-riot-red")} style={{ left: (event.EventTime / gameTime * 100).toString() + "%" }}></div>
            )
          } else {
            return (
              <div key={index} className="timeline-item timeline-image" style={{ left: (event.EventTime / gameTime * 100).toString() + "%" }}>
                <img src={getTimelineIcon(event.EventName, team) ?? ''} alt={event.EventName} />
              </div>
            )
          }
        }
        )}
      </div>
    </div>
  )
}