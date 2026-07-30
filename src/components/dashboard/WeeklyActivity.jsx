import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import weeklyActivityData from "../../config/weeklyActivityData";

function WeeklyActivity() {
  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 shadow-lg hover:border-green-500/40 transition-all">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-semibold text-white">
          📈 Weekly DSA Activity
        </h2>

        <span className="text-sm text-slate-400">
          Problems Solved
        </span>

      </div>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={weeklyActivityData}>

            <defs>

              <linearGradient
                id="lineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#374151"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip
              contentStyle={{
                background: "#1E293B",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="solved"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#22C55E",
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default WeeklyActivity;