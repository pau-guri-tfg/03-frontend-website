import AdminWrapper from "../AdminWrapper";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";

export default function AdminLive() {
  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">"Live Match" page visits</h1>
        <AdminMonthlyVisits endpoint="live" />
        <AdminYearlyVisits endpoint="live" />
      </main>
    </AdminWrapper>
  )
}
