import {
  FaXmark,
  FaCrown,
  FaArrowTrendUp,
  FaCircleXmark,
  FaArrowUpRightFromSquare,
  FaPenToSquare,
  FaCalendarDays,
  FaClock,
  FaCircleCheck,
  FaNoteSticky,
} from "react-icons/fa6";

import Card from "../common/Card";
import Button from "../common/Button";
import { getPlatformStyle } from "../../utils/contestStats";
import { platformOptions } from "../../utils/platformOptions";

function ContestDetails({ contest, isOpen, onClose, onEditContest }) {
  if (!contest) return null;

  const { icon: Icon, color } = getPlatformStyle(
    platformOptions,
    contest.platform
  );

  const isParticipated = contest.status === "Participated";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85%] sm:w-[45%] bg-[#0F172A] border-l border-slate-800 shadow-2xl z-50 transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-800">
          <div className="flex gap-4 items-center min-w-0">
            {/* Platform Icon */}
            <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
              <Icon className={`text-xl ${color}`} />
            </div>

            {/* Contest Name & Status */}
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white truncate">
                {contest.name}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-slate-400">
                  {contest.platform}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    isParticipated
                      ? "bg-green-500/15 text-green-400"
                      : "bg-violet-500/15 text-violet-400"
                  }`}
                >
                  {contest.status}
                </span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition cursor-pointer flex items-center justify-center shrink-0"
          >
            <FaXmark />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto h-[calc(100vh-98px)]">
          {/* Contest Information */}
          <Card hover={false}>
            <div className="grid grid-cols-2 gap-5">
              {/* Date */}
              <div>
                <p className="text-xs text-slate-500">
                  Date
                </p>

                <p className="flex items-center gap-1.5 text-sm text-white font-medium mt-1">
                  <FaCalendarDays className="text-slate-400" />
                  {contest.date}
                </p>
              </div>

              {/* Start Time */}
              <div>
                <p className="text-xs text-slate-500">
                  Start Time
                </p>

                <p className="text-sm text-white font-medium mt-1">
                  {contest.startTime}
                </p>
              </div>

              {/* Duration */}
              <div>
                <p className="text-xs text-slate-500">
                  Duration
                </p>

                <p className="flex items-center gap-1.5 text-sm text-white font-medium mt-1">
                  <FaClock className="text-slate-400" />
                  {contest.duration}
                </p>
              </div>

              {/* Type */}
              <div>
                <p className="text-xs text-slate-500">
                  Type
                </p>

                <p className="text-sm text-white font-medium mt-1">
                  {contest.type}
                </p>
              </div>
            </div>
          </Card>

          {/* Participated Contest */}
          {isParticipated ? (
            <>
              {/* Performance */}
              <Card hover={false}>
                <h3 className="text-white font-semibold mb-4">
                  Performance
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Rank */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0">
                      <FaCrown className="text-violet-400" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Rank
                      </p>

                      <p className="text-sm text-white font-semibold">
                        {contest.rank} / {contest.totalParticipants}
                      </p>
                    </div>
                  </div>

                  {/* Rating Change */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
                      <FaArrowTrendUp className="text-green-400" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Rating Change
                      </p>

                      <p className="text-sm text-green-400 font-semibold">
                        +{contest.ratingChange}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score Details */}
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                  {/* Score */}
                  <div>
                    <p className="text-xs text-slate-500">
                      Score
                    </p>

                    <p className="text-sm text-white font-semibold mt-1">
                      {contest.score}
                    </p>
                  </div>

                  {/* Solved */}
                  <div>
                    <p className="text-xs text-slate-500">
                      Solved
                    </p>

                    <p className="text-sm text-white font-semibold mt-1">
                      {contest.solved} / {contest.totalProblems}
                    </p>
                  </div>

                  {/* Penalty */}
                  <div>
                    <p className="text-xs text-slate-500">
                      Penalty
                    </p>

                    <p className="text-sm text-white font-semibold mt-1">
                      {contest.penalty}
                    </p>
                  </div>

                  {/* Percentage */}
                  <div>
                    <p className="text-xs text-slate-500">
                      Percentage
                    </p>

                    <p className="text-sm text-white font-semibold mt-1">
                      {contest.percentage}%
                    </p>
                  </div>
                </div>
              </Card>

              {/* Problems Summary */}
              <Card hover={false}>
                <h3 className="text-white font-semibold mb-3">
                  Problems Summary
                </h3>

                <div className="space-y-2">
                  {contest.problems.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-300 truncate">
                        <span className="text-slate-500 mr-1.5">
                          {p.id} -
                        </span>
                        {p.name}
                      </span>

                      <span className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-slate-400">
                          {p.points}
                        </span>

                        {p.solved ? (
                          <FaCircleCheck className="text-green-500" />
                        ) : (
                          <FaCircleXmark className="text-red-500" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Notes */}
              <Card hover={false}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/15 flex items-center justify-center shrink-0">
                    <FaNoteSticky className="text-yellow-400 text-xl" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold">
                        Notes
                      </h3>

                      <button
                        type="button"
                        className="text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="text-slate-400 text-sm mt-2 leading-6">
                      {contest.notes}
                    </p>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            /* Upcoming Contest */
            <Card
              hover={false}
              className="text-center py-6"
            >
              <p className="text-slate-400 text-sm">
                This contest hasn't happened yet.
              </p>

              <a
                href={contest.registrationLink}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="primary"
                  className="mt-4"
                >
                  Register Now
                </Button>
              </a>
            </Card>
          )}

          {/* Bottom Actions */}
          <div className="flex gap-3">
            {/* View Contest */}
            <a
              href={contest.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1"
            >
              <Button
                variant="primary"
                className="w-full justify-center flex items-center gap-2"
              >
                View Contest
                <FaArrowUpRightFromSquare className="text-xs" />
              </Button>
            </a>

            {/* Edit Contest */}
            <Button
              variant="secondary"
              className="flex-1 justify-center flex items-center gap-2"
              onClick={() => onEditContest(contest.id)}
            >
              <FaPenToSquare />
              Edit Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestDetails;