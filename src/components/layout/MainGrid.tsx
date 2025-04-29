import React from 'react';

export function MainGrid({ 
  left,
  right 
}: { 
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {left}
      </div>
      {right}
    </div>
  );
}
