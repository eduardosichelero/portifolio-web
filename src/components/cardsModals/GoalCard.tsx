import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar, CheckCircle2, Clock, Target } from 'lucide-react';

// Tipo melhorado com enum para categorias
export enum GoalCategory {
  Career = 'Carreira',
  Skills = 'Habilidades',
  Personal = 'Pessoal',
  Education = 'Estudos'
}

interface GoalProps {
  title: string;
  deadline: string;
  progress: number;
  category: GoalCategory;
}

// Mapeamento de cores para categorias (light/dark modes)
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
  }
};

export function GoalCard({ title, deadline, progress, category }: GoalProps) {
  // Configuração do ScrollReveal com cleanup
  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.goal-card', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 300,
      reset: true,
    });

    return () => sr.destroy(); // Limpeza adequada
  }, []);

  // Estilos dinâmicos baseados na categoria
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
