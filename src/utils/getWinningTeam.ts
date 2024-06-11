export default function getWinningTeam(gameResult: string, players: GamePlayer[]): GameTeamName | null {
  const result = gameResult === "Win";
  const localPlayer = players.find(player => player.isLocalPlayer);
  if (localPlayer) {
    const team = localPlayer.team === "ORDER" ? (result ? "ORDER" : "CHAOS") : (result ? "CHAOS" : "ORDER");
    return team;
  }
  return null;
}