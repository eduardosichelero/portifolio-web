import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  seeAllTo?: string;
  seeAllState?: any;
  seeAllLabel?: string;
}

export function SectionHeader({ title, seeAllTo, seeAllState, seeAllLabel = "Ver todos" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      {seeAllTo && (
        <Link
          to={seeAllTo}
          state={seeAllState}
          className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          {seeAllLabel}
        </Link>
      )}
    </div>
  );
}
