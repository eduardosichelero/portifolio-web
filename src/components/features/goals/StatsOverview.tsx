import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Trophy, Target, CheckCircle2 } from 'lucide-react';
import { useApiGoals } from '@/components/data/ActiveInfoProvider';

export function StatsOverview() {
  // Buscar todos os objetivos, não apenas os 4 primeiros
  const { goals, loading } = useApiGoals({ all: true });

  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal: { progress: number }) => goal.progress === 100).length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  useEffect(() => {
    ScrollReveal().reveal('.stats-overview-card', {
      distance: '50px',
      duration: 600,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true,
      interval: 200,
    });
  }, []);

  const stats = [
    {
      label: 'Meus Objetivos',
      value: loading ? '-' : totalGoals,
      icon: <Target className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Completos',
      value: loading ? '-' : completedGoals,
      icon: <Trophy className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      label: 'Como estou indo',
      value: loading ? '-' : `${completionRate}%`,
      icon: <CheckCircle2 className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`stats-overview-card bg-white rounded-xl shadow-md p-6 dark:bg-gray-800`}>
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
