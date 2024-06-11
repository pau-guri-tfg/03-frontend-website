import { useEffect, useRef, useState } from "react";
import { getTimelineIcon } from "../assets/assets_utils";
import identifyBuilding from "../utils/identifyBuilding";
import { formatDuration } from "../utils/timeFormatter";
import "./GameTimeline.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";

export default function GameTimeline({ events, players, gameTime, title = "", container = false }: { events: GameEvent[], players: GamePlayer[], gameTime: number, title?: string, container?: boolean }) {
  const zoomLevel = useRef<number>(1);
  const [shownTimeRange, setShownTimeRange] = useState<[string, string]>(["", ""]);
  const scrollDiv = useRef<HTMLDivElement>(null);
  const scrollContent = useRef<HTMLDivElement>(null);

  const hiddenEvents = ["GameStart", "MinionsSpawning", "FirstBrick", "FirstBlood", "InhibRespawned"];
  events = events.filter(event => !hiddenEvents.includes(event.EventName));

  const getEventTeam = (event: GameEvent): GameTeamName => {
    let team: GameTeamName = "ORDER";
    if (event.TurretKilled) {
      const turret = identifyBuilding(event.TurretKilled);
      if (turret) {
        team = turret.team;
      }
    } else if (event.InhibKilled) {
      const inhib = identifyBuilding(event.InhibKilled);
      if (inhib) {
        team = inhib.team;
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

  const updateShownRange = () => {
    if (!scrollDiv.current) return;
    const target = scrollDiv.current;
    const scroll = target.scrollLeft;
    const width = target.scrollWidth;
    const rangeStart = Math.floor(scroll / width * gameTime);
    const rangeEnd = Math.floor((scroll + target.clientWidth) / width * gameTime);

    setShownTimeRange([formatDuration(rangeStart), formatDuration(rangeEnd)]);
  }
  useEffect(() => {
    window.addEventListener("resize", updateShownRange);
    return () => window.removeEventListener("resize", updateShownRange);
  }, []);
  useEffect(() => {
    updateShownRange();
  }, [scrollDiv.current, gameTime]);

  const { contextSafe } = useGSAP();

  const updateZoom = contextSafe((value: number) => {
    if (!scrollContent.current) return;

    zoomLevel.current = Math.max(1, Math.min(5, zoomLevel.current * value));
    gsap.to(scrollContent.current, {
      duration: 0.3,
      width: `${100 * zoomLevel.current}%`,
      onUpdate: updateShownRange
    })
  });

  return (
    <div className="flex flex-col w-full gap-3">
      <div className={"flex items-center justify-between w-full gap-6" + (container ? " container" : "")}>
        <div className="flex items-center gap-6 py-2">
          {title !== "" && <h2 className="font-serif text-3xl font-semibold leading-none text-gold">Timeline</h2>}
          <span className="font-serif text-xl font-semibold text-white/40">{`${shownTimeRange[0]} - ${shownTimeRange[1]}`}</span>
        </div>
        <div className="flex items-center gap-6">
          <FontAwesomeIcon icon={faMagnifyingGlassMinus} className="text-white transition-colors cursor-pointer hover:text-gold" onClick={() => updateZoom(0.8)} />
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="text-white transition-colors cursor-pointer hover:text-gold" onClick={() => updateZoom(1.2)} />
        </div>
      </div>
      <div className="w-full bg-dark-blue">
        <div className={container ? "container" : ""}>
          <div className="w-full py-2 overflow-x-auto border-l border-r timeline-scroll-div border-gold" ref={scrollDiv} onScroll={updateShownRange}>
            <div className="relative h-12 overflow-hidden" ref={scrollContent}>
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
        </div>
      </div>
    </div>
  )
}