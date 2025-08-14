
import React from 'react';
import { TimerMode } from '../types';

interface ProgressCircleProps {
  progress: number;
  mode: TimerMode;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, mode }) => {
  const radius = 90;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const modeColorClasses: Record<TimerMode, string> = {
    [TimerMode.Pomodoro]: 'text-red-500',
    [TimerMode.ShortBreak]: 'text-blue-500',
    [TimerMode.LongBreak]: 'text-green-500',
  };

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="transform -rotate-90"
    >
      <circle
        className="text-slate-700/50"
        strokeWidth={stroke}
        stroke="currentColor"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className={`${modeColorClasses[mode]} transition-all duration-300`}
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressCircle;
