import SubjectCard from "./SubjectCard";

function SubjectGrid({ subjects, onView }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} onView={onView} />
      ))}
    </div>
  );
}

export default SubjectGrid;