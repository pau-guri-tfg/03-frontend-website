import AdminWrapper from "../AdminWrapper";
import AdminMonthlyVisits from "../partials/AdminMonthlyVisits";
import AdminSummonerList from "../partials/AdminSummonerList";
import AdminYearlyVisits from "../partials/AdminYearlyVisits";

export default function AdminSummoner() {
  return (
    <AdminWrapper>
      <main className="w-full px-8 py-14 max-w-[800px] mx-auto flex flex-col gap-16">
        <AdminSummonerList />
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold">Total "Summoner" pages visits</h2>
          <AdminMonthlyVisits endpoint="summoner" />
          <AdminYearlyVisits endpoint="summoner" />
        </div>
      </main>
    </AdminWrapper>
  )
}
