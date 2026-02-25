export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl ${color} shadow-sm`}>
      <p className="text-sm text-gray-600">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <p className="text-xs text-gray-500 mt-1">This week</p>
    </div>
  );
}