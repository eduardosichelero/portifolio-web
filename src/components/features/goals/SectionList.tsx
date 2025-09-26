import React from 'react';
import { SeeAllButton } from '@/components/buttons/SeeAllButton';

interface SectionListProps<T, P = T, S = unknown> {
  title: string;
  items: T[];
  Card: React.ComponentType<P & { key?: React.Key }>;
  mapItem?: (item: T) => P;
  seeAllTo?: string;
  seeAllState?: S;
}

export function SectionList<T, P = T, S = unknown>({ title, items, Card, mapItem, seeAllTo, seeAllState }: SectionListProps<T, P, S>) {
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
          <Card key={idx} {...(mapItem ? mapItem(item) : (item as unknown as P))} />
        ))}
      </div>
    </div>
  );
}
