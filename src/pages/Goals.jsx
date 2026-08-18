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

function Goals() {
  const { goals, completedGoals, loading, toggleGoalMilestone, bumpGoalCounter, addGoal } = useGoalsContext();
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const selectedGoal = goals.find((g) => g.id === selectedGoalId) || null;
  const summary = useMemo(() => getGoalsSummary(goals, completedGoals), [goals, completedGoals]);
  const filteredGoals = useMemo(
    () => (filter === "all" ? goals : goals.filter((g) => getGoalStatus(g) === filter)),
    [goals, filter]
  );

  const openDrawer = (goal) => { setSelectedGoalId(goal.id); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleAddGoal = (goalDraft) => {
    addGoal(goalDraft);
    setIsAddOpen(false);
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

        <GoalsList goals={filteredGoals} onView={openDrawer} />
      </div>

      <CompletedGoals goals={completedGoals} />

      <GoalDetails
        goal={selectedGoal}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onToggleMilestone={toggleGoalMilestone}
        onBumpCounter={bumpGoalCounter}
        onEditGoal={() => {}}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Goal">
        <AddGoalForm onSubmit={handleAddGoal} onCancel={() => setIsAddOpen(false)} />
      </Modal>
    </div>
  );
}
export default Goals;