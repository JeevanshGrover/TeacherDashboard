import StatCard from "../components/cards/StatCard";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4 mb-8">

        <StatCard
          title="Active Teachers"
          value="52"
          color="bg-purple-100"
        />

        <StatCard
          title="Lessons Created"
          value="64"
          color="bg-green-100"
        />

        <StatCard
          title="Assessments Made"
          value="39"
          color="bg-yellow-100"
        />

        <StatCard
          title="Quizzes Conducted"
          value="50"
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
          Weekly Activity Chart Here
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          AI Pulse Summary
        </div>

      </div>
    </div>
  );
}

export default Dashboard;