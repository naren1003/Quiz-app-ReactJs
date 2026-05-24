import { useEffect, useState } from "react";

export function Timer({ setSubmit }) {
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

  useEffect(() => {
    localStorage.setItem("quizTimer", JSON.stringify({ min, sec }));
  }, [min, sec]);

  useEffect(() => {
    if (min === 0 && sec === 0) {
      setSubmit(1);
      localStorage.removeItem("quizTimer");
    }
  }, [min, sec, setSubmit]);

  return (
    <div className="timer-card" aria-label="Quiz timer">
      <span>Time Left</span>
      <strong>
        {min}:{sec < 10 ? `0${sec}` : sec}
      </strong>
    </div>
  );
}
