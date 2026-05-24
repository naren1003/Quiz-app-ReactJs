import { useState,useEffect } from "react";
import { Timer } from "./Timer";
import { useNavigate } from "react-router-dom";

export function StartQuiz({ questions, setCorrectAnswers ,correctAnswers }) {

  const [selected, setSelected] = useState(() => {
    return JSON.parse(localStorage.getItem("selected")) || {};
  });

  const [count, setCount] = useState(() => {
    return JSON.parse(localStorage.getItem("count")) || 0;
  });
  const [submit, setSubmit] = useState(0);

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  // store count
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  const navigate = useNavigate();
  if (submit === 1)
    navigate("/result");

  return (
    <>
      <div>
        <Timer setSubmit={setSubmit} />
        <div>
          <h1>{count} / {questions.length}</h1>
        </div>
      </div>

      {questions.map((eachQuestion) => (
        <div key={eachQuestion.id}>
          <h2>{eachQuestion.question}</h2>

          {eachQuestion.options.map((option, index) => (
            <label key={index} style={{ display: "block" }}>
              <input
                type="radio"
                name={`quiz-${eachQuestion.id}`}
                value={option}
                checked={selected[eachQuestion.id] === option}
                onChange={(e) => {
                  const value = e.target.value; 

                  if (!(eachQuestion.id in selected))
                    setCount((prev) => prev + 1);

                  setSelected({
                    ...selected,
                    [eachQuestion.id]: value,
                  });

                  if (value === eachQuestion.answer) {
                    setCorrectAnswers({
                      ...correctAnswers,
                      [eachQuestion.id]: 1,
                    });
                  } else {
                    setCorrectAnswers({
                      ...correctAnswers,
                      [eachQuestion.id]: 0,
                    });
                  }
                }}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <div>
        <button
          onClick={() => {
            setSubmit(1);
            localStorage.removeItem("quizTimer");
          }}>
          Submit
        </button>
      </div>
    </>
  );
}