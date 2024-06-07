import { getTimelineIcon } from "../assets/assets_utils";
import identifyBuilding from "../utils/identifyBuilding";

export default function GameTimeline({ events, players, gameTime }: { events: GameEvent[], players: GamePlayer[], gameTime: number }) {

  const hiddenEvents = ["GameStart", "MinionsSpawning", "FirstBrick", "FirstBlood"];
  events = events.filter(event => !hiddenEvents.includes(event.EventName));

  const getEventTeam = (event: GameEvent): GameTeamName => {
    let team: GameTeamName = "ORDER";
    if (event.TurretKilled) {
      const turret = identifyBuilding(event.TurretKilled);
      if (turret) {
        team = turret.team;
      }
    } else if (event.KillerName) {
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
    return team;
  }

  return (
    <div className="w-full px-4 py-2 overflow-x-auto">
      <div className="relative w-full h-12" style={{ width: (gameTime * 2).toString() + "px" }}>
        {events.map((event, index) => {
          if (event.EventName === "ChampionKill" || event.EventName === "Multikill") {
            return (
              <div key={index} className={("absolute h-full w-px ") + (getEventTeam(event) === "ORDER" ? "bg-riot-blue" : "bg-riot-red")} style={{ left: (event.EventTime / gameTime * 100).toString() + "%" }}></div>
            )
          } else {
            return (
              <div key={index} className="absolute w-8 h-8 -translate-x-1/2 top-2" style={{ left: (event.EventTime / gameTime * 100).toString() + "%" }}>
                <img src={getTimelineIcon(event.EventName, getEventTeam(event)) ?? ''} alt={event.EventName} />
              </div>
            )
          }
        }
        )}
      </div>
    </div>
  )
}