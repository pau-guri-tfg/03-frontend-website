import AdminWrapper from "../AdminWrapper";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";

export default function AdminMatches() {
  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-6">
        <h2 className="text-3xl font-semibold">"Matches" page visits</h2>
        <AdminMonthlyVisits endpoint="matches" />
        <AdminYearlyVisits endpoint="matches" />
      </main>
    </AdminWrapper>
  )
}
