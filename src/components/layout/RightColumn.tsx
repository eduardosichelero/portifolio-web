import React from 'react';

export function RightColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      {children}
    </div>
  );
}
