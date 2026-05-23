import { useEffect, useState } from "react";

export function Timer({ setSubmit }) {
  //Load saved timer from localStorage
  const savedTime = JSON.parse(localStorage.getItem("quizTimer"));

  const [min, setMin] = useState(savedTime?.min || 10);
  const [sec, setSec] = useState(savedTime?.sec || 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sec > 0) {
        setSec((prev) => prev - 1);
      } else if (sec === 0 && min > 0) {
        setMin((prev) => prev - 1);
        setSec(59);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [min, sec]);

  // Save timer to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "quizTimer",
      JSON.stringify({ min, sec })
    );
  }, [min, sec]);

  // Auto submit when timer ends
  useEffect(() => {
    if (min === 0 && sec === 0) {
      setSubmit(1);
      localStorage.removeItem("quizTimer");
    }
  }, [min, sec, setSubmit]);

  return (
    <div>
      <h1>
        {min}:{sec < 10 ? `0${sec}` : sec}
      </h1>
    </div>
  );
}