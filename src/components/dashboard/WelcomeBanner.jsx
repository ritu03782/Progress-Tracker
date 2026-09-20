import { FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

// "Explore Dashboard" was removed — this banner only ever renders on the
// Dashboard itself, so it had nowhere real to go. "View Roadmap" pointed
// at a page that doesn't exist anywhere in the app; repurposed as a real,
// working link to Goals, which is the closest actual concept to a roadmap.
function WelcomeBanner() {
  const navigate = useNavigate();

  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-3xl
      bg-linear-to-r
      from-blue-600
      via-indigo-600
      to-violet-700
      px-8
      py-6
      lg:px-10
      lg:py-7
      shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-blue-500/30
      "
    >
      {/* Background Decorations */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div className="relative max-w-3xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
          <HiSparkles className="text-yellow-300 text-base" />
          <span className="text-sm font-medium text-white">
            Welcome to your learning workspace
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-white leading-tight">
          Welcome to Placement Progress Tracker
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-2xl text-base lg:text-lg text-blue-100 leading-7">
          Organize your DSA, subjects, projects, coding contests and job
          applications in one place. Stay focused, stay consistent and
          move one step closer to your dream placement every day.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/goals")}
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-white
            px-5
            py-2.5
            font-semibold
            text-blue-700
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-2xl
            cursor-pointer
            "
          >
            View Goals
            <FaArrowRight className="text-sm" />
          </button>

        </div>

      </div>
    </section>
  );
}

export default WelcomeBanner;
