import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import FilterBar from "../components/common/filters/FilterBar";
import ContestsStatsBar from "../components/contests/ContestsStatsBar";
import UpcomingContestsList from "../components/contests/UpcomingContestsList";
import ContestHistoryTable from "../components/contests/ContestHistoryTable";
import ContestDetails from "../components/contests/ContestDetails";
import AddContestForm from "../components/contests/AddContestForm";
import LogResultForm from "../components/contests/LogResultForm";
import useContests from "../hooks/useContests";
import { getContestsSummary } from "../utils/contestStats";
import { platformOptions } from "../utils/platformOptions";

const STATUS_OPTIONS = ["Upcoming", "Participated"];
const TYPE_OPTIONS = ["Rated", "Unrated"];
const PLATFORM_OPTIONS = platformOptions.map((p) => p.label);

function Contests() {
  const { contests, loading, addContest, editContest, removeContest, logResult, reopenContest } = useContests();
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // non-null => edit modal open
  const [loggingId, setLoggingId] = useState(null); // non-null => log/edit result modal open

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const filteredContests = useMemo(() => {
    return contests.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (platform && c.platform !== platform) return false;
      if (status && c.status !== status) return false;
      if (type && c.type !== type) return false;
      return true;
    });
  }, [contests, search, platform, status, type]);

  const upcoming = useMemo(() => filteredContests.filter((c) => c.status === "Upcoming"), [filteredContests]);
  const history = useMemo(
    () => filteredContests.filter((c) => c.status === "Participated").sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filteredContests]
  );

  const selectedContest = contests.find((c) => c.id === selectedContestId) || null;
  const editingContest = contests.find((c) => c.id === editingId) || null;
  const loggingContest = contests.find((c) => c.id === loggingId) || null;
  const summary = useMemo(() => getContestsSummary(contests), [contests]);

  const openDrawer = (contest) => { setSelectedContestId(contest.id); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleResetFilters = () => {
    setSearch("");
    setPlatform("");
    setStatus("");
    setType("");
  };

  const handleAddContest = (contestDraft) => {
    addContest(contestDraft);
    setIsAddOpen(false);
  };

  const handleEditContest = async (updates) => {
    if (!editingContest) return;
    await editContest(editingContest.id, updates);
    setEditingId(null);
  };

  const handleLogResult = async (resultDraft) => {
    if (!loggingContest) return;
    await logResult(loggingContest.id, resultDraft);
    setLoggingId(null);
  };

  const handleReopen = (contestId) => {
    reopenContest(contestId);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Loading contests...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8 text-white">
      <PageHeader
        title="Contests"
        subtitle="Track coding contests, participate regularly and improve."
        buttonText="Add Contest"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setIsAddOpen(true)}
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search contests..."
        onReset={handleResetFilters}
        filters={[
          { label: "All Platforms", value: platform, onChange: (e) => setPlatform(e.target.value), options: PLATFORM_OPTIONS },
          { label: "All Status", value: status, onChange: (e) => setStatus(e.target.value), options: STATUS_OPTIONS },
          { label: "All Types", value: type, onChange: (e) => setType(e.target.value), options: TYPE_OPTIONS },
        ]}
      />

      <ContestsStatsBar summary={summary} />

      <UpcomingContestsList contests={upcoming} onView={openDrawer} />

      <ContestHistoryTable contests={history} onView={openDrawer} />

      <ContestDetails
        contest={selectedContest}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onEditContest={(id) => setEditingId(id)}
        onLogResult={(id) => setLoggingId(id)}
        onEditResult={(id) => setLoggingId(id)}
        onReopen={handleReopen}
        onDelete={removeContest}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Contest">
        <AddContestForm onSubmit={handleAddContest} onCancel={() => setIsAddOpen(false)} />
      </Modal>

      <Modal isOpen={Boolean(editingContest)} onClose={() => setEditingId(null)} title="Edit Contest">
        <AddContestForm contest={editingContest} onSubmit={handleEditContest} onCancel={() => setEditingId(null)} />
      </Modal>

      <Modal isOpen={Boolean(loggingContest)} onClose={() => setLoggingId(null)} title="Log Contest Result">
        {loggingContest && (
          <LogResultForm contest={loggingContest} onSubmit={handleLogResult} onCancel={() => setLoggingId(null)} />
        )}
      </Modal>
    </div>
  );
}
export default Contests;
