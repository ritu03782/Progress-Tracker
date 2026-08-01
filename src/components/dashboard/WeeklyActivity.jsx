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
import Card from "../common/Card";

function WeeklyActivity() {
  return (
        <Card
        title="📈 Weekly DSA Activity"
        subtitle="Track the number of problems solved each day."
        className="hover:border-green-500/40"
        action={
          <span className="text-sm text-slate-400">
            Problems Solved
          </span>
        }
        footer={
          <p className="text-sm text-slate-400">
            📚 Keep solving consistently to maintain your coding streak.
          </p>
        }
      >
      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={weeklyActivityData}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient
                id="lineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#22C55E"
                />

                <stop
                  offset="100%"
                  stopColor="#3B82F6"
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#374151"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#22C55E",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
              contentStyle={{
                background: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="solved"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              animationDuration={1500}
              animationEasing="ease-out"
              dot={{
                r: 5,
                fill: "#22C55E",
                strokeWidth: 2,
                stroke: "#111827",
              }}
              activeDot={{
                r: 8,
                fill: "#3B82F6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
}

export default WeeklyActivity;