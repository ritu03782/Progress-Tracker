import { FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

function WelcomeBanner() {
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
            Explore Dashboard
            <FaArrowRight className="text-sm" />
          </button>

          <button
            className="
            rounded-xl
            border
            border-white/30
            px-5
            py-2.5
            text-white
            backdrop-blur
            transition-all
            duration-300
            hover:bg-white/10
            cursor-pointer
            "
          >
            View Roadmap
          </button>

        </div>

      </div>
    </section>
  );
}

export default WelcomeBanner;