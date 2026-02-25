import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function WeeklyChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>

        <defs>
          <linearGradient id="lessonsColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
          </linearGradient>

          <linearGradient id="quizzesColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
          </linearGradient>

          <linearGradient id="assessmentsColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="lessons"
          stroke="#22c55e"
          fill="url(#lessonsColor)"
          strokeWidth={2}
        />

        <Area
          type="monotone"
          dataKey="quizzes"
          stroke="#ef4444"
          fill="url(#quizzesColor)"
          strokeWidth={2}
        />

        <Area
          type="monotone"
          dataKey="assessments"
          stroke="#3b82f6"
          fill="url(#assessmentsColor)"
          strokeWidth={2}
        />

      </AreaChart>
    </ResponsiveContainer>
  );
}