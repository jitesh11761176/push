
import React, { useState, useCallback } from 'react';
import { TimerMode, TimerSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { useTimer } from './hooks/useTimer';
import ModeSelector from './components/ModeSelector';
import TimerDisplay from './components/TimerDisplay';
import ProgressCircle from './components/ProgressCircle';
import Controls from './components/Controls';
import SettingsButton from './components/SettingsButton';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const {
    mode,
    timeLeft,
    isActive,
    progress,
    pomodoros,
    handleModeChange,
    handleStartPause,
    handleReset,
  } = useTimer(settings);

  const handleSaveSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
    handleReset(true, newSettings); // Reset with new settings
  }, [handleReset]);

  const modeColors: Record<TimerMode, string> = {
    [TimerMode.Pomodoro]: 'from-red-500 to-orange-500',
    [TimerMode.ShortBreak]: 'from-blue-500 to-cyan-500',
    [TimerMode.LongBreak]: 'from-green-500 to-teal-500',
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-900 text-white transition-all duration-500`}>
      <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center space-y-8">
        <header className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-slate-100">Zenith Pomodoro</h1>
          <p className="text-slate-400 mt-2">Stay focused, take breaks, be productive.</p>
        </header>

        <ModeSelector currentMode={mode} onSelectMode={handleModeChange} />

        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          <ProgressCircle progress={progress} mode={mode} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <TimerDisplay timeLeft={timeLeft} />
            <span className="text-sm font-medium tracking-wider text-slate-300">
              {isActive ? 'IN PROGRESS' : 'PAUSED'}
            </span>
          </div>
        </div>

        <Controls 
          isActive={isActive} 
          onStartPause={handleStartPause}
          onReset={() => handleReset(false, settings)} 
          mode={mode}
        />
        
        <div className="absolute top-6 right-6">
          <SettingsButton onClick={() => setIsSettingsOpen(true)} />
        </div>

        <footer className="text-center">
            <p className="text-lg font-semibold text-slate-200">
                Completed Pomodoros: {pomodoros}
            </p>
            <p className="text-xs text-slate-500 mt-1">
                A long break occurs after every {DEFAULT_SETTINGS.longBreakInterval} sessions.
            </p>
        </footer>
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />
    </div>
  );
};

export default App;
