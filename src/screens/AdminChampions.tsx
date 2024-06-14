import { useEffect, useState } from "react";
import AdminWrapper from "../AdminWrapper";
import { fetchChampionsVisits } from "../utils/visitorsDatabase";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";

export default function AdminChampions() {
  const [monthVisitGroups, setMonthVisitGroups] = useState<Visitors.VisitGroup[]>([]);
  const [yearVisitGroups, setYearVisitGroups] = useState<Visitors.VisitGroup[]>([]);

  useEffect(() => {
    fetchChampionsVisits("month", Date.now())
      .then((res) => {
        setMonthVisitGroups(res.data);
      });
    fetchChampionsVisits("year", Date.now())
      .then((res) => {
        setYearVisitGroups(res.data);
      });
  }, []);

  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">"Champions" page visits</h1>
        <AdminMonthlyVisits visitGroups={monthVisitGroups} />
        <AdminYearlyVisits visitGroups={yearVisitGroups} />
      </main>
    </AdminWrapper>
  )
}
