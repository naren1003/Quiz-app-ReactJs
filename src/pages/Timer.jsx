import { useEffect, useState } from "react";

export function Timer() {
  const [min, setMin] = useState(10);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }

      else if (sec === 0 && min > 0) {
        setMin(min - 1);
        setSec(59);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [min, sec]);

  return (
    <div>
      <h1>
        {min}:{sec < 10 ? `0${sec}` : sec}
      </h1>
    </div>
  );
}