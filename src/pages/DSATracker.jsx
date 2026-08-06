import { useMemo, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import FilterBar from "../components/common/filters/FilterBar";
import StatsRow from "../components/dsa/StatsRow";
import ProblemsTable from "../components/dsa/ProblemsTable";
import FavouriteQuestions from "../components/dsa/FavouriteQuestions";
import TopicProgress from "../components/dsa/TopicProgress";
import PlatformStats from "../components/dsa/PlatformStats";
import WeakTopics from "../components/dsa/WeakTopics";
import RevisionQueue from "../components/dsa/RevisionQueue";
import { FaCode } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import Button from "../components/common/Button";

import dsaProblemsData from "../config/dsaProblems";
import favouriteQuestions from "../config/favouriteQuestions";
import topicProgress from "../config/topicProgress";
import weakTopics from "../config/weakTopics";
import revisionQueueData from "../config/revisionQueue";

const TOPIC_OPTIONS = ["Arrays", "Linked List", "Sliding Window", "BFS", "DFS", "DP", "Design"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const STATUS_OPTIONS = ["Solved", "Attempted"];
const PLATFORM_OPTIONS = ["LeetCode", "GeeksforGeeks", "Codeforces", "CodeChef"];

function DSATracker() {
  const [problems, setProblems] = useState(dsaProblemsData);
  const [revisionQueue, setRevisionQueue] = useState(revisionQueueData);

  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (topic && p.topic !== topic) return false;
      if (difficulty && p.difficulty !== difficulty) return false;
      if (status && p.status !== status) return false;
      if (platform && p.platform !== platform) return false;
      return true;
    });
  }, [problems, search, topic, difficulty, status, platform]);

  function handleResetFilters() {
    setSearch("");
    setTopic("");
    setDifficulty("");
    setStatus("");
    setPlatform("");
  }

  function handleToggleFavourite(id) {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favourite: !p.favourite } : p))
    );
  }

  function handleToggleRevisionItem(tab, id) {
    setRevisionQueue((prev) => ({
      ...prev,
      [tab]: prev[tab].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-6 text-white">
      <PageHeader
        icon={<FaCode />}
        title="DSA Tracker"
        subtitle="Track your coding interview preparation and improve every day."
        buttonText="Add Problem"
        buttonIcon={<FaPlus />}
      >
        <Button
          variant="secondary"
          className="w-45 flex gap-3 justify-center items-center"
        >
          <FiUpload />
          Import Sheet
        </Button>
      </PageHeader>

      <FilterBar
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Search problems..."
        onReset={handleResetFilters}
        filters={[
          {
            label: "All Topics",
            value: topic,
            onChange: (e) => setTopic(e.target.value),
            options: TOPIC_OPTIONS,
          },
          {
            label: "All Difficulties",
            value: difficulty,
            onChange: (e) => setDifficulty(e.target.value),
            options: DIFFICULTY_OPTIONS,
          },
          {
            label: "All Status",
            value: status,
            onChange: (e) => setStatus(e.target.value),
            options: STATUS_OPTIONS,
          },
          {
            label: "All Platforms",
            value: platform,
            onChange: (e) => setPlatform(e.target.value),
            options: PLATFORM_OPTIONS,
          },
        ]}
      />

      <StatsRow />

{/* Problems + Favourite */}
<section className="mt-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
  <div className="xl:col-span-8">
    <ProblemsTable
      problems={filteredProblems}
      onToggleFavourite={handleToggleFavourite}
      className="h-full"
    />
  </div>

  <div className="xl:col-span-4">
    <FavouriteQuestions
      questions={favouriteQuestions}
      className="h-full"
    />
  </div>
</section>

{/* Topic + Platform */}
<section className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
  <TopicProgress
    topics={topicProgress}
    className="h-full"
  />

  <PlatformStats
    className="h-full"
  />
</section>

{/* Weak + Revision */}
<section className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10">
  <WeakTopics
    topics={weakTopics}
    className="h-full"
  />

  <RevisionQueue
    queue={revisionQueue}
    onToggleItem={handleToggleRevisionItem}
    className="h-full"
  />
</section></div>
  );
}

export default DSATracker;

