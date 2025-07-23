"use client";

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

import { allThemes, githubDarkTheme } from '@/lib/themes';
import { Profile } from '@/types/custom';

interface AppearancePanelProps {
  profile: Profile;
  onUpdateProfile: (profile: Profile) => void;
  onClose: () => void;
}

export default function AppearancePanel({ profile, onUpdateProfile, onClose }: AppearancePanelProps) {
  const [currentProfile, setCurrentProfile] = useState(profile);
  const [selectedTheme, setSelectedTheme] = useState(profile.theme);

  const resetAndClose = () => {
    setCurrentProfile(profile);
    setSelectedTheme(profile.theme);
    onClose();
  };

  const saveAndClose = () => {
    const updatedProfile: Profile = {
      ...currentProfile,
      theme: selectedTheme,
    };
    setCurrentProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
    onClose();
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
        <h2 className="text-xl font-bold text-white">Edit Appearance</h2>
        <button
          onClick={() => resetAndClose()}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-grow space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
              <input
                type="text"
                value={currentProfile.name}
                onChange={(e) => setCurrentProfile({ ...currentProfile, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-800 focus:border-blue-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
              <textarea
                value={currentProfile.bio || ""}
                onChange={(e) => setCurrentProfile({ ...currentProfile, bio: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-800 focus:border-blue-800" rows={3}
              ></textarea>
            </div>
            <div className='mt-8'>
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <select
                value={selectedTheme.name}
                onChange={(e) => setSelectedTheme(allThemes.find(theme => theme.name === e.target.value) || githubDarkTheme)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-800 focus:border-blue-800"
              >
                {allThemes.map((theme) => (
                  <option key={theme.id} value={theme.name}>{theme.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6 border-t border-gray-800">
        <button
          onClick={() => saveAndClose()}
          className="w-full bg-blue-800 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Save changes
        </button>
      </div>
    </motion.div>
  );
};
