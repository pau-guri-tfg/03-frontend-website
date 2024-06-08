import nexusBlue from "./timeline-icons/nexus-blue.png";
import nexusRed from "./timeline-icons/nexus-red.png";
import towerBlue from "./timeline-icons/tower-blue.png";
import towerRed from "./timeline-icons/tower-red.png";
import inhibitorBlue from "./timeline-icons/inhibitor-blue.png";
import inhibitorRed from "./timeline-icons/inhibitor-red.png";
import dragonBlue from "./timeline-icons/dragon-blue.png";
import dragonRed from "./timeline-icons/dragon-red.png";
import heraldBlue from "./timeline-icons/herald-blue.png";
import heraldRed from "./timeline-icons/herald-red.png";
import baronBlue from "./timeline-icons/baron-blue.png";
import baronRed from "./timeline-icons/baron-red.png";
import deadBlue from "./timeline-icons/dead-blue.png";
import deadRed from "./timeline-icons/dead-red.png";
export function getTimelineIcon(eventName: GameEventName, teamName: GameTeamName): string | null {
  switch (eventName) {
    case "GameEnd":
      return teamName === "ORDER" ? nexusBlue : nexusRed;
    case "TurretKilled":
      return teamName === "ORDER" ? towerRed : towerBlue;
    case "InhibKilled":
      return teamName === "ORDER" ? inhibitorBlue : inhibitorRed;
    case "DragonKill":
      return teamName === "ORDER" ? dragonBlue : dragonRed;
    case "HeraldKill":
      return teamName === "ORDER" ? heraldBlue : heraldRed;
    case "BaronKill":
      return teamName === "ORDER" ? baronBlue : baronRed;
    case "Ace":
      return teamName === "ORDER" ? deadRed : deadBlue;
    default:
      return null;
  }
}