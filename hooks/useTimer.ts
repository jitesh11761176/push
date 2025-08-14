import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, TimerSettings } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

export const useTimer = (initialSettings: TimerSettings) => {
  const [settings, setSettings] = useState<TimerSettings>(initialSettings);
  const [mode, setMode] = useState<TimerMode>(TimerMode.Pomodoro);
  const [timeLeft, setTimeLeft] = useState<number>(settings.pomodoro * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [pomodoros, setPomodoros] = useState<number>(0);
  
  const intervalRef = useRef<number | null>(null);
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);

  // Update timeLeft when settings change AND the timer isn't active
  useEffect(() => {
    setSettings(initialSettings);
    if (!isActive) {
        const newTime = initialSettings[mode] * 60;
        setTimeLeft(newTime);
    }
  }, [initialSettings, isActive, mode]);
  
  const getNextMode = useCallback(() => {
    if (mode === TimerMode.Pomodoro) {
      const newPomodoroCount = pomodoros + 1;
      setPomodoros(newPomodoroCount);
      if (newPomodoroCount % settings.longBreakInterval === 0) {
        return TimerMode.LongBreak;
      }
      return TimerMode.ShortBreak;
    }
    return TimerMode.Pomodoro;
  }, [mode, pomodoros, settings.longBreakInterval]);

  const switchMode = useCallback((newMode: TimerMode, newSettings: TimerSettings = settings) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newSettings[newMode] * 60);
  }, [settings]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !notificationAudioRef.current) {
        // You can replace this with your own sound file
        notificationAudioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
    }

    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            notificationAudioRef.current?.play();
            const nextMode = getNextMode();
            switchMode(nextMode);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, getNextMode, switchMode]);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const modeText = mode.replace('Break', ' Break');
    document.title = `${timeString} - ${modeText.charAt(0).toUpperCase() + modeText.slice(1)} | Zenith Pomodoro`;
  }, [timeLeft, mode]);

  const handleStartPause = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const handleReset = useCallback((forceModeChange = false, newSettings: TimerSettings = settings) => {
      setIsActive(false);
      const newTime = newSettings[mode] * 60;
      setTimeLeft(newTime);
      if (forceModeChange) {
        setMode(TimerMode.Pomodoro);
        setTimeLeft(newSettings.pomodoro * 60);
      }
  }, [mode, settings]);
  
  const handleModeChange = useCallback((newMode: TimerMode) => {
    if (isActive) {
        const confirmSwitch = window.confirm('The timer is still running. Are you sure you want to switch modes? This will reset the current timer.');
        if (!confirmSwitch) return;
    }
    switchMode(newMode);
  }, [isActive, switchMode]);

  const initialTime = settings[mode] * 60;
  const progress = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;

  return {
    mode,
    timeLeft,
    isActive,
    progress,
    pomodoros,
    handleModeChange,
    handleStartPause,
    handleReset,
  };
};