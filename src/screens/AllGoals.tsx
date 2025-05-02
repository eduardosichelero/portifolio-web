import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoalCard } from '../components/cardsModals/GoalCard';
import { Header } from './Header';
import { ArrowLeft } from 'lucide-react';
import { AppBackground } from '../components/AppBackground';

export function AllGoals() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Lista COMPLETA de objetivos (estática)
  const allGoals = [
    // Objetivos padrão do dashboard
    {
      title: 'Finalizar curso de React Avançado',
      deadline: '2024-12-01',
      progress: 75,
      category: 'Estudos'
    },
    // Objetivos extras
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    // Verificação do tema
    setIsDarkMode(
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);

  // Controle do tema
  useEffect(() => {
    const handler = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Controle do ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  return (
    <AppBackground isDarkMode={isDarkMode}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todos os Objetivos do Momento
        </h2>
        
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
