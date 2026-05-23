import { Link } from "react-router-dom";

export function Result({ correctAnswers }) {
  const result = Object.values(correctAnswers).reduce((acc, value) => {
  return acc + value;
}, 0);

  return (
    <>
      {result}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/setQuiz">Set Question</Link>
        <Link to="/quiz"> Start Quiz </Link>
      </nav>
    </>
  );
}