import { Link, useNavigate } from "react-router-dom";

export function Result({ questions, correctAnswers, setCorrectAnswers }) {
  const result = Object.values(correctAnswers).reduce((acc, value) => {
    return acc + value;
  }, 0);
  const totalQuestions = questions.length;
  const percentage = totalQuestions ? Math.round((result / totalQuestions) * 100) : 0;
  const navigate = useNavigate();

  const restartQuiz = () => {
    setCorrectAnswers({});
    localStorage.removeItem("quizTimer");
    localStorage.removeItem("selected");
    navigate("/quiz");
  };

  return (
    <main className="app-page result-page">
      <section className="page-card result-card">
        <span className="eyebrow">Result</span>
        <h1>Your Score</h1>

        <div className="score-ring" style={{ "--score": `${percentage}%` }}>
          <div>
            <strong>{percentage}%</strong>
            <span>
              {result} / {totalQuestions}
            </span>
          </div>
        </div>

        <p className="result-copy">
          {percentage >= 80
            ? "Excellent work. You really know this topic."
            : percentage >= 50
              ? "Good attempt. A little revision will push this higher."
              : "Keep practicing. Every round makes the next one easier."}
        </p>

        <div className="result-actions">
          <button className="primary-btn" onClick={restartQuiz}>
            Try Again
          </button>
          <Link className="secondary-link" to="/setQuiz">
            Edit Questions
          </Link>
          <Link className="secondary-link" to="/">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
