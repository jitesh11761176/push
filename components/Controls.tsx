
import React from 'react';
import { TimerMode } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { ResetIcon } from './icons/ResetIcon';

interface ControlsProps {
  isActive: boolean;
  onStartPause: () => void;
  onReset: () => void;
  mode: TimerMode;
}

const Controls: React.FC<ControlsProps> = ({ isActive, onStartPause, onReset, mode }) => {
  
  const modeColorClasses: Record<TimerMode, string> = {
    [TimerMode.Pomodoro]: 'bg-red-500 hover:bg-red-600',
    [TimerMode.ShortBreak]: 'bg-blue-500 hover:bg-blue-600',
    [TimerMode.LongBreak]: 'bg-green-500 hover:bg-green-600',
  };

  return (
    <div className="flex items-center space-x-6">
      <button
        onClick={onReset}
        className="p-3 text-slate-400 hover:text-white transition-colors duration-200"
        aria-label="Reset Timer"
      >
        <ResetIcon className="w-8 h-8" />
      </button>
      <button
        onClick={onStartPause}
        className={`w-28 h-14 rounded-full text-white font-bold text-xl uppercase tracking-wider flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105 ${modeColorClasses[mode]}`}
        aria-label={isActive ? 'Pause Timer' : 'Start Timer'}
      >
        {isActive ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
      </button>
       <div className="w-14 h-14" /> {/* Spacer to balance the reset button */}
    </div>
  );
};

export default Controls;
