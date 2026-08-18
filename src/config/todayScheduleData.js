const schedule = [
  {
    id: 1,
    title: "Solve 2 DSA Problems",
    time: "9:00 AM",
    priority: "High",
    priorityColor: "bg-red-500",
    completed: false,
    linkedGoal: { goalId: "leetcode-500", type: "counter", amount: 2 },
  },
  {
    id: 2,
    title: "React Revision",
    time: "11:00 AM",
    priority: "Medium",
    priorityColor: "bg-yellow-500",
    completed: true,
    linkedGoal: null,
  },
  {
    id: 3,
    title: "Apply to Microsoft",
    time: "2:00 PM",
    priority: "High",
    priorityColor: "bg-red-500",
    completed: false,
    linkedGoal: { goalId: "crack-10-lpa", type: "milestone", milestoneId: 8 },
  },
  {
    id: 4,
    title: "Workout",
    time: "7:00 PM",
    priority: "Low",
    priorityColor: "bg-green-500",
    completed: false,
    linkedGoal: null,
  },
];

export default schedule;