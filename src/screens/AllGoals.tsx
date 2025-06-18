import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoalCard } from '@/components/features/goals/GoalCard';
import { Header } from '@/screens/Header';
import { ArrowLeft } from 'lucide-react';
import { allGoalsData } from '@/components/data/goalsData';
import { GoalCategory, GoalProps } from '../components/features/goals/GoalCard';

interface RawGoal {
  title: string;
  deadline: string;
  progress: number;
  category: string;
}

const GoalCategoryMap: Record<string, GoalCategory> = {
  'Estudos': GoalCategory.Education,
  'Hands-on': GoalCategory.HandsOn,
  'Redes': GoalCategory.Networks,
  'Monitoramento': GoalCategory.Monitoring,
  'Infraestrutura': GoalCategory.Infra,
  'Certificação': GoalCategory.Cert,
  'Programação': GoalCategory.Programming,
  'Sistemas Operacionais': GoalCategory.Systems,
  'Blue Team': GoalCategory.BlueTeam,
  'Desenvolvimento Seguro': GoalCategory.DevSecOps,
  'Prática/Comunidade': GoalCategory.Community,
  'Especialização': GoalCategory.Specialization,
  'Infraestrutura Crítica': GoalCategory.CriticalInfra,
};

export function AllGoals() {
  const navigate = useNavigate();

  const allGoalsDataMapped: GoalProps[] = useMemo(() => (
    (allGoalsData as RawGoal[]).map((goal) => {
      const mappedCategory = GoalCategoryMap[goal.category] || GoalCategory.Education;
      return {
        ...goal,
        category: mappedCategory
      };
    })
  ), []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 flex-1">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todos os Objetivos
        </h2>
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Dashboard
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGoalsDataMapped.length === 0 ? (
            <p className="text-gray-500 col-span-full">Nenhum objetivo encontrado.</p>
          ) : (
            allGoalsDataMapped.map((goal, index) => {
              const key = `${String(goal.title)}-${index}`;
              return <GoalCard key={key} {...goal} />;
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default AllGoals;
