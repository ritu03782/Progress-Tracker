import { useMemo, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import FilterBar from "../components/common/filters/FilterBar";
import StatCardsRow from "../components/applications/StatCardsRow";
import StatusTabs from "../components/applications/StatusTabs";
import ApplicationsTable from "../components/applications/ApplicationsTable";
import ApplicationDetails from "../components/applications/ApplicationDetails";
import AddApplicationForm from "../components/applications/AddApplicationForm";
import useApplications from "../hooks/useApplications";
import { getApplicationsSummary } from "../utils/applicationStats";

// How many rows are shown in the table before "View More" is needed.
const PAGE_SIZE = 10;

function Applications() {
  const {
    applications,
    loading,
    addApplication,
    editApplication,
    updateNotes,
    removeApplication,
    advanceStage,
    rejectApp,
    reopenApp,
  } = useApplications();
  const [selectedId, setSelectedId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // non-null => edit modal open

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE); // "View More" reveal count

  const roleOptions = useMemo(() => [...new Set(applications.map((a) => a.role))], [applications]);
  const jobTypeOptions = useMemo(() => [...new Set(applications.map((a) => a.jobType))], [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((a) => {
      if (search && !a.company.toLowerCase().includes(search.toLowerCase()) && !a.role.toLowerCase().includes(search.toLowerCase())) return false;
      if (role && a.role !== role) return false;
      if (companyType && a.jobType !== companyType) return false;
      if (activeStatus !== "All" && a.status !== activeStatus) return false;
      return true;
    });
  }, [applications, search, role, companyType, activeStatus]);

  // Reset the reveal count whenever any filter/search changes, so a
  // previous "showing 30" doesn't carry over into an unrelated, possibly
  // much shorter, filtered result set.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, role, companyType, activeStatus]);

  const visibleApplications = useMemo(
    () => filteredApplications.slice(0, visibleCount),
    [filteredApplications, visibleCount]
  );
  const remainingCount = filteredApplications.length - visibleApplications.length;

  const selectedApplication = applications.find((a) => a.id === selectedId) || null;
  const editingApplication = applications.find((a) => a.id === editingId) || null;
  const summary = useMemo(() => getApplicationsSummary(applications), [applications]);

  const openDrawer = (app) => { setSelectedId(app.id); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleResetFilters = () => {
    setSearch("");
    setRole("");
    setCompanyType("");
    setActiveStatus("All");
  };

  const handleAddApplication = (draft) => {
    addApplication(draft);
    setIsAddOpen(false);
  };

  const handleEditApplication = async (updates) => {
    if (!editingApplication) return;
    await editApplication(editingApplication.id, updates);
    setEditingId(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Loading applications...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-6 text-white">
      <PageHeader
        title="Applications"
        subtitle="Track your job applications and stay prepared."
        buttonText="Add Application"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setIsAddOpen(true)}
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search applications..."
        onReset={handleResetFilters}
        filters={[
          { label: "All Roles", value: role, onChange: (e) => setRole(e.target.value), options: roleOptions },
          { label: "All Status", value: activeStatus === "All" ? "" : activeStatus, onChange: (e) => setActiveStatus(e.target.value || "All"), options: ["Applied", "OA", "Interview", "Offer", "Rejected"] },
          { label: "All Company Type", value: companyType, onChange: (e) => setCompanyType(e.target.value), options: jobTypeOptions },
        ]}
      />

      <StatusTabs counts={summary} activeStatus={activeStatus} onChange={setActiveStatus} />

      <StatCardsRow summary={summary} size="compact" />

      <ApplicationsTable applications={visibleApplications} onView={openDrawer} onDelete={removeApplication} />

      {remainingCount > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="
              px-5 py-2 rounded-lg bg-slate-800 border border-slate-700
              text-sm font-medium text-slate-300
              hover:border-blue-500 hover:text-white transition cursor-pointer
            "
          >
            View More ({remainingCount} remaining)
          </button>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Application Insights</h2>
        <StatCardsRow summary={summary} size="large" />
      </div>

      <ApplicationDetails
        application={selectedApplication}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onUpdateNotes={updateNotes}
        onDeleteApplication={removeApplication}
        onEditApplication={(id) => setEditingId(id)}
        onAdvanceStage={advanceStage}
        onReject={rejectApp}
        onReopen={reopenApp}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Application">
        <AddApplicationForm onSubmit={handleAddApplication} onCancel={() => setIsAddOpen(false)} />
      </Modal>

      <Modal isOpen={Boolean(editingApplication)} onClose={() => setEditingId(null)} title="Edit Application">
        <AddApplicationForm application={editingApplication} onSubmit={handleEditApplication} onCancel={() => setEditingId(null)} />
      </Modal>
    </div>
  );
}
export default Applications;
