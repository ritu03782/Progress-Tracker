import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import FilterBar from "../components/common/filters/FilterBar";
import ProjectsStatsBar from "../components/projects/ProjectsStatsBar";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectDetails from "../components/projects/ProjectDetails";
import AddProjectForm from "../components/projects/AddProjectForm";
import useProjects from "../hooks/useProjects";
import { getProjectsSummary } from "../utils/projectStats";

const STATUS_OPTIONS = ["Planned", "In Progress", "Completed"];

function Projects() {
  const { projects, loading, toggleTask, addProject } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [technology, setTechnology] = useState("");

  const technologyOptions = useMemo(() => {
    const all = projects.flatMap((p) => p.technologies);
    return [...new Set(all)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (status && p.status !== status) return false;
      if (technology && !p.technologies.includes(technology)) return false;
      return true;
    });
  }, [projects, search, status, technology]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;
  const summary = useMemo(() => getProjectsSummary(projects), [projects]);

  const openDrawer = (project) => { setSelectedProjectId(project.id); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleResetFilters = () => {
    setSearch("");
    setStatus("");
    setTechnology("");
  };

  const handleAddProject = (projectDraft) => {
    addProject(projectDraft);
    setIsAddOpen(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Loading projects...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8 text-white">
      <PageHeader
        title="Projects"
        subtitle="Track your project development and progress."
        buttonText="Add Project"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setIsAddOpen(true)}
      />

      <FilterBar
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search projects..."
        onReset={handleResetFilters}
        filters={[
          { label: "All Status", value: status, onChange: (e) => setStatus(e.target.value), options: STATUS_OPTIONS },
          { label: "All Technologies", value: technology, onChange: (e) => setTechnology(e.target.value), options: technologyOptions },
        ]}
      />

      <ProjectsStatsBar summary={summary} />

      <ProjectGrid projects={filteredProjects} onView={openDrawer} />

      <ProjectDetails
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onToggleTask={toggleTask}
        onEditProject={() => {}}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Project">
        <AddProjectForm onSubmit={handleAddProject} onCancel={() => setIsAddOpen(false)} />
      </Modal>
    </div>
  );
}
export default Projects;