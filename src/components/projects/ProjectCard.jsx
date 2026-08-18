import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import { getProjectProgress, getStatusBadgeClass } from "../../utils/projectStats";

function ProjectCard({ project, onView }) {
  const Icon = project.icon;
  const progress = getProjectProgress(project);
  const completedCount = project.tasks.filter((t) => t.completed).length;

  return (
    <Card hover={false} className="cursor-pointer hover:border-blue-500/30 transition-colors" onClick={() => onView(project)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${project.bg}`}>
            <Icon className={`text-lg ${project.color}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white truncate">{project.name}</h3>
              <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
        <span className="text-lg font-bold text-green-400 shrink-0">{progress}%</span>
      </div>

      <p className="text-sm text-slate-400 mt-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <ProgressBar value={progress} color={project.barColor} />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{completedCount} / {project.tasks.length} tasks completed</span>
        <span className="flex items-center gap-1.5">
          <FaCalendarAlt className="text-[10px]" /> {project.lastUpdated}
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onView(project); }}
        className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 hover:gap-2.5 transition-all cursor-pointer"
      >
        View Project <FaArrowRight className="text-xs" />
      </button>
    </Card>
  );
}
export default ProjectCard;