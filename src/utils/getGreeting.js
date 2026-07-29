export function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return {greeting:"Good Morning",icon:"☀️",};
    if (hour >= 12 && hour < 17) return {greeting:"Good Afternoon",icon:"🌤️" };
    if (hour >= 17 && hour < 21) return {greeting:"Good Evening",icon:"🌇"};
    return {greeting:"Good Night",icon:"🌙"};
}
