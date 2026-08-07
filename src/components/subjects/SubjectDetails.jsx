import { FaTimes, FaFire, FaClock, FaFlag, FaStickyNote, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";
import SubjectTopic from "./SubjectTopic";
import { getSubjectProgress, getWeakTopics } from "../../utils/subjectStats";

function SubjectDetails({ subject, isOpen, onClose, onToggleTopic, onEditNotes, onEditSubject }) {
  if (!subject) return null;

  const progress = getSubjectProgress(subject);
  const completedCount = subject.topics.filter((t) => t.completed).length;
  const weakTopics = getWeakTopics(subject, 3);
  const Icon = subject.icon;

  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <div
        className={`
          fixed top-0 right-0 h-screen
          lg:w-[40%] sm:w-[70%] max-width:[440px]
          bg-[#0F172A] border-l border-slate-800 shadow-2xl z-50
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-800">
          <div className="flex gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${subject.bg}`}>
              <Icon className={`text-2xl ${subject.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{subject.name}</h2>
              <p className="text-sm text-slate-400">{subject.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              w-10 h-10 rounded-xl bg-slate-800 text-slate-400
              hover:bg-slate-700 hover:text-white transition
              cursor-pointer flex items-center justify-center shrink-0
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto h-[calc(100vh-158px)]">
          {/* Overall progress */}
          <Card hover={false}>
            <div className="flex justify-between items-center mb-4">
              <p className="text-slate-400 text-sm">Overall Progress</p>
              <span className="text-xl font-bold text-white">{progress}%</span>
            </div>
            <ProgressBar value={progress} color={subject.barColor} height="h-3" />
          </Card>

          {/* Study Hours & Streak */}
          <div className="grid grid-cols-2 gap-4">
            <Card hover={false} className="bg-linear-to-br from-blue-500/10 to-transparent">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Study Hours</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{subject.studyHours}h</h2>
                </div>
                <FaClock className="text-3xl text-blue-400" />
              </div>
            </Card>

            <Card hover={false} className="bg-linear-to-br from-orange-500/10 to-transparent">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Streak</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{subject.streak}d</h2>
                </div>
                <FaFire className="text-3xl text-orange-400" />
              </div>
            </Card>
          </div>

          {/* Topics */}
          <Card hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Topics</h3>
              <span className="text-xs text-slate-500">{completedCount}/{subject.topics.length}</span>
            </div>
            <div className="space-y-1">
              {subject.topics.map((topic) => (
                <SubjectTopic
                  key={topic.id}
                  topic={topic}
                  interactive
                  showProgress
                  onToggle={(topicId) => onToggleTopic(subject.id, topicId)}
                />
              ))}
            </div>
          </Card>

          {/* Weak Topics */}
          {weakTopics.length > 0 && (
            <Card hover={false} className="bg-linear-to-r from-red-500/10 to-transparent">
              <h3 className="flex items-center gap-2 text-white font-semibold mb-4">
                <FaFlag className="text-red-500" /> Weak Topics
              </h3>
              <div className="space-y-3">
                {weakTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 truncate text-sm text-slate-300">{topic.name}</span>
                    <ProgressBar value={topic.progress} color="#EF4444" className="flex-1" height="h-1.5" />
                    <span className="w-9 shrink-0 text-right text-xs text-slate-400">{topic.progress}%</span>
                    <Button size="sm" variant="secondary">Practice</Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Notes */}
          <Card hover={false}>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <FaStickyNote className="text-blue-400 text-xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Study Notes</h3>
                  <button
                    type="button"
                    onClick={() => onEditNotes(subject.id)}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    Edit Notes
                  </button>
                </div>
                <p className="text-slate-400 text-sm mt-2 leading-6">{subject.notes}</p>
              </div>
            </div>
          </Card>

          {/* Resources */}
          <Card hover={false}>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <div className="space-y-2">
              {subject.resources.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-sm text-slate-300 hover:text-blue-400 transition-colors"
                >
                  {res.label}
                  <FaExternalLinkAlt className="text-xs text-slate-500" />
                </a>
              ))}
            </div>
          </Card>

          <Button
            variant="primary"
            className="w-full justify-center flex items-center gap-2"
            onClick={() => onEditSubject(subject.id)}
          >
            <FaEdit /> Edit Subject
          </Button>
        </div>
      </div>
    </>
  );
}

export default SubjectDetails;