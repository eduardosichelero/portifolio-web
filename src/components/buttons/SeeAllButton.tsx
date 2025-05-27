import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SeeAllButtonProps {
  to: string;
  state?: any;
  children?: React.ReactNode;
}

export function SeeAllButton({ to, state, children = "Ver todos" }: SeeAllButtonProps) {
  return (
    <Link
      to={to}
      state={state}
      className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
    >
      {children}
      <ArrowRight className="w-4 h-4 ml-1" /> 
    </Link>
  );
}
