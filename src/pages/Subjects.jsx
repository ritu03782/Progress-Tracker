import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import SubjectsStatsBar from "../components/subjects/SubjectsStatsBar";
import SubjectGrid from "../components/subjects/SubjectGrid";
import NeedsAttention from "../components/subjects/NeedsAttention";
import RecentlyStudied from "../components/subjects/RecentlyStudied";
import SubjectDetails from "../components/subjects/SubjectDetails";
import AddSubjectForm from "../components/subjects/AddSubjectForm";
import useSubjects from "../hooks/useSubjects";
import { getOverallStats } from "../utils/subjectStats";

function Subjects() {
  const { subjects, loading, toggleTopic, addSubject } = useSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || null;
  const stats = useMemo(() => getOverallStats(subjects), [subjects]);

  const recentlyStudied = useMemo(() => {
    return subjects
      .map((subject) => {
        const lastTopic = [...subject.topics].reverse().find((t) => t.completed);
        return lastTopic
          ? { id: subject.id, subject, topicName: lastTopic.name, time: subject.lastStudied }
          : null;
      })
      .filter(Boolean)
      .slice(0, 3);
  }, [subjects]);

  const openDrawer = (subject) => {
    setSelectedSubjectId(subject.id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleAddSubject = (subjectDraft) => {
    addSubject(subjectDraft);
    setIsAddOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">
        Loading subjects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8 text-white">
      <PageHeader
        title="Subject Tracker"
        subtitle="Track your core subject preparation for placements."
        buttonText="Add Subject"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setIsAddOpen(true)}
      />

      <SubjectsStatsBar stats={stats} />

      <SubjectGrid subjects={subjects} onView={openDrawer} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NeedsAttention subjects={subjects} onView={openDrawer} />
        <RecentlyStudied entries={recentlyStudied} onView={openDrawer} />
      </div>

      <SubjectDetails
        subject={selectedSubject}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onToggleTopic={toggleTopic}
        onEditNotes={() => {}}
        onEditSubject={() => {}}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Subject">
        <AddSubjectForm onSubmit={handleAddSubject} onCancel={() => setIsAddOpen(false)} />
      </Modal>
    </div>
  );
}

export default Subjects;