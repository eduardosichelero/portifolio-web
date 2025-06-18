import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotionNotes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ScrollReveal().reveal('.notion-notes-container', {
      distance: '50px',
      duration: 600, // ajustado para 600ms
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true,
    });
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://portifolio-api-mu.vercel.app/api/notion/notes');
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        const sorted = data.sort((a: any, b: any) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
        setNotes(sorted);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

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
        <div className="text-center py-4 text-red-500">Erro ao carregar anotações: {error}</div>
      ) : loading ? (
        <div className="text-center py-4 text-gray-500">Carregando...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-4 text-gray-500">Nenhuma anotação encontrada</div>
      ) : (
        <div className="space-y-4">
          {previewNotes.map((note) => (
            <a
              key={note.id}
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-1 flex-wrap">
                {note.createdTime && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(note.createdTime)}</span>
                  </div>
                )}
                {note.lastEditedTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDateTime(note.lastEditedTime)}</span>
                  </div>
                )}
                <ExternalLink className="w-4 h-4 ml-auto opacity-70 group-hover:opacity-100" />
              </div>

              <h4 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 mb-2">
                {note.title || 'Título não disponível'}
              </h4>

              {note.texto && (
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {note.texto}
                </p>
              )}

              {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.tags.map((tag: string, index: number) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
