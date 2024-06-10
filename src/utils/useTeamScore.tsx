import React, { useEffect } from 'react'

export default function useTeamScore(players: GamePlayer[]) {
  const [orderScore, setOrderScore] = React.useState<number | string>("-");
  const [chaosScore, setChaosScore] = React.useState<number | string>("-");

  useEffect(() => {
    if (!players || players.length === 0) return;

    const blueTeamScore = players.filter(player => player.team === "ORDER").reduce((acc, player) => acc + player.scores.kills, 0);
    setOrderScore(blueTeamScore);
    const redTeamScore = players.filter(player => player.team === "CHAOS").reduce((acc, player) => acc + player.scores.kills, 0);
    setChaosScore(redTeamScore);
  }, [players]);

  return { orderScore, chaosScore };
}
