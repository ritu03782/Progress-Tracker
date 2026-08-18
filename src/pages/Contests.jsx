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
import useContests from "../hooks/useContests";
import { getContestsSummary } from "../utils/contestStats";
import { platformOptions } from "../utils/platformOptions";

const STATUS_OPTIONS = ["Upcoming", "Participated"];
const TYPE_OPTIONS = ["Rated", "Unrated"];
const PLATFORM_OPTIONS = platformOptions.map((p) => p.label);

function Contests() {
  const { contests, loading, addContest } = useContests();
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

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
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search contests..."
        onReset={handleResetFilters}
        filters={[
          { label: "All Platforms", value: platform, onChange: (e) => setPlatform(e.target.value), options: PLATFORM_OPTIONS },
          { label: "All Status", value: status, onChange: (e) => setStatus(e.target.value), options: STATUS_OPTIONS },
          { label: "All Types", value: type, onChange: (e) => setType(e.target.value), options: TYPE_OPTIONS },
        ]}
      />

      <ContestsStatsBar summary={summary} />

      <UpcomingContestsList contests={upcoming} onView={openDrawer} onViewAll={() => {}} />

      <ContestHistoryTable contests={history} onView={openDrawer} onViewAll={() => {}} />

      <ContestDetails
        contest={selectedContest}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onEditContest={() => {}}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Contest">
        <AddContestForm onSubmit={handleAddContest} onCancel={() => setIsAddOpen(false)} />
      </Modal>
    </div>
  );
}
export default Contests;