import { Link, useNavigate, useParams } from "react-router-dom";

export function ReviewAnswers({ activeQuizId, quizzes }) {
  const { quizId } = useParams();
  const selectedQuizId = quizId || activeQuizId;
  const quiz = quizzes.find((item) => item.id === selectedQuizId) || quizzes[0];
  const questions = quiz?.questions || [];
  const navigate = useNavigate();
  const selectedAnswers = quiz
    ? JSON.parse(localStorage.getItem(`selected-${quiz.id}`)) || {}
    : {};

  const missedQuestions = questions.filter((question) => {
    return selectedAnswers[question.id] !== question.answer;
  });

  const restartQuiz = () => {
    if (!quiz) return;
    localStorage.removeItem(`quizTimer-${quiz.id}`);
    localStorage.removeItem(`selected-${quiz.id}`);
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <main className="app-page review-page">
      <section className="review-shell">
        <div className="review-header">
          <div>
            <span className="eyebrow">Review</span>
            <h1>{quiz?.title || "Missed Questions"}</h1>
            <p>
              {missedQuestions.length
                ? `${missedQuestions.length} question${missedQuestions.length === 1 ? "" : "s"} need another look.`
                : "Nice work. There are no incorrect or unanswered questions."}
            </p>
          </div>

          <div className="review-actions">
            {quiz && (
              <button className="primary-btn" type="button" onClick={restartQuiz}>
                Try Again
              </button>
            )}
            <Link className="secondary-link" to={quiz ? `/result/${quiz.id}` : "/result"}>
              Back to Result
            </Link>
          </div>
        </div>

        <div className="review-list">
          {missedQuestions.map((question, index) => {
            const hasAnswer = Object.prototype.hasOwnProperty.call(
              selectedAnswers,
              question.id
            );
            const selectedAnswer = selectedAnswers[question.id];

            return (
              <article className="review-card" key={question.id}>
                <div className="review-card-header">
                  <span>Question {index + 1}</span>
                  <strong>{hasAnswer ? "Incorrect" : "Not answered"}</strong>
                </div>

                <h2>{question.question}</h2>

                <div className="answer-comparison">
                  <div>
                    <span>Your answer</span>
                    <p className={hasAnswer ? "wrong-answer" : "empty-answer"}>
                      {hasAnswer ? selectedAnswer : "Not answered"}
                    </p>
                  </div>
                  <div>
                    <span>Correct answer</span>
                    <p className="correct-answer">{question.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
