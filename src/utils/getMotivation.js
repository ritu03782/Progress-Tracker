function getMotivation(completed, total) {
  const percentage = Math.round((completed / total) * 100);

  if (percentage === 100) {
    return {
      title: "Fantastic! You completed all your habits today.",
      emoji: "🏆",
      color: "text-green-400",
      progressColor: "linear-gradient(90deg,#22C55E,#16A34A)",
      percentageColor: "#22C55E",
    };
  }

  if (percentage >= 75) {
    return {
      title: "Great work! You're almost done.",
      emoji: "⭐",
      color: "text-orange-400",
      progressColor: "linear-gradient(90deg,#22C55E,#3B82F6)",
      percentageColor: "#3B82F6",
    };
  }

  if (percentage >= 50) {
    return {
      title: "Halfway there. Stay focused!",
      emoji: "🚀",
      color: "text-blue-400",
      progressColor: "linear-gradient(90deg,#3B82F6,#06B6D4)",
      percentageColor: "#3B82F6",
    };
  }

  if (percentage >= 25) {
    return {
      title: "Nice start! Keep the momentum going.",
      emoji: "💪",
      color: "text-yellow-400",
      progressColor: "linear-gradient(90deg,#FACC15,#F59E0B)",
      percentageColor: "#FACC15",
    };
  }

  return {
    title: "Let's get started! Every streak begins with one task.",
    emoji: "🌱",
    color: "text-emerald-400",
    progressColor: "linear-gradient(90deg,#10B981,#22C55E)",
    percentageColor: "#10B981",
  };
}

export default getMotivation;