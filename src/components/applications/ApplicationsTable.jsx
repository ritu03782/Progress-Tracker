import { useState, useMemo } from "react";
import { FaCalendarAlt, FaEllipsisV } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import Pagination from "../common/Pagination";
import CompanyAvatar from "./CompanyAvatar";
import StatusBadge from "./StatusBadge";

const PAGE_SIZE = 5;

function ApplicationsTable({ applications, onView, onDelete }) {
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(applications.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => applications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [applications, page]
  );

  return (
    <Card hover={false} padding="p-0" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-width-[760px] border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-left">
              {["Company", "Role", "Status", "Applied Date", "Next Step", "Action"].map((col) => (
                <th key={col} className="p-4 text-xs font-medium uppercase tracking-wide text-slate-500 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((app) => (
              <tr key={app.id} className="border-b border-slate-800/70 last:border-b-0 hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <CompanyAvatar application={app} />
                    <span className="text-sm font-medium text-white">{app.company}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-300 whitespace-nowrap">{app.role}</td>
                <td className="p-4"><StatusBadge status={app.status} /></td>
                <td className="p-4 text-sm text-slate-400 whitespace-nowrap">{app.appliedDate}</td>
                <td className="p-4">
                  <p className="text-sm text-slate-300">{app.nextStep.title}</p>
                  {app.nextStep.date && (
                    <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <FaCalendarAlt /> {app.nextStep.date}
                    </p>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 relative">
                    <Button variant="secondary" size="sm" onClick={() => onView(app)}>View</Button>
                    <button
                      type="button"
                      onClick={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer flex items-center justify-center"
                    >
                      <FaEllipsisV className="text-xs" />
                    </button>

                    {openMenuId === app.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-0 top-9 z-20 w-32 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => { onDelete(app.id); setOpenMenuId(null); }}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-800 transition cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4">
        <p className="text-sm text-slate-500 mb-1">
          Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, applications.length)} of {applications.length} applications
        </p>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Card>
  );
}
export default ApplicationsTable;