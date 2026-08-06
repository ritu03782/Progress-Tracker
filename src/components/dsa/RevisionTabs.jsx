function RevisionTabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-800/40 p-1.5">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange?.(tab.id)}
            className={`
              flex
              items-center
              gap-2
              rounded-lg
              px-3.5
              py-1.5
              text-sm
              font-medium
              transition-all
              duration-200
              cursor-pointer
              ${
                isActive
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }
            `}
          >
            {tab.label}

            {!!tab.badge && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default RevisionTabs;
