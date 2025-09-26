import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Book } from 'lucide-react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { BackToTopButton } from '@/components/common/BackToTopButton';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

interface NotionNote {
  id: string;
  url: string;
  createdTime: string;
  readingTime?: string;
  title: string;
  texto?: string;
  tags?: string[];
}

export function AllNotionNotes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NotionNote[]>(location.state?.notes || []);
  const [loading, setLoading] = useState(!location.state?.notes);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    if (!location.state?.notes) {
      fetch('https://portifolio-api-mu.vercel.app/api/notion/notes')
        .then((res) => res.json())
        .then((data) => setNotes(data))
        .finally(() => setLoading(false));
    }
  }, [location.state]);


  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  // Tags únicas e notas filtradas
  const allTags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => n.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notes.filter((n) => {
      const hay = `${n.title} ${n.texto || ''}`.toLowerCase();
      const textMatch = !q || hay.includes(q) || (n.tags ? n.tags.some((t) => t.toLowerCase().includes(q)) : false);
      const tagMatch = !activeTag || (n.tags ? n.tags.includes(activeTag) : false);
      return textMatch && tagMatch;
    });
  }, [notes, search, activeTag]);

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Todas as Anotações do Notion</h2>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
          </Link>
        </div>

        {/* Filtro mobile-first (mantém sidebar no desktop) */}
        <section aria-label="Filtros" className="md:hidden sticky top-20 z-20 mb-4">
          <div className="bg-white/85 dark:bg-gray-800/85 backdrop-blur rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, texto ou tag..."
              aria-label="Buscar anotações"
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className={`px-3 py-1 text-sm rounded-full border ${activeTag === null ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-transparent'}`}
                >
                  Todas
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`px-3 py-1 text-sm rounded-full border ${activeTag === tag ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-transparent'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lista de notas */}
          <div className="md:col-span-2 space-y-6">
            {loading ? (
              <LoadingSpinner message="Carregando anotações..." />
            ) : filteredNotes.length === 0 ? (
              <div className="text-center py-4 text-gray-500">Nenhuma anotação encontrada</div>
            ) : (
              filteredNotes.map((note: NotionNote) => (
                <article key={note.id} id={`note-${note.id}`}>
                  <a
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
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-3">{note.texto}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {note.tags?.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </article>
              ))
            )}
          </div>

          {/* Sidebar (desktop) */}
          <aside className="md:col-span-1 hidden md:block">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <label htmlFor="search-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Buscar
                </label>
                <input
                  id="search-notes"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Título, texto ou tag"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {allTags.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Filtrar por tag</h3>
                    <button
                      onClick={() => setActiveTag(null)}
                      className={`text-xs px-2 py-1 rounded-full border transition ${activeTag === null ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'}`}
                    >
                      Todas
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                        className={`px-3 py-1 text-sm rounded-full border transition ${activeTag === tag ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredNotes.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Conteúdos</h3>
                  <ul className="space-y-2 max-h-80 overflow-auto pr-1">
                    {filteredNotes.map((n) => (
                      <li key={`toc-${n.id}`}>
                        <a href={`#note-${n.id}`} className="block text-sm text-indigo-700 dark:text-indigo-300 hover:underline">
                          {n.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Ações finais */}
        <BackToTopButton />
        <section aria-label="Rodapé" className="relative mt-2 mb-2">
          <div className="relative overflow-hidden rounded-2xl border border-indigo-200/30 dark:border-indigo-800/40 bg-gradient-to-r from-indigo-600/10 via-fuchsia-600/10 to-blue-600/10 dark:from-indigo-500/10 dark:via-fuchsia-500/10 dark:to-blue-500/10 p-3 text-center">
            <div className="pointer-events-none absolute inset-0">
              <span className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
              <span className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-2xl" />
            </div>
            <div className="relative mx-auto max-w-2xl flex flex-col items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/15 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300 shadow-sm">
                <Book className="w-5 h-5" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">Em breve, mais conteúdos</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">Novas anotações e guias estão a caminho.</p>
            </div>
          </div>
        </section>
  </main>
  );
}

export default AllNotionNotes;
