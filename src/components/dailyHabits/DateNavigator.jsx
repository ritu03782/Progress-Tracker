import { useState, useRef, useEffect } from "react";
import { addDays, subDays, format, isToday } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";

import Button from "../common/Button";

function DateNavigator() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="flex justify-center mb-8 ">

      <div
        className="
        relative
        w-full
        max-w-3xl
        flex
        items-center
        justify-between
        rounded-2xl
        bg-slate-950
        border
        border-slate-800
        p-2
        shadow-lg
        hover:border-blue-500/30
        hover:shadow-blue-500/10
        transition-all
        duration-300
        "
      >

        {/* Previous */}

        <Button
          variant="secondary"
          className="w-12 h-12 p-0"
          onClick={() =>
            setSelectedDate(subDays(selectedDate, 1))
          }
        >
          <FaChevronLeft />
        </Button>

        {/* Date */}

        <button
          onClick={() =>
            setShowCalendar(!showCalendar)
          }
          className="
          flex
          items-center
          gap-3
          rounded-xl
          px-5
          py-3
          text-white
          hover:-translate-y-0.5
         hover:text-blue-400
          transition-all
          duration-300
          cursor-pointer
          "
        >
          <FaCalendarAlt className="text-blue-400" />

          <span className="text-lg md:text-xl font-semibold">
            {format(
              selectedDate,
              "EEEE, dd MMMM yyyy"
            )}
          </span>

          <FaChevronDown
            className={`transition-transform ${
              showCalendar ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Next */}

        <Button
          variant="secondary"
          className="w-12 h-12 p-0"
          disabled={isToday(selectedDate)}
          onClick={() =>
            setSelectedDate(addDays(selectedDate, 1))
          }
        >
          <FaChevronRight />
        </Button>

        {/* Calendar Popup */}

        {showCalendar && (
          <div
            ref={calendarRef}
            className="
            absolute
            top-20
            left-1/2
            -translate-x-1/2
            z-50

            rounded-2xl
            border
            border-slate-700
            bg-[#111827]
            shadow-2xl

            p-4
            "
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;

                setSelectedDate(date);
                setShowCalendar(false);
              }}
              disabled={{
                after: new Date(),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DateNavigator;