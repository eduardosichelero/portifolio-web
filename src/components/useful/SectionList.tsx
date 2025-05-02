import React from 'react';
import { SeeAllButton } from '../buttons/SeeAllButton';

interface SectionListProps<T> {
  title: string;
  items: T[];
  Card: React.ComponentType<T & { key?: React.Key }>;
  seeAllTo?: string;
  seeAllState?: any;
}

export function SectionList<T>({ title, items, Card, seeAllTo, seeAllState }: SectionListProps<T>) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        {seeAllTo && (
          <SeeAllButton to={seeAllTo} state={seeAllState}>
            Ver todos
          </SeeAllButton>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <Card key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}
