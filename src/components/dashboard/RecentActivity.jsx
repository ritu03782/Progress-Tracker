import recentActivityData from "../../config/recentActivitiesData";
import Card from "../common/Card";

function RecentActivity() {
  return (
        <Card
        title="🕒 Recent Activity"
        subtitle="Latest updates from your preparation journey."
        className="hover:border-blue-500/30"
        action={
          <button
            className="
            text-sm
            text-blue-400
            hover:text-blue-300
            transition
            cursor-pointer
            "
          >
            View All
          </button>
        }
        footer={
          <p className="text-sm text-slate-400">
            📌 Every completed task brings you one step closer to your placement goal.
          </p>
        }
      >
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
              {/* Left */}

              <div className="flex items-center gap-4">

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


    </Card>
  );
}

export default RecentActivity;