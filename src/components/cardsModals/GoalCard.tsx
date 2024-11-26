import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar, CheckCircle2, Clock, Target } from 'lucide-react';

interface GoalProps {
  title: string;
  deadline: string;
  progress: number;
  category: string;
}

export function GoalCard({ title, deadline, progress, category }: GoalProps) {
  useEffect(() => {
    ScrollReveal().reveal('.goal-card', {
      distance: '50px',
      duration: 1300, 
      easing: 'ease-out',
      origin: 'bottom',
      delay: 300,
      reset: true, 
    });
  }, []);

  return (
    <div className="goal-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-3 py-1 text-sm font-medium rounded-full"
          style={{
            backgroundColor: category === 'Career' ? '#E8F5E9' : 
              category === 'Skills' ? '#E3F2FD' : '#FFF3E0',
            color: category === 'Career' ? '#2E7D32' :
              category === 'Skills' ? '#1565C0' : '#E65100'
          }}
        >
          {category}
        </span>
        <Target className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Due: {deadline}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span>Progresso</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: progress >= 100 ? '#2E7D32' : '#1976D2'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
