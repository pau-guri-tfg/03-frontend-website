import { useEffect } from "react";
import LiveGamePopup from "../components/LiveGamePopup";
import ChampionList from "../partials/ChampionList";
import { registerVisit } from "../utils/visitorsDatabase";
import { PublicWrapper } from "../PublicWrapper";

export default function Champions() {

  // visitor tracking
  useEffect(() => {
    registerVisit({
      screen: "champions",
      timestamp: Date.now()
    });
  }, []);

  return (
    <PublicWrapper>
      <main className="flex flex-col gap-8 py-14">
        <ChampionList title="Top champions" />
        <LiveGamePopup />
      </main>
    </PublicWrapper>
  )
}
