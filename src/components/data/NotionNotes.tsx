import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar, Clock, Book, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes < 1 ? '1 min de leitura' : `${minutes} min de leitura`;
};

export function NotionNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Configuração do ScrollReveal
    const sr = ScrollReveal();
    sr.reveal('.notion-notes-container', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true,
    });

    // Cleanup do ScrollReveal
    return () => sr.destroy();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notion/notes`);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        const sorted = data.sort((a, b) => 
          new Date(b.createdTime) - new Date(a.createdTime)
        );
        
        setNotes(sorted);
      } catch (error) {
        console.error('Erro ao buscar notas:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const previewNotes = notes.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:text-gray-100 notion-notes-container">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Anotações do Notion</h3>
        {notes.length > 3 && (
          <Link
            to="/notes"
            state={{ notes }}
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center"
          >
            Ver todas <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>

      {error ? (
        <div className="text-center py-4 text-red-500">
          Erro ao carregar anotações: {error}
        </div>
      ) : loading ? (
        <div className="text-center py-4 text-gray-500">Carregando...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-4 text-gray-500">Nenhuma anotação encontrada</div>
      ) : (
        <div className="space-y-4">
          {previewNotes.map(note => {
            const readingTime = calculateReadingTime(note.texto);
            return (
              <a
                key={note.id}
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(note.createdTime)}</span>
                  <div className="ml-4 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDateTime(note.lastEditedTime)}</span>
                  </div>
                  {note.texto && (
                    <div className="ml-4 flex items-center gap-1">
                      <Book className="w-4 h-4" />
                      <span>{readingTime}</span>
                    </div>
                  )}
                  <ExternalLink className="w-4 h-4 ml-auto opacity-70 group-hover:opacity-100" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 mb-2">
                  {note.title || 'Título não disponível'}
                </h4>
                {note.texto && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {note.texto}
                  </p>
                )}
                {note.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
