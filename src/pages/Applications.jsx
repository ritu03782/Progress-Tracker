import { useMemo, useState } from "react";
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
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const roleOptions = useMemo(
    () => [...new Set(applications.map((a) => a.role).filter(Boolean))],
    [applications]
  );

  const jobTypeOptions = useMemo(
    () => [...new Set(applications.map((a) => a.jobType).filter(Boolean))],
    [applications]
  );

  const filteredApplications = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return applications.filter((a) => {
      if (
        searchTerm &&
        !a.company?.toLowerCase().includes(searchTerm) &&
        !a.role?.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }

      if (role && a.role !== role) return false;
      if (companyType && a.jobType !== companyType) return false;
      if (activeStatus !== "All" && a.status !== activeStatus) return false;

      return true;
    });
  }, [applications, search, role, companyType, activeStatus]);

  const selectedApplication =
    applications.find((a) => a.id === selectedId) || null;

  const editingApplication =
    applications.find((a) => a.id === editingId) || null;

  const summary = useMemo(
    () => getApplicationsSummary(applications),
    [applications]
  );

  const openDrawer = (app) => {
    setSelectedId(app.id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setSearch("");
    setRole("");
    setCompanyType("");
    setActiveStatus("All");
  };

  const handleAddApplication = async (draft) => {
    await addApplication(draft);
    setIsAddOpen(false);
  };

  const handleEditApplication = async (updates) => {
    if (!editingApplication) return;

    await editApplication(editingApplication.id, updates);
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8 text-white">
      {/* Header */}
      <PageHeader
        title="Applications"
        subtitle="Track your job applications and stay prepared."
        buttonText="Add Application"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setIsAddOpen(true)}
      />

      {/* Insights Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Application Insights
        </h2>

        <StatCardsRow
          summary={summary}
          size="large"
        />
      </section>

      {/* Filters */}
      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search applications..."
        onReset={handleResetFilters}
        filters={[
          {
            label: "All Roles",
            value: role,
            onChange: (e) => setRole(e.target.value),
            options: roleOptions,
          },
          {
            label: "All Status",
            value: activeStatus === "All" ? "" : activeStatus,
            onChange: (e) =>
              setActiveStatus(e.target.value || "All"),
            options: [
              "Applied",
              "OA",
              "Interview",
              "Offer",
              "Rejected",
            ],
          },
          {
            label: "All Company Type",
            value: companyType,
            onChange: (e) => setCompanyType(e.target.value),
            options: jobTypeOptions,
          },
        ]}
      />

      {/* Status Tabs */}
      <StatusTabs
        counts={summary}
        activeStatus={activeStatus}
        onChange={setActiveStatus}
      />

      {/* Applications Table */}
      <ApplicationsTable
        applications={filteredApplications}
        onView={openDrawer}
        onDelete={removeApplication}
      />

      {/* Application Details Drawer */}
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

      {/* Add Application Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Application"
      >
        <AddApplicationForm
          onSubmit={handleAddApplication}
          onCancel={() => setIsAddOpen(false)}
        />
      </Modal>

      {/* Edit Application Modal */}
      <Modal
        isOpen={Boolean(editingApplication)}
        onClose={() => setEditingId(null)}
        title="Edit Application"
      >
        <AddApplicationForm
          application={editingApplication}
          onSubmit={handleEditApplication}
          onCancel={() => setEditingId(null)}
        />
      </Modal>
    </div>
  );
}

export default Applications;