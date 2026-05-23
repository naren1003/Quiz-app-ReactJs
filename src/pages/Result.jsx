import { Link } from "react-router-dom";

export function Result(){
  return(
    <>
      result
      <nav>
        <Link to="/">Home</Link>
        <Link to="/setQuiz">Set Question</Link>
        <Link to="/quiz"> Start Quiz </Link>
      </nav>
    </>
  );
}