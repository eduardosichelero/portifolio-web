// components/AppBackground.jsx
import React from 'react';
import { BackgroundLines } from '@/components/ui/background-lines';

export function AppBackground({ isDarkMode, children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundLines isDarkMode={isDarkMode} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
