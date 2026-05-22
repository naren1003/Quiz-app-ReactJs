import { useState } from "react";
import { Timer } from "./Timer";
import { useNavigate } from "react-router-dom";

//number of answered qns

export function StartQuiz({ questions }) {
  const [selected, setSelected] = useState({});
  const [submit, setSubmit] = useState(0);

  const navigate = useNavigate();
  if(submit === 1) 
    navigate("/result");

  return (
    <>
      <Timer setSubmit = {setSubmit} />

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
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    [eachQuestion.id]: e.target.value,
                  })
                }
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <div>
        <button onClick={()=>{setSubmit(1)}}>Submit</button>
      </div>
    </>
  );
}