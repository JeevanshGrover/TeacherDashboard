import StatCard from "../components/cards/StatCard.jsx";
import RangeSelector from "../components/cards/RangeSelector.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary, fetchDashboardTrends } from "../features/dashboardSlice.js";
import WeeklyChart from "../chart/WeeklyChart.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    summary,
    trends,
    range,
    loadingSummary,
    loadingTrends,
    error
  } = useSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardSummary(range));
    dispatch(fetchDashboardTrends(range));
  }, [range, dispatch])
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Insights</h1>
        <RangeSelector />
      </div>
      <div className="grid grid-cols-5 gap-4 mb-8">

        <StatCard
          title="Active Teachers"
          value= {loadingSummary ? "...": summary?.totalTeachers || 0}
          color="bg-purple-100"
        />

        <StatCard
          title="Lessons Created"
          value={loadingSummary ? "...": summary?.totalLessons || 0}
          color="bg-green-100"
        />

        <StatCard
          title="Assessments Made"
          value={loadingSummary ? "...": summary?.totalAssessments || 0}
          color="bg-yellow-100"
        />

        <StatCard
          title="Quizzes Conducted"
          value={loadingSummary ? "...": summary?.totalQuizzes || 0}
          color="bg-orange-100"
        />

        <StatCard
          title="Submission Rate"
          value="0%"
          color="bg-pink-100"
        />

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
          {loadingTrends ? (
          <p>Loading trends...</p>
        ) : (
          <WeeklyChart data={trends} />
        )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          AI Pulse Summary
        </div>

      </div>
    </div>
  );
}

export default Dashboard;