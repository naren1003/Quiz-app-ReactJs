import { useEffect, useState } from "react";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
};

export function Timer({ durationMinutes, setSubmit, storageKey }) {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const savedSeconds = JSON.parse(localStorage.getItem(storageKey));
    return savedSeconds || durationMinutes * 60;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(secondsLeft));

    if (secondsLeft === 0) {
      setSubmit(1);
      localStorage.removeItem(storageKey);
    }
  }, [secondsLeft, setSubmit, storageKey]);

  return (
    <div className="timer-card" aria-label="Quiz timer">
      <span>Time Left</span>
      <strong>{formatTime(secondsLeft)}</strong>
    </div>
  );
}
