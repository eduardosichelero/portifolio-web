// components/AppBackground.jsx
import React from 'react';

export function AppBackground({ isDarkMode, children }) {
  return (
    <div
      className="min-h-screen bg-background-light dark:bg-gray-900"
      style={{
        backgroundImage: isDarkMode
          ? 'radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px), radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px)'
          : 'radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px), radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px)',
        backgroundSize: '100px 100px',
        backgroundPosition: '0 0, 50px 50px',
      }}
    >
      {children}
    </div>
  );
}
