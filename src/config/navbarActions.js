import { FcSearch } from "react-icons/fc";
// Notifications is now its own dedicated NotificationBell component (real
// data, not a decorative icon) — removed from this generic list.
// Theme removed entirely, same call as removing it from Settings: it had
// no visual effect anywhere in the app.
const actions = [
  {
    icon: FcSearch,
    label: "Search",
    iconColor: "",
  },
];
export default actions;
