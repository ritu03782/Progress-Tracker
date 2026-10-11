import { useState, useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import GoalsSummary from "../components/goals/GoalsSummary";
import GoalsList from "../components/goals/GoalsList";
import CompletedGoals from "../components/goals/CompletedGoals";
import GoalDetails from "../components/goals/GoalDetails";
import AddGoalForm from "../components/goals/AddGoalForm";
import { useGoalsContext } from "../context/GoalsContext";
import { getGoalsSummary, getGoalStatus } from "../utils/goalStats";

// How many Active Goals are shown before "View More" is needed.
const PAGE_SIZE = 5;

function Goals() {
  const { goals, completedGoals, loading, toggleGoalMilestone, bumpGoalCounter, addGoal, editGoal, removeGoal } = useGoalsContext();
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null); // non-null => edit modal open
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE); // "View More" reveal count

  const allGoals = useMemo(() => [...goals, ...completedGoals], [goals, completedGoals]);
  const selectedGoal = allGoals.find((g) => g.id === selectedGoalId) || null;
  const editingGoal = allGoals.find((g) => g.id === editingGoalId) || null;
  const summary = useMemo(() => getGoalsSummary(goals, completedGoals), [goals, completedGoals]);
  const filteredGoals = useMemo(
    () => (filter === "all" ? goals : goals.filter((g) => getGoalStatus(g) === filter)),
    [goals, filter]
  );

  // Reset the reveal count whenever the filter changes, so switching from
  // (say) "All" to "Overdue" doesn't carry over a stale "showing 15" from
  // a completely different filtered list.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter]);

  const visibleGoals = useMemo(() => filteredGoals.slice(0, visibleCount), [filteredGoals, visibleCount]);
  const remainingCount = filteredGoals.length - visibleGoals.length;

  const openDrawer = (goal) => { setSelectedGoalId(goal.id); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleAddGoal = (goalDraft) => {
    addGoal(goalDraft);
    setIsAddOpen(false);
  };

  // Edit Notes and Edit Goal both open the same edit form — notes is just
  // one of the fields it can change.
  const handleEditGoal = async (updates) => {
    if (!editingGoal) return;
    await editGoal(editingGoal.id, updates);
    setEditingGoalId(null);
  };

  const handleDeleteGoal = (goalId) => {
    const goal = allGoals.find((g) => g.id === goalId);
    const confirmed = window.confirm(`Delete "${goal?.title || "this goal"}"? This can't be undone.`);
    if (!confirmed) return;
    removeGoal(goalId);
    closeDrawer();
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") closeDrawer(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Loading goals...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8 text-white">
      <PageHeader
        title="Goals"
        subtitle="Set long-term targets and track your progress."
        buttonText="Add Goal"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setIsAddOpen(true)}
      />

      <GoalsSummary summary={summary} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Active Goals</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
              bg-slate-800 border border-slate-700 rounded-lg px-3 py-2
              text-sm text-slate-300 outline-none hover:border-blue-500
              focus:border-blue-500 transition cursor-pointer
            "
          >
            <option value="all">All Goals</option>
            <option value="active">Active</option>
            <option value="in-progress">In Progress</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <GoalsList goals={visibleGoals} onView={openDrawer} />

        {remainingCount > 0 && (
          <div className="flex justify-center mt-4">
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
      </div>

      <CompletedGoals goals={completedGoals} />

      <GoalDetails
        goal={selectedGoal}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onToggleMilestone={toggleGoalMilestone}
        onBumpCounter={bumpGoalCounter}
        onEditGoal={(goalId) => setEditingGoalId(goalId)}
        onEditNotes={(goalId) => setEditingGoalId(goalId)}
        onDelete={handleDeleteGoal}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Goal">
        <AddGoalForm onSubmit={handleAddGoal} onCancel={() => setIsAddOpen(false)} />
      </Modal>

      <Modal isOpen={Boolean(editingGoal)} onClose={() => setEditingGoalId(null)} title="Edit Goal">
        <AddGoalForm goal={editingGoal} onSubmit={handleEditGoal} onCancel={() => setEditingGoalId(null)} />
      </Modal>
    </div>
  );
}
export default Goals;
