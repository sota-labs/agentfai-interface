import React, { useEffect, useState } from "react";

interface CountdownProps {
  finishTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ finishTime }) => {
  const [timeLeft, setTimeLeft] = useState(finishTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(finishTime - Date.now());
      if (finishTime - Date.now() <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [finishTime]);

  const formatTime = (ms: number): string => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return <div>{formatTime(timeLeft)}</div>;
};

export default Countdown;
