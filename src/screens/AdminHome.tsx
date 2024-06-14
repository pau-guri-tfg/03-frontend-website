import AdminWrapper from "../AdminWrapper";
import { fetchAllVisits } from "../utils/visitorsDatabase";
import { useEffect, useState } from "react";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";

export default function AdminHome() {
  const [monthVisitGroups, setMonthVisitGroups] = useState<Visitors.VisitGroup[]>([]);
  const [yearVisitGroups, setYearVisitGroups] = useState<Visitors.VisitGroup[]>([]);

  useEffect(() => {
    fetchAllVisits("month", Date.now())
      .then((res) => {
        setMonthVisitGroups(res.data);
      });
    fetchAllVisits("year", Date.now())
      .then((res) => {
        setYearVisitGroups(res.data);
      });
  }, []);

  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">Global visits</h1>
        <AdminMonthlyVisits visitGroups={monthVisitGroups} />
        <AdminYearlyVisits visitGroups={yearVisitGroups} />
      </main>
    </AdminWrapper>
  )
}
