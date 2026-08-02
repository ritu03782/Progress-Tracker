import { useState } from "react";
import {
  FaRegStickyNote,
  FaSave,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";

const moods = [
  "😁",
  "😊",
  "😐",
  "😔",
  "😴",
];

function NotesCard() {
  const [notes, setNotes] = useState(
    "• Solve today's DSA problem.\n• Revise React Router.\n• Drink at least 3L water."
  );

  const [selectedMood, setSelectedMood] =
    useState("😊");

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
                Today's Notes
              </h3>

              <p className="text-xs text-slate-500">
                Auto saves when backend is connected
              </p>

            </div>

          </div>

          <Button
            variant="secondary"
            className="px-4"
          >
            <FaSave />
            Save
          </Button>

        </div>

        {/* Mood */}

        <div className="mb-6">

          <div className="flex justify-between items-center mb-3">

            <span className="text-sm font-medium text-slate-300">
              How are you feeling today?
            </span>

            <span className="text-xs text-slate-500">
              Daily Mood
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
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Write today's notes..."
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
              {selectedMood}
            </span>

          </div>

          <span className="text-xs text-slate-500">
            {notes.length} characters
          </span>

          <span className="text-xs text-slate-500">
            Last edited: Just now
          </span>

        </div>

      </div>

    </Card>
  );
}

export default NotesCard;