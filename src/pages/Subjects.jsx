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
  const {
    subjects,
    loading,
    toggleTopic,
    addSubject,
    editSubject,
    removeSubject,
    updateTopicLink,
    toggleNeedsAttention,
    hideFromRecent,
  } = useSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState(null); // non-null => edit modal open

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || null;
  const editingSubject = subjects.find((s) => s.id === editingSubjectId) || null;
  const stats = useMemo(() => getOverallStats(subjects), [subjects]);

  // Subjects the user has explicitly dismissed from this feed are excluded
  // until they're actually studied again (see backend toggleTopic).
  const recentlyStudied = useMemo(() => {
    return subjects
      .filter((s) => !s.hiddenFromRecent)
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

  // Edit Notes and Edit Subject both open the same edit form — notes is
  // just one of the fields it can change, no need for a second form.
  const handleEditSubject = async (updates) => {
    if (!editingSubject) return;
    await editSubject(editingSubject.id, updates);
    setEditingSubjectId(null);
  };

  const handleDeleteSubject = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    const confirmed = window.confirm(`Delete "${subject?.name || "this subject"}"? This can't be undone.`);
    if (!confirmed) return;
    removeSubject(subjectId);
    closeDrawer();
  };

  const handleEditTopicLink = (topicId) => {
    if (!selectedSubject) return;
    const topic = selectedSubject.topics.find((t) => t.id === topicId);
    const link = window.prompt("Practice link for this topic (optional):", topic?.link || "");
    if (link === null) return; // cancelled
    updateTopicLink(selectedSubject.id, topicId, link.trim());
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
        <NeedsAttention
          subjects={subjects}
          onView={openDrawer}
          onAdd={toggleNeedsAttention}
          onRemove={toggleNeedsAttention}
        />
        <RecentlyStudied entries={recentlyStudied} onView={openDrawer} onRemove={hideFromRecent} />
      </div>

      <SubjectDetails
        subject={selectedSubject}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onToggleTopic={toggleTopic}
        onEditNotes={(subjectId) => setEditingSubjectId(subjectId)}
        onEditSubject={(subjectId) => setEditingSubjectId(subjectId)}
        onEditTopicLink={handleEditTopicLink}
        onDelete={handleDeleteSubject}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Subject">
        <AddSubjectForm onSubmit={handleAddSubject} onCancel={() => setIsAddOpen(false)} />
      </Modal>

      <Modal isOpen={Boolean(editingSubject)} onClose={() => setEditingSubjectId(null)} title="Edit Subject">
        <AddSubjectForm subject={editingSubject} onSubmit={handleEditSubject} onCancel={() => setEditingSubjectId(null)} />
      </Modal>
    </div>
  );
}

export default Subjects;
