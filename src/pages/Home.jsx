import { useNavigate } from "react-router-dom";

export function Home({ activeQuizId, quizzes, selectQuiz }) {
  const navigate = useNavigate();
  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId) || quizzes[0];

  return (
    <div className="app-page home-page">
      <div className="page-card home-card">
        <span className="eyebrow">QuizMaster</span>
        <h1 className="home-title">Welcome to QuizMaster</h1>

        <p className="home-description">
          Create quizzes, test your knowledge, and challenge yourself with
          interactive questions.
        </p>

        <div className="button-group">
          <button
            className="start-btn"
            onClick={() => {
              navigate(`/quiz/${activeQuiz.id}`);
            }}
          >
            Start Selected Quiz
          </button>
          <button
            className="create-btn"
            onClick={() => {
              navigate("/setQuiz");
            }}
          >
            Create Quiz
          </button>
        </div>

        <div className="quiz-picker">
          {quizzes.map((quiz) => (
            <button
              className={`quiz-option ${quiz.id === activeQuiz?.id ? "is-active" : ""}`}
              key={quiz.id}
              type="button"
              onClick={() => selectQuiz(quiz.id)}
            >
              <span>{quiz.durationMinutes} min</span>
              <strong>{quiz.title}</strong>
              <small>{quiz.questions.length} questions</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
