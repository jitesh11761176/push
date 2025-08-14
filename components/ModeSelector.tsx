
import React from 'react';
import { TimerMode } from '../types';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onSelectMode: (mode: TimerMode) => void;
}

const ModeButton: React.FC<{
  mode: TimerMode;
  label: string;
  currentMode: TimerMode;
  onClick: (mode: TimerMode) => void;
}> = ({ mode, label, currentMode, onClick }) => {
  const isActive = currentMode === mode;
  
  const modeColorClasses: Record<TimerMode, { active: string, inactive: string }> = {
    [TimerMode.Pomodoro]: { active: 'bg-red-500 text-white', inactive: 'text-slate-400 hover:bg-slate-700' },
    [TimerMode.ShortBreak]: { active: 'bg-blue-500 text-white', inactive: 'text-slate-400 hover:bg-slate-700' },
    [TimerMode.LongBreak]: { active: 'bg-green-500 text-white', inactive: 'text-slate-400 hover:bg-slate-700' },
  };

  return (
    <button
      onClick={() => onClick(mode)}
      className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 transform ${isActive ? modeColorClasses[mode].active : modeColorClasses[mode].inactive} ${isActive ? 'scale-105 shadow-lg' : 'hover:scale-105'}`}
    >
      {label}
    </button>
  );
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onSelectMode }) => {
  return (
    <div className="flex space-x-2 bg-slate-800 p-2 rounded-lg">
      <ModeButton
        mode={TimerMode.Pomodoro}
        label="Pomodoro"
        currentMode={currentMode}
        onClick={onSelectMode}
      />
      <ModeButton
        mode={TimerMode.ShortBreak}
        label="Short Break"
        currentMode={currentMode}
        onClick={onSelectMode}
      />
      <ModeButton
        mode={TimerMode.LongBreak}
        label="Long Break"
        currentMode={currentMode}
        onClick={onSelectMode}
      />
    </div>
  );
};

export default ModeSelector;
