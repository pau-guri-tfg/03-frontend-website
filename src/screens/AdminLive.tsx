import AdminWrapper from "../AdminWrapper";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";
import AdminLastGameVisits from "../partials/AdminLastGameVisits";
import AdminGameList from "../partials/AdminGameList";

export default function AdminLive() {
  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold">Last live match</h2>
          <AdminLastGameVisits />
        </div>
        <AdminGameList />
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold">Total "Live Match" page visits</h2>
          <AdminMonthlyVisits endpoint="live" />
          <AdminYearlyVisits endpoint="live" />
        </div>
      </main>
    </AdminWrapper>
  )
}
