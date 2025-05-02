import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Book } from 'lucide-react';
import { Header } from '../../screens/Header';

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes < 1 ? '1 min de leitura' : `${minutes} min de leitura`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export function AllNotionNotes() {
  const location = useLocation();
  const notes = location.state?.notes || [];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-gray-900">
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
          {notes.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Nenhuma anotação encontrada</div>
          ) : (
            notes.map((note, index) => {
              const readingTime = calculateReadingTime(note.texto);
              return (
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
                      {readingTime}
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
                        className="px-3 py-1 text-sm md:text-base font-medium bg-gray-100 text-gray-600 rounded-full dark:bg-gray-700 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
