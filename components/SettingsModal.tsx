
import React, { useState, useEffect } from 'react';
import { TimerSettings } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: TimerSettings) => void;
  currentSettings: TimerSettings;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentSettings }) => {
  const [settings, setSettings] = useState<TimerSettings>(currentSettings);

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings, isOpen]);

  const handleSave = () => {
    onSave(settings);
  };

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl relative text-white animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-100">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700" aria-label="Close settings">
            <CloseIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-700 pb-2">Time (minutes)</h3>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="pomodoro" className="text-slate-400">Pomodoro</label>
                    <input
                        type="number"
                        id="pomodoro"
                        name="pomodoro"
                        value={settings.pomodoro}
                        onChange={handleInputChange}
                        min="1"
                        className="w-24 bg-slate-700 text-white rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="shortBreak" className="text-slate-400">Short Break</label>
                    <input
                        type="number"
                        id="shortBreak"
                        name="shortBreak"
                        value={settings.shortBreak}
                        onChange={handleInputChange}
                        min="1"
                        className="w-24 bg-slate-700 text-white rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="longBreak" className="text-slate-400">Long Break</label>
                    <input
                        type="number"
                        id="longBreak"
                        name="longBreak"
                        value={settings.longBreak}
                        onChange={handleInputChange}
                        min="1"
                        className="w-24 bg-slate-700 text-white rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
             <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-700 pb-2 pt-4">Configuration</h3>
             <div className="flex items-center justify-between">
                <label htmlFor="longBreakInterval" className="text-slate-400">Long Break Interval</label>
                <input
                    type="number"
                    id="longBreakInterval"
                    name="longBreakInterval"
                    value={settings.longBreakInterval}
                    onChange={handleInputChange}
                    min="1"
                    className="w-24 bg-slate-700 text-white rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SettingsModal;
