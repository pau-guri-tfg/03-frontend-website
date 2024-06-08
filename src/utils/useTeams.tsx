import { useEffect, useState } from "react";


export default function useTeams({ players }: { players: GamePlayer[] }) {
  const [orderPlayers, setOrderPlayers] = useState<GamePlayer[]>([]);
  const [chaosPlayers, setChaosPlayers] = useState<GamePlayer[]>([]);
  useEffect(() => {
    const orderPlayers = players.filter(player => player.team === "ORDER");
    const chaosPlayers = players.filter(player => player.team === "CHAOS");

    setOrderPlayers(orderPlayers);
    setChaosPlayers(chaosPlayers);
  }, [players]);

  return { orderPlayers, chaosPlayers };
}
