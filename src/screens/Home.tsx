import { useContext, useEffect, useState } from "react";
import GameTimeline from "../components/GameTimeline";
import { DataContext } from "../DataReceiver";

export default function Home() {
  const { events, players, gamedata} = useContext(DataContext);
  const [globalScore, setGlobalScore] = useState<[number, number]>([0,0]);
  const [formattedStartTime, setFormattedStartTime] = useState<string>("");
  const [formatedGameTime, setFormatedGameTime] = useState<string>("");

  useEffect(() => {
    if(!players || players.length === 0) return;

      const blueTeamScore = players.filter(player => player.team === "ORDER").reduce((acc, player) => acc + player.scores.kills, 0);
      const redTeamScore = players.filter(player => player.team === "CHAOS").reduce((acc, player) => acc + player.scores.kills, 0);
      setGlobalScore([blueTeamScore, redTeamScore]);
  }, [players]);

  useEffect(() => {
    if(!gamedata) return;

    const date = new Date(gamedata.gameStartTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setFormattedStartTime(`${formattedDate} ${formattedTime}`);

    const gameMinutes = Math.floor(gamedata.gameTime / 60);
    const gameSeconds = Math.floor(gamedata.gameTime % 60);
    setFormatedGameTime(`${gameMinutes}:${gameSeconds}`);
  }, [gamedata]);

  return (events && players && gamedata) && (
    <div>
      <h1>Current game</h1>
      <p>Start time {formattedStartTime}</p>
      <p>Game duration {formatedGameTime}</p>
      <p>Blue team score: {globalScore[0]}</p>
      <p>Red team score: {globalScore[1]}</p>
      <GameTimeline events={events} players={players} gameTime={gamedata.gameTime} />
    </div>
  )
}
