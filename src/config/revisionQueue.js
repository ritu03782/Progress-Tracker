export const revisionTabs = [
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "thisWeek", label: "This Week" },
  { id: "overdue", label: "Overdue", badge: 4 },
];

const revisionQueue = {
  today: [
    { id: 1, name: "Binary Search", difficulty: "Easy", checked: false },
    { id: 2, name: "House Robber", difficulty: "Medium", checked: true },
    { id: 3, name: "Merge Intervals", difficulty: "Medium", checked: false },
    { id: 4, name: "LRU Cache", difficulty: "Hard", checked: false },
    { id: 5, name: "Graph BFS", difficulty: "Medium", checked: false },
  ],
  tomorrow: [],
  thisWeek: [],
  overdue: [],
};

export default revisionQueue;
