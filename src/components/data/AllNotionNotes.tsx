import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Book } from 'lucide-react';
import { Header } from '@/screens/Header';
import { AppBackground } from '@/components/layout/AppBackground';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export function AllNotionNotes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState(location.state?.notes || []);
  const [loading, setLoading] = useState(!location.state?.notes);

  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    if (!location.state?.notes) {
      fetch('https://portifolio-api-mu.vercel.app/api/notion/notes')
        .then(res => res.json())
        .then(data => setNotes(data))
        .finally(() => setLoading(false));
    }
  }, [location.state]);

  useEffect(() => {
    const handler = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  return (
    <AppBackground isDarkMode={isDarkMode}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todas as Anotações do Notion
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
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Carregando...</div>
          ) : notes.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Nenhuma anotação encontrada</div>
          ) : (
            notes.map((note) => (
              <a
                key={note.id}
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:text-gray-100 block transition"
              >
                <div className="flex items-center space-x-2 text-base md:text-lg text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(note.createdTime)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Book className="w-4 h-4" />
                    {note.readingTime || 'Tempo não informado'}
                  </span>
                </div>
                <h4 className="text-xl md:text-2xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors dark:text-gray-100 dark:group-hover:text-indigo-400 mb-2">
                  {note.title}
                </h4>
                {note.texto && (
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-3">
                    {note.texto}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {note.tags && note.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))
          )}
        </div>
      </main>
    </AppBackground>
  );
}

export default AllNotionNotes;
