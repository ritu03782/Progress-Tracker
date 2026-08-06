import Card from "../common/Card";
import dsaStats from "../../config/dsaStats";
import { FaArrowUp } from "react-icons/fa";

function StatsRow() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      {dsaStats.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.id} padding="p-5" className="cursor-pointer">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white text-lg ${item.bg}`}
              >
                <Icon />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-400 truncate">{item.title}</p>

                <h3 className="mt-1 text-2xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <FaArrowUp className="text-[10px]" />
                  {item.subtitle}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
}

export default StatsRow;
