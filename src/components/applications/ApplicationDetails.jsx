import { useState } from "react";
import { FaTimes, FaCalendarAlt, FaExternalLinkAlt, FaStickyNote, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import CompanyAvatar from "./CompanyAvatar";
import StatusBadge from "./StatusBadge";
import ApplicationStepper from "./ApplicationStepper";
import { inputClass } from "../../utils/formStyles";

const TABS = ["Overview", "Timeline", "Notes", "Resources"];

function ApplicationDetails({ application, isOpen, onClose, onUpdateNotes, onDeleteApplication, onEditApplication }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [notesDraft, setNotesDraft] = useState("");

  if (!application) return null;

  const startEditingNotes = () => setNotesDraft(application.notes || "");
  const saveNotes = () => {
    onUpdateNotes(application.id, notesDraft);
    setNotesDraft(null);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-[85%] sm:w-[45%] bg-[#0F172A] border-l border-slate-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-start p-6 pb-4 border-b border-slate-800">
          <div className="flex gap-4 items-center min-w-0">
            <CompanyAvatar application={application} size="w-14 h-14 text-lg" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white truncate">{application.company}</h2>
                <StatusBadge status={application.status} />
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{application.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition cursor-pointer flex items-center justify-center shrink-0"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex gap-6 px-6 border-b border-slate-800">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-medium border-b-2 transition cursor-pointer ${
                activeTab === tab ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {activeTab === "Overview" && (
            <>
              <Card hover={false}>
                <h3 className="text-white font-semibold mb-5">Application Progress</h3>
                <ApplicationStepper timeline={application.timeline} />
              </Card>

              <Card hover={false}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs text-slate-500">Applied Date</p>
                    <p className="text-sm text-white font-medium mt-1">{application.appliedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Expected CTC</p>
                    <p className="text-sm text-white font-medium mt-1">{application.expectedCTC}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Job Type</p>
                    <p className="text-sm text-white font-medium mt-1">{application.jobType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm text-white font-medium mt-1">{application.location}</p>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <h3 className="text-white font-semibold mb-3">Next Step</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
                      <FaCalendarAlt className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{application.nextStep.title}</p>
                      {application.nextStep.date && (
                        <p className="text-xs text-slate-500 mt-0.5">{application.nextStep.date} • {application.nextStep.time}</p>
                      )}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-400 shrink-0">
                    {application.nextStep.badge}
                  </span>
                </div>
              </Card>

              <Card hover={false}>
                <h3 className="text-white font-semibold mb-3">Job Details</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span className="text-slate-500">Department:</span><span className="text-slate-200">{application.department}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Experience:</span><span className="text-slate-200">{application.experience}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Batch:</span><span className="text-slate-200">{application.batch}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Job ID:</span><span className="text-slate-200">{application.jobId}</span></li>
                </ul>
                <a href={application.jobDescriptionUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm" className="w-full justify-center flex items-center gap-2 mt-4">
                    View Job Description <FaExternalLinkAlt className="text-xs" />
                  </Button>
                </a>
              </Card>

              <Card hover={false}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold flex items-center gap-2"><FaStickyNote className="text-yellow-400" /> Notes</h3>
                  <button type="button" className="text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer" onClick={() => setActiveTab("Notes")}>Edit</button>
                </div>
                <p className="text-slate-400 text-sm leading-6 whitespace-pre-line">{application.notes || "No notes yet."}</p>
              </Card>
            </>
          )}

          {activeTab === "Timeline" && (
            <Card hover={false}>
              <h3 className="text-white font-semibold mb-4">Timeline</h3>
              <div className="space-y-4">
                {application.timeline.map((t) => (
                  <div key={t.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.completed ? "bg-green-500 text-white" : t.current ? "border-2 border-blue-500 text-blue-400" : "border-2 border-slate-700 text-slate-600"}`}>
                      {t.completed && <FaCheck className="text-xs" />}
                    </div>
                    <div>
                      <p className="text-sm text-slate-200">{t.stage}</p>
                      <p className="text-xs text-slate-500">{t.date || "Pending"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "Notes" && (
            <Card hover={false}>
              <h3 className="text-white font-semibold mb-3">Notes</h3>
              <textarea
                value={notesDraft === null ? application.notes : (notesDraft ?? application.notes)}
                onFocus={startEditingNotes}
                onChange={(e) => setNotesDraft(e.target.value)}
                rows={8}
                placeholder="Add notes about this application..."
                className={`${inputClass} resize-none`}
              />
              <Button variant="primary" size="sm" className="mt-3" onClick={saveNotes}>Save Notes</Button>
            </Card>
          )}

          {activeTab === "Resources" && (
            <Card hover={false}>
              <h3 className="text-white font-semibold mb-3">Resources</h3>
              {application.resources.length === 0 ? (
                <p className="text-sm text-slate-500">No resources attached.</p>
              ) : (
                <div className="space-y-2">
                  {application.resources.map((res) => (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between text-sm text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      {res.label}
                      <FaExternalLinkAlt className="text-xs text-slate-500" />
                    </a>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        <div className="flex gap-3 p-6 pt-4 border-t border-slate-800">
          <Button variant="primary" className="flex-1 justify-center flex items-center gap-2" onClick={() => onEditApplication(application.id)}>
            <FaEdit /> Edit Application
          </Button>
          <Button
            variant="danger"
            className="flex-1 justify-center flex items-center gap-2"
            onClick={() => { onDeleteApplication(application.id); onClose(); }}
          >
            <FaTrash /> Remove
          </Button>
        </div>
      </div>
    </>
  );
}
export default ApplicationDetails;