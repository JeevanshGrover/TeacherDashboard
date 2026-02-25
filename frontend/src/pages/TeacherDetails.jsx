import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchTeacherSummary, fetchTeacherTrends, setSelectedTeacher } from "../features/teacherSlice.js";

import StatCard from "../components/cards/StatCard.jsx";
import WeeklyChart from "../chart/WeeklyChart.jsx";
import RangeSelector from "../components/cards/RangeSelector.jsx";

export default function TeacherDetails() {

  const { teacherId } = useParams();
  const dispatch = useDispatch();

  const {
    selectedTeacher,
    summary,
    trends,
    loadingSummary,
    loadingTrends
  } = useSelector((state) => state.teachers);

  const { range } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (teacherId && teacherId !== selectedTeacher) {
      dispatch(setSelectedTeacher(teacherId));
    }
  }, [teacherId, selectedTeacher, dispatch]);

  useEffect(() => {
    if (selectedTeacher) {
      dispatch(fetchTeacherSummary(selectedTeacher));
      dispatch(
        fetchTeacherTrends({
          teacher_id: selectedTeacher,
          range
        })
      );
    }
  }, [selectedTeacher, range, dispatch]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {summary?.name || "Teacher Overview"}
        </h1>
        <RangeSelector />
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Lessons Created"
          value={loadingSummary ? "..." : summary?.lessons || 0}
          color="bg-purple-100"
        />

        <StatCard
          title="Quizzes Conducted"
          value={loadingSummary ? "..." : summary?.quizzes || 0}
          color="bg-green-100"
        />

        <StatCard
          title="Assessments Assigned"
          value={loadingSummary ? "..." : summary?.assessments || 0}
          color="bg-yellow-100"
        />

        <div className="bg-orange-100 p-6 rounded-xl">
          <p className="text-sm font-medium">
            Low Engagement Note
          </p>
          <p className="text-xs mt-2 text-gray-600">
            Average score is low. Consider reviewing teaching methods.
          </p>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">

        {loadingTrends ? (
          <p>Loading trends...</p>
        ) : (
          <WeeklyChart data={trends} />
        )}

      </div>

    </>
  );
}