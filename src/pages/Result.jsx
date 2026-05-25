import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export function Result({
  activeQuizId,
  quizzes,
  setCorrectAnswers,
}) {
  const { quizId } = useParams();
  const selectedQuizId = quizId || activeQuizId;
  const quiz = quizzes.find((item) => item.id === selectedQuizId) || quizzes[0];
  const questions = quiz?.questions || [];
  const location = useLocation();
  const selectedAnswers =
    location.state?.selectedAnswers ||
    (quiz ? JSON.parse(localStorage.getItem(`selected-${quiz.id}`)) || {} : {});
  const storedResult = questions.reduce((acc, question) => {
    return acc + (selectedAnswers[question.id] === question.answer ? 1 : 0);
  }, 0);
  const result = storedResult;
  const totalQuestions = questions.length;
  const percentage = totalQuestions ? Math.round((result / totalQuestions) * 100) : 0;
  const missedCount = totalQuestions - result;
  const navigate = useNavigate();

  const restartQuiz = () => {
    setCorrectAnswers({});
    localStorage.removeItem(`quizTimer-${quiz.id}`);
    localStorage.removeItem(`selected-${quiz.id}`);
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <main className="app-page result-page">
      <section className="page-card result-card">
        <span className="eyebrow">Result</span>
        <h1>{quiz?.title || "Your Score"}</h1>

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
          <Link
            className="secondary-link"
            to={`/review/${quiz.id}`}
            state={{ selectedAnswers }}
          >
            Review Missed ({missedCount})
          </Link>
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
