import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import progressData from "../../config/progressData";
import { useState } from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="
        bg-slate-900
        border
        border-slate-700
        rounded-xl
        px-4
        py-3
        shadow-xl
        "
      >
        <p className="text-slate-300 font-medium">
          {payload[0].payload.name}
        </p>

        <p className="text-blue-400">
          Progress : {payload[0].value}%
        </p>
      </div>
    );
  }

  return null;
};

function ProgressChart() {
  const [view, setView] = useState("Week");
  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 shadow-lg hover:border-blue-500/40 transition-all">

     <div className="flex justify-between items-center mb-6">

    <h2 className="text-xl font-semibold text-white">
      📊 Progress Overview
    </h2>

  <div className="flex items-center gap-3">

    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
      Overall {progressData.overall}%
    </span>

    <select
      value={view}
      onChange={(e) => setView(e.target.value)}
      className="
      bg-slate-800
      border
      border-slate-700
      rounded-lg
      px-3
      py-1.5
      text-sm
      text-slate-300
      outline-none
      cursor-pointer
      hover:border-blue-500
      transition
      "
    >
      <option>Week</option>
      <option>Month</option>
      <option>Year</option>
    </select>

  </div>

</div>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={progressData.subjects}>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#374151"
            />

            <XAxis
                dataKey="name"
                tick={{ fill: "#CBD5E1", fontSize: 13 }}
                axisLine={false}
                tickLine={false}
            />

            <YAxis
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                domain={[0,100]}
            />

            <Tooltip
             cursor={false}
             content={<CustomTooltip />}
           />
           <CustomTooltip/>

            <Bar
              dataKey="progress"
              radius={[8,8,0,0]}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {progressData.subjects.map((subject) => (
                <Cell
                  key={subject.name}
                  fill={subject.color}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ProgressChart;