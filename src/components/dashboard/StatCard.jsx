function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border border-slate-800
      bg-[#111827]
      p-6
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      hover:shadow-blue-500/10
      hover:border-blue-500/40
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
        transition
        "
      />

      <div className="relative flex justify-between items-start">

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
    </div>
  );
}
export default StatCard;