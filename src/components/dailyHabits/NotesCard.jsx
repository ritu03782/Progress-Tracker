import { useState, useEffect } from "react";
import { isToday, formatDistanceToNow } from "date-fns";
import {
  FaRegStickyNote,
  FaSave,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";
import useNote from "../../hooks/useNote";

const moods = [
  "😁",
  "😊",
  "😐",
  "😔",
  "😴",
];

// Notes are per-day now, tied to whichever date is selected in
// DateNavigator — not a single eternal note. Editing a past day's note is
// allowed (same as browsing to a past day should let you see/fix what you
// wrote then).
function NotesCard({ date }) {
  const { note, loading, saving, save } = useNote(date);
  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  // Sync local draft whenever the fetched note changes (new date navigated
  // to, or right after a save completes).
  useEffect(() => {
    if (note) {
      setText(note.text || "");
      setSelectedMood(note.mood || "");
    }
  }, [note]);

  const handleSave = () => {
    save({ text, mood: selectedMood });
  };

  const viewingToday = isToday(date);

  return (
    <Card
      title="📝 Daily Notes"
      subtitle="Quick reminders, ideas & reflections"
      hover={false}
      className="relative overflow-hidden"
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -bottom-24
          -right-24
          w-64
          h-64
          rounded-full
          bg-violet-500/10
          blur-3xl
          pointer-events-none
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-5">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-violet-500/15
                flex
                items-center
                justify-center
              "
            >
              <FaRegStickyNote className="text-violet-400 text-lg" />
            </div>

            <div>

              <h3 className="text-white font-semibold">
                {viewingToday ? "Today's Notes" : "Notes for this day"}
              </h3>

              <p className="text-xs text-slate-500">
                {loading ? "Loading..." : "Saved to your account"}
              </p>

            </div>

          </div>

          <Button
            variant="secondary"
            className="px-4"
            onClick={handleSave}
            disabled={loading || saving}
          >
            <FaSave />
            {saving ? "Saving..." : "Save"}
          </Button>

        </div>

        {/* Mood */}

        <div className="mb-6">

          <div className="flex justify-between items-center mb-3">

            <span className="text-sm font-medium text-slate-300">
              {viewingToday ? "How are you feeling today?" : "How were you feeling?"}
            </span>

            <span className="text-xs text-slate-500">
              Mood
            </span>

          </div>

          <div className="flex gap-3">

            {moods.map((mood) => (

              <button
                key={mood}
                onClick={() =>
                  setSelectedMood(mood)
                }
                className={`
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  transition-all
                  duration-200

                  ${
                    selectedMood === mood
                      ? "bg-violet-500/20 border border-violet-500 shadow-lg shadow-violet-500/20 scale-105"
                      : "bg-slate-800 border border-slate-700 hover:border-slate-500"
                  }
                `}
              >
                {mood}
              </button>

            ))}

          </div>

        </div>

        {/* Textarea */}

        <textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder={viewingToday ? "Write today's notes..." : "Write notes for this day..."}
          className="
            w-full
            h-56
            resize-none
            rounded-xl
            border
            border-slate-700
            bg-slate-900/70
            p-4
            text-sm
            text-slate-200
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-200
            focus:border-violet-500
            focus:ring-2
            focus:ring-violet-500/20
          "
        />

        {/* Footer */}

        <div
          className="
            mt-5
            pt-4
            border-t
            border-slate-800
            flex
            justify-between
            items-center
            flex-wrap
            gap-4
          "
        >

          <div className="flex items-center gap-2">

            <span className="text-xs text-slate-500">
              Mood
            </span>

            <span className="text-lg">
              {selectedMood || "—"}
            </span>

          </div>

          <span className="text-xs text-slate-500">
            {text.length} characters
          </span>

          <span className="text-xs text-slate-500">
            {note?.updatedAt
              ? `Last edited: ${formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}`
              : "Not saved yet"}
          </span>

        </div>

      </div>

    </Card>
  );
}

export default NotesCard;
