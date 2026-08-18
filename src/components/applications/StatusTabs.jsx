function StatusTabs({ counts, activeStatus, onChange }) {
  const tabs = [
    { key: "All", label: "All", count: counts.total },
    { key: "Applied", label: "Applied", count: counts.applied },
    { key: "OA", label: "OA", count: counts.oa },
    { key: "Interview", label: "Interview", count: counts.interview },
    { key: "Offer", label: "Offer", count: counts.offer },
    { key: "Rejected", label: "Rejected", count: counts.rejected },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const isActive = activeStatus === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`
              shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer
              ${isActive ? "bg-blue-600 text-white" : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-blue-500"}
            `}
          >
            {tab.label}{tab.key !== "All" ? ` (${tab.count})` : ""}
          </button>
        );
      })}
    </div>
  );
}
export default StatusTabs;