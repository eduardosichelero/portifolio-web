import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GoalCard } from '../components/cardsModals/GoalCard';
import { Header } from './Header';
import { ArrowLeft } from 'lucide-react';

export function AllGoals() {
  const location = useLocation();
  const goalsFromDashboard = location.state?.goals || [];

  // Objetivos exclusivos desta tela
  const extraGoals = [
    {
      title: 'Publicar artigo científico em 2025',
      deadline: 'December 20, 2025',
      progress: 10,
      category: 'Carreira',
    },
    {
      title: 'Obter certificação CompTIA Security+',
      deadline: 'March 10, 2025',
      progress: 0,
      category: 'Habilidades',
    },
    {
      title: 'Participar de uma conferência internacional',
      deadline: 'September 15, 2025',
      progress: 0,
      category: 'Pessoal',
    },
    {
      title: 'Aprender TypeScript avançado',
      deadline: 'November 30, 2024',
      progress: 20,
      category: 'Habilidades',
    },
  ];

  // Mescla os objetivos do dashboard com os exclusivos desta tela
  const allGoals = [...goalsFromDashboard, ...extraGoals];

  return (
    <div className="min-h-screen bg-background-light dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Dashboard
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todos os Objetivos do Momento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGoals.map((goal, index) => (
            <GoalCard key={index} {...goal} />
          ))}
        </div>
      </main>
    </div>
  );
}
