import ProjectCard from "./ProjectCard";

function ProjectGrid({ projects, onView }) {
  if (projects.length === 0) {
    return <p className="text-sm text-slate-500">No projects match this filter.</p>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onView={onView} />
      ))}
    </div>
  );
}
export default ProjectGrid;