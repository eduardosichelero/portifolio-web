import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar, CheckCircle2, Clock, Target } from 'lucide-react';

export enum GoalCategory {
  Career = 'Carreira',
  Skills = 'Habilidades',
  Personal = 'Pessoal',
  Education = 'Estudos',
  HandsOn = 'Hands-on',
  Monitoring = 'Monitoramento',
  Infra = 'Infraestrutura',
  Cert = 'Certificação',
  Programming = 'Programação',
  Networks = 'Redes',
  BlueTeam = 'Desenvolvimento Seguro',
  DevSecOps = 'Desenvolvimento Seguro',
  Community = 'Prática/Comunidade',
  Specialization = 'Especialização',
  CriticalInfra = 'Infraestrutura Crítica',
  Systems = 'Sistemas Operacionais'
}

export interface GoalProps {
  title: string;
  deadline: string;
  progress: number;
  category: GoalCategory;
}

const categoryStyles: Record<GoalCategory, { bg: string; text: string }> = {
  [GoalCategory.Career]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300'
  },
  [GoalCategory.Skills]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300'
  },
  [GoalCategory.Personal]: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300'
  },
  [GoalCategory.Education]: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300'
  },
  [GoalCategory.HandsOn]: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300'
  },
  [GoalCategory.Monitoring]: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300'
  },
  [GoalCategory.Infra]: {
    bg: 'bg-gray-100 dark:bg-gray-900/30',
    text: 'text-gray-700 dark:text-gray-300'
  },
  [GoalCategory.Cert]: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-300'
  },
  [GoalCategory.Programming]: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-300'
  },
  [GoalCategory.Networks]: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-700 dark:text-cyan-300'
  },
  [GoalCategory.BlueTeam]: {
    bg: 'bg-blue-200 dark:bg-blue-800/30',
    text: 'text-blue-800 dark:text-blue-200'
  },
  [GoalCategory.DevSecOps]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300'
  },
  [GoalCategory.Community]: {
    bg: 'bg-lime-100 dark:bg-lime-900/30',
    text: 'text-lime-700 dark:text-lime-300'
  },
  [GoalCategory.Specialization]: {
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/30',
    text: 'text-fuchsia-700 dark:text-fuchsia-300'
  },
  [GoalCategory.CriticalInfra]: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300'
  },
  [GoalCategory.Systems]: {
    bg: 'bg-zinc-100 dark:bg-zinc-900/30',
    text: 'text-zinc-700 dark:text-zinc-300'
  }
};

export function GoalCard({ title, deadline, progress, category }: GoalProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollReveal) {
      const sr = ScrollReveal();
      sr.reveal('.goal-card', {
        distance: '50px',
        duration: 600, // ajustado para 600ms
        easing: 'ease-out',
        origin: 'bottom',
        delay: 300,
        reset: true,
      });
      return () => sr.destroy();
    }
  }, []);

  const { bg, text } = categoryStyles[category];

  return (
    <div className="goal-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${bg} ${text}`}>
          {category}
        </span>
        <Target className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Conclusão: {new Date(deadline).toLocaleDateString('pt-BR')}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Progresso</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {progress}%
            </span>
          </div>

          {/* Barra de progresso acessível */}
          <div 
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700"
          >
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: progress >= 100 
                  ? '#2E7D32' 
                  : '#1976D2'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
