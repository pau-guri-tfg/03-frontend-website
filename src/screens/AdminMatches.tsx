import { useState, useEffect } from "react";
import AdminWrapper from "../AdminWrapper";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";
import { fetchMatchesVisits } from "../utils/visitorsDatabase";

export default function AdminMatches() {
  const [monthVisitGroups, setMonthVisitGroups] = useState<Visitors.VisitGroup[]>([]);
  const [yearVisitGroups, setYearVisitGroups] = useState<Visitors.VisitGroup[]>([]);

  useEffect(() => {
    fetchMatchesVisits("month", Date.now())
      .then((res) => {
        setMonthVisitGroups(res.data);
      });
    fetchMatchesVisits("year", Date.now())
      .then((res) => {
        setYearVisitGroups(res.data);
      });
  }, []);

  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">"Matches" page visits</h1>
        <AdminMonthlyVisits visitGroups={monthVisitGroups} />
        <AdminYearlyVisits visitGroups={yearVisitGroups} />
      </main>
    </AdminWrapper>
  )
}
