import { getInitials } from "../../utils/profileFormat";

function Avatar({ name, src, size = "w-24 h-24", textSize = "text-2xl" }) {
  if (src) {
    return <img src={src} alt={name} className={`${size} rounded-full object-cover border-2 border-slate-800`} />;
  }

  return (
    <div className={`${size} rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center shrink-0`}>
      <span className={`${textSize} font-bold text-violet-300`}>{getInitials(name)}</span>
    </div>
  );
}
export default Avatar;