import Card from "../common/Card";

// No "View All" button here — there's no fuller activity-log page in the
// app for it to link to, so it would have had nowhere real to go.
function RecentActivity({ activities = [] }) {
  return (
        <Card
        title="🕒 Recent Activity"
        subtitle="Latest updates from your preparation journey."
        className="hover:border-blue-500/30"
        footer={
          <p className="text-sm text-slate-400">
            📌 Every completed task brings you one step closer to your placement goal.
          </p>
        }
      >
      <div className="space-y-4">

        {activities.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-500">
            Nothing here yet — complete a habit, solve a problem, or check off a task to see it show up.
          </p>
        )}

        {activities.map((activity) => {
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
