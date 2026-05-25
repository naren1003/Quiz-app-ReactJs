import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { Timer } from "./Timer";
import { useNavigate, useParams } from "react-router-dom";

export function StartQuiz({
  activeQuizId,
  quizzes,
  setCorrectAnswers,
  correctAnswers,
}) {
  const { quizId } = useParams();
  const selectedQuizId = quizId || activeQuizId;
  const quiz = quizzes.find((item) => item.id === selectedQuizId) || quizzes[0];
  const questions = quiz?.questions || [];
  const selectedStorageKey = quiz ? `selected-${quiz.id}` : "selected";
  const timerStorageKey = quiz ? `quizTimer-${quiz.id}` : "quizTimer";
  const [selectedState, setSelectedState] = useState(() => {
    return {
      storageKey: selectedStorageKey,
      answers: JSON.parse(localStorage.getItem(selectedStorageKey)) || {},
    };
  });

  const [submit, setSubmit] = useState(0);
  const hasSubmittedRef = useRef(false);
  const navigate = useNavigate();
  const selected = useMemo(() => {
    return selectedState.storageKey === selectedStorageKey
      ? selectedState.answers
      : JSON.parse(localStorage.getItem(selectedStorageKey)) || {};
  }, [selectedState, selectedStorageKey]);
  const answeredCount = Object.keys(selected).length;

  const submitQuiz = useCallback(() => {
    if (!quiz || hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;
    setSubmit(1);
    setCorrectAnswers({});
    localStorage.removeItem(timerStorageKey);
    localStorage.removeItem(selectedStorageKey);
    navigate(`/result/${quiz.id}`, {
      state: {
        selectedAnswers: selected,
      },
    });
  }, [
    navigate,
    quiz,
    selected,
    selectedStorageKey,
    setCorrectAnswers,
    timerStorageKey,
  ]);

  useEffect(() => {
    if (submit === 1) return;

    localStorage.setItem(selectedStorageKey, JSON.stringify(selected));
  }, [selected, selectedStorageKey, submit]);

  useEffect(() => {
    if (submit === 1) {
      submitQuiz();
    }
  }, [submit, submitQuiz]);

  if (!questions.length) {
    return (
      <main className="app-page">
        <section className="page-card empty-state">
          <span className="eyebrow">Quiz</span>
          <h1>No questions yet</h1>
          <p>Create your first question before starting a quiz.</p>
          <button className="primary-btn" onClick={() => navigate("/setQuiz")}>
            Create Question
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-page quiz-page">
      <section className="quiz-shell">
        <div className="quiz-header">
          <div>
            <span className="eyebrow">Live Quiz</span>
            <h1>{quiz.title}</h1>
          </div>
          <Timer
            key={timerStorageKey}
            durationMinutes={quiz.durationMinutes}
            setSubmit={setSubmit}
            storageKey={timerStorageKey}
          />
        </div>

        <div className="progress-card">
          <div>
            <span>Answered</span>
            <strong>
              {answeredCount} / {questions.length}
            </strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {questions.map((eachQuestion, questionIndex) => (
          <article className="question-card" key={eachQuestion.id}>
            <div className="question-number">Question {questionIndex + 1}</div>
            <h2>{eachQuestion.question}</h2>

            <div className="options-grid">
              {eachQuestion.options.map((option, index) => (
                <label className="option-choice" key={index}>
                  <input
                    type="radio"
                    name={`quiz-${eachQuestion.id}`}
                    value={option}
                    checked={selected[eachQuestion.id] === option}
                    onChange={(event) => {
                      const value = event.target.value;

                      setSelectedState({
                        storageKey: selectedStorageKey,
                        answers: {
                          ...selected,
                          [eachQuestion.id]: value,
                        },
                      });

                      setCorrectAnswers({
                        ...correctAnswers,
                        [eachQuestion.id]: value === eachQuestion.answer ? 1 : 0,
                      });
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </article>
        ))}

        <div className="submit-bar">
          <button
            className="primary-btn"
            onClick={submitQuiz}
          >
            Submit
          </button>
        </div>
      </section>
    </main>
  );
}
