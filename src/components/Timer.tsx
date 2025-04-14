import React, { useEffect, useState } from 'react';

interface TimerProps {
  timeLimit: number; // Time limit in seconds
  onTimeout: () => void;
  questionIndex: number;
}

const Timer: React.FC<TimerProps> = ({ timeLimit,questionIndex,onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [questionIndex]);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [questionIndex]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center w-14 h-14 max-sm:w-10 max-sm:h-10 max-sm:text-sm rounded-full border-2  border-gray-400 font-bold text-lg">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;