
import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-7xl sm:text-8xl font-bold text-slate-100 tracking-tighter">
      <span>{minutes.toString().padStart(2, '0')}</span>
      <span>:</span>
      <span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

export default TimerDisplay;
