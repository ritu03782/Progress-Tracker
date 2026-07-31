import { useState } from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import progressData from "../../config/progressData";

function ProgressChart() {
  const [view, setView] = useState("Week");

  const chartData = [
    {
      name: "Overall",
      value: progressData.overall,
      fill: "#3B82F6",
    },
  ];

  return (
    <div
      className="
      bg-[#111827]
      rounded-2xl
      border
      border-slate-800
      p-6
      shadow-lg
      hover:border-blue-500/40
      hover:shadow-blue-500/10
      transition-all
      duration-300
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-8">

          <h2 className="text-xl font-semibold text-white">
            📊 Progress Overview
          </h2>

        <div className="flex items-center gap-3">

          <span className=" px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-sm font-medium">
            {progressData.overall}% Overall
          </span>

          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className=" bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300
            outline-none hover:border-blue-500 focus:border-blue-500 transition cursor-pointer"
          >
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>

        </div>

      </div>

      {/* Body */}

      <div className="flex flex-col lg:flex-row items-center gap-10">

        {/* ================= Left ================= */}

        <div className="relative w-56 h-56 xl:w-60 xl:h-60 flex-shrink:0">

          <ResponsiveContainer width="100%" height="100%">

            <RadialBarChart
              data={chartData}
              innerRadius="72%"
              outerRadius="92%"
              startAngle={90}
              endAngle={-270}
            >

              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                tick={false}
              />

              <RadialBar
                    dataKey="value"
                    background={{ fill: "#1E293B" }}
                    cornerRadius={20}
                    animationBegin={300}
                    animationDuration={1800}
                    animationEasing="ease-out"
                />

            </RadialBarChart>

          </ResponsiveContainer>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

         <h2 className="text-5xl font-bold text-white">
              {progressData.overall}%
          </h2>

          <p className="text-slate-400 mt-1">
              Overall Progress
          </p>

          <div className="mt-4 flex justify-center">

              <span className="
              px-3
              py-1
              rounded-full
              bg-green-500/15
              text-green-400
              text-xs
              ">
                  🚀 On Track
              </span>

          </div>

          </div>

        </div>

        {/* ================= Right ================= */}

        <div className="flex-1 w-full">

          <div className="space-y-5">

            {progressData.subjects.map((subject) => (

              <div key={subject.name}>

                {/* Subject Name */}

                <div className="flex justify-between items-center mb-2">

                  <div className="flex items-center gap-3">

                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: subject.color,
                      }}
                    />

                    <span className="text-slate-200 font-medium">
                      {subject.name}
                    </span>

                  </div>

                  <span
                    className="font-semibold"
                    style={{
                      color: subject.color,
                    }}
                  >
                    {subject.progress}%
                  </span>

                </div>

                {/* Progress */}

                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">

                  <div
                    className="
                    h-full
                    rounded-full
                    transition-all
                    duration-1000
                    hover:brightness-125
                    "
                    style={{
                      width: `${subject.progress}%`,
                      background: `linear-gradient(90deg, ${subject.color}, #60A5FA)`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

          {/* Footer */}

          <div className="mt-6 border-t border-slate-700 pt-4">

            <p className="text-sm text-slate-400">

              🚀 Great progress! Stay consistent and you'll reach your placement goal.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProgressChart;