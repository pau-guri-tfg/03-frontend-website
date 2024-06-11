import LiveGamePopup from "../components/LiveGamePopup";
import ChampionList from "../partials/ChampionList";

export default function Champions() {
  return (
    <main className="flex flex-col gap-8 py-14">
      <ChampionList title="Top champions" />
      <LiveGamePopup />
    </main>
  )
}
