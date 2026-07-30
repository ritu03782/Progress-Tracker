import recentActivityData from "../../config/recentActivitiesData";

function RecentActivity() {
  return (
    <div
      className="
      bg-[#111827]
      rounded-2xl
      border
      border-slate-800
      p-6
      shadow-lg
      hover:border-blue-500/30
      hover:shadow-blue-500/10
      transition-all
      duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          🕒 Recent Activity
        </h2>

        <button className="text-sm text-blue-400 hover:text-blue-300 transition cursor-pointer">
          View All
        </button>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {recentActivityData.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="
              group
              flex
              items-center
              justify-between
              rounded-xl
              bg-slate-800
              p-4
              transition-all
              duration-300
              hover:bg-slate-700
              hover:-translate-y-1
              hover:shadow-md
              cursor-pointer
              "
            >
              {/* Left Side */}
              <div className="flex items-center gap-4">

                {/* Icon */}
                <div className="relative">

                  {/* Icon Circle */}
                  <div
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-slate-900
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    group-hover:scale-110
                    "
                  >
                    <Icon
                      className={`text-2xl ${activity.iconColor}`}
                    />
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-white font-medium">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    {activity.description}
                  </p>
                </div>

              </div>

              {/* Time */}
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;