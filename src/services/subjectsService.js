import subjectsData from "../config/subjectsData";

// In-memory copy so the "backend" survives multiple calls within a session.
// SWAP POINT: replace the bodies of these functions with real fetch() calls
// to your API. The function signatures are the contract the rest of the
// app depends on — keep them the same and nothing else needs to change.

let _subjects = subjectsData;

const simulateLatency = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getSubjects() {
  // Later: const res = await fetch("/api/subjects"); return res.json();
  return simulateLatency(_subjects);
}

export async function getSubjectById(subjectId) {
  // Later: const res = await fetch(`/api/subjects/${subjectId}`); return res.json();
  const subject = _subjects.find((s) => s.id === subjectId) || null;
  return simulateLatency(subject);
}

export async function toggleSubjectTopic(subjectId, topicId) {
  // Later: const res = await fetch(`/api/subjects/${subjectId}/topics/${topicId}/toggle`, { method: "PATCH" });
  // return res.json();
  _subjects = _subjects.map((subject) =>
    subject.id !== subjectId
      ? subject
      : {
          ...subject,
          topics: subject.topics.map((topic) =>
            topic.id !== topicId
              ? topic
              : {
                  ...topic,
                  completed: !topic.completed,
                  progress: !topic.completed ? 100 : topic.progress,
                }
          ),
        }
  );
  return simulateLatency(_subjects);
}

export async function createSubject(newSubject) {
  // Later: const res = await fetch("/api/subjects", { method: "POST", body: JSON.stringify(newSubject) });
  _subjects = [..._subjects, newSubject];
  return simulateLatency(_subjects);
}