import { FaTimes, FaGithub, FaExternalLinkAlt, FaStickyNote, FaEdit } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import ProgressRing from "../common/ProgressRing";
import ChecklistItem from "../common/ChecklistItem";
import { getProjectProgress } from "../../utils/projectStats";

function ProjectDetails({ project, isOpen, onClose, onToggleTask, onEditProject }) {
  if (!project) return null;

  const progress = getProjectProgress(project);
  const completedCount = project.tasks.filter((t) => t.completed).length;
  const Icon = project.icon;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-[85%] sm:w-[45%] bg-[#0F172A] border-l border-slate-800 shadow-2xl z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-start p-6 border-b border-slate-800">
          <div className="flex gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${project.bg}`}>
              <Icon className={`text-2xl ${project.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{project.name}</h2>
              <p className="text-sm text-slate-400 mt-1">{project.technologies.join(" • ")}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition cursor-pointer flex items-center justify-center shrink-0"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto h-[calc(100vh-98px)]">
          <Card hover={false}>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ProgressRing value={progress} color={project.hex} size={130}>
                    <span className="text-xl font-bold text-white">{progress}%</span>
                  </ProgressRing>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400">Overall Progress</p>
                <p className="mt-1 text-sm text-white font-medium">
                  {completedCount} / {project.tasks.length} tasks completed
                </p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Project Tasks</h3>
              <span className="text-xs text-slate-500">{completedCount}/{project.tasks.length}</span>
            </div>
            <div className="max-h-64 overflow-y-auto pr-1 space-y-1">
              {project.tasks.map((task) => (
                <ChecklistItem key={task.id} item={task} onToggle={(id) => onToggleTask(project.id, id)} />
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="text-white font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <h3 className="text-white font-semibold mb-3">Repository</h3>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between text-sm text-slate-300 hover:text-blue-400 transition-colors"
            >
            
              <span className="flex items-center gap-2 truncate">
                <FaGithub className="text-slate-400 shrink-0" />
                <span className="truncate">{project.repoUrl.replace("https://", "")}</span>
              </span>
              <FaExternalLinkAlt className="text-xs text-slate-500 shrink-0" />
            </a>
          </Card>

          <Card hover={false}>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/15 flex items-center justify-center shrink-0">
                <FaStickyNote className="text-yellow-400 text-xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Notes</h3>
                  <button type="button" className="text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer">Edit</button>
                </div>
                <p className="text-slate-400 text-sm mt-2 leading-6">{project.notes}</p>
              </div>
            </div>
          </Card>

          <Button variant="primary" className="w-full justify-center flex items-center gap-2" onClick={() => onEditProject(project.id)}>
            <FaEdit /> Edit Project
          </Button>
        </div>
      </div>
    </>
  );
}
export default ProjectDetails;