import { useState } from "react";
import { Timer } from "./Timer";
import { useNavigate } from "react-router-dom";

//number of answered qns

export function StartQuiz({ questions }) {
  const [selected, setSelected] = useState({});
  const [count, setCount] = useState(0);
  const [submit, setSubmit] = useState(0);

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
                  if(!(eachQuestion.id in selected)) 
                    setCount((prev) => prev + 1);

                  setSelected({
                    ...selected,
                    [eachQuestion.id]: e.target.value,
                  });
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