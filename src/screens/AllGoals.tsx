import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GoalCard } from '../components/cardsModals/GoalCard';
import { Header } from './Header';
import { ArrowLeft } from 'lucide-react';
import { AppBackground } from '../components/AppBackground'; // ajuste o caminho conforme seu projeto

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

  const allGoals = [...goalsFromDashboard, ...extraGoals];

  // Detecta tema escuro (ajuste conforme seu contexto de tema)
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Atualiza o estado se o tema mudar em outro local
    const handler = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AppBackground isDarkMode={isDarkMode}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todos os Objetivos do Momento
        </h2>
        {/* Botão de retorno logo abaixo do título */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Dashboard
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGoals.map((goal, index) => (
            <GoalCard key={index} {...goal} />
          ))}
        </div>
      </main>
    </AppBackground>
  );
}
