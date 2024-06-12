import { useEffect } from "react";
import LiveGamePopup from "../components/LiveGamePopup";
import ChampionList from "../partials/ChampionList";
import { registerVisit } from "../utils/visitorsDatabase";
import Header from "../partials/Header";
import { DataReceiver } from "../DataReceiver";

export default function Champions() {

  // visitor tracking
  useEffect(() => {
    registerVisit({
      screen: "champions",
      timestamp: Date.now()
    });
  }, []);

  return (
    <DataReceiver>
      <Header />
      <main className="flex flex-col gap-8 py-14">
        <ChampionList title="Top champions" />
        <LiveGamePopup />
      </main>
    </DataReceiver>
  )
}
