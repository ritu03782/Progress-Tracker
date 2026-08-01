import Card from "../common/Card";

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <Card
      className="
      relative
      overflow-hidden
      cursor-pointer
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        inset-0
        bg-linear-to-r
        from-blue-500/0
        via-blue-500/5
        to-violet-500/0
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-300
        "
      />

      <div className="relative flex justify-between items-start">

        {/* Left */}

        <div>

          <p className="text-sm text-slate-400">
            {item.title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {item.value}
          </h2>

          <p className="mt-2 text-sm text-emerald-400 font-medium">
            {item.subtitle}
          </p>

        </div>

        {/* Icon */}

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-xl
          bg-slate-800
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:rotate-6
          "
        >
          <Icon
            className={`text-3xl ${item.iconColor}`}
          />
        </div>

      </div>
    </Card>
  );
}

export default StatCard;