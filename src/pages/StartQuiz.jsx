import { useState, useEffect } from "react";
import { Timer } from "./Timer";
import { useNavigate } from "react-router-dom";

export function StartQuiz({ questions, setCorrectAnswers, correctAnswers }) {
  const [selected, setSelected] = useState(() => {
    return JSON.parse(localStorage.getItem("selected")) || {};
  });

  const [submit, setSubmit] = useState(0);
  const navigate = useNavigate();
  const answeredCount = Object.keys(selected).length;

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    if (submit === 1) {
      navigate("/result");
    }
  }, [submit, navigate]);

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
            <h1>Choose the correct answers</h1>
          </div>
          <Timer setSubmit={setSubmit} />
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

                      setSelected({
                        ...selected,
                        [eachQuestion.id]: value,
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
            onClick={() => {
              setSubmit(1);
              localStorage.removeItem("quizTimer");
              localStorage.removeItem("selected");
            }}
          >
            Submit
          </button>
        </div>
      </section>
    </main>
  );
}
