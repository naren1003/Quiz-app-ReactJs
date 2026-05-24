import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

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
              navigate("/quiz");
            }}
          >
            Start Quiz
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

        <div className="stats-container">
          <div className="stat-box">
            <h2>100+</h2>
            <p>Quizzes</p>
          </div>

          <div className="stat-box">
            <h2>50+</h2>
            <p>Categories</p>
          </div>

          <div className="stat-box">
            <h2>Unlimited</h2>
            <p>Learning Fun</p>
          </div>
        </div>
      </div>
    </div>
  );
}
