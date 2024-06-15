import AdminWrapper from "../AdminWrapper";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";

export default function AdminChampions() {
  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-6">
        <h2 className="text-3xl font-semibold">"Champions" page visits</h2>
        <AdminMonthlyVisits endpoint="champions" />
        <AdminYearlyVisits endpoint="champions" />
      </main>
    </AdminWrapper>
  )
}
