import React from 'react';
import { Trophy, Target, CheckCircle2 } from 'lucide-react';

export function StatsOverview() {
  const stats = [
    {
      label: "Meus Objetivos",
      value: 8,
      icon: <Target className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Completos",
      value: 12,
      icon: <Trophy className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "Como estou indo",
      value: "85%",
      icon: <CheckCircle2 className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`bg-white rounded-xl shadow-md p-6 dark:bg-gray-800`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
