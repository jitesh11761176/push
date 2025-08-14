
import React from 'react';
import { SettingsIcon } from './icons/SettingsIcon';

interface SettingsButtonProps {
    onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-3 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
            aria-label="Open Settings"
        >
            <SettingsIcon className="w-6 h-6" />
        </button>
    );
};

export default SettingsButton;
