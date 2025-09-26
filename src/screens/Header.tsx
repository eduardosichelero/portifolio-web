import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Layout,
  Menu,
  X,
  FileDown,
  Send,
  Award,
  Target,
  BookOpen,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usefulLinks } from '@/components/links/usefulLinks.data';
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

type GoalsState = Array<{ id: string; title: string; progress?: number }>; // tipo leve
export function Header({ goals }: { goals?: GoalsState }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = useMemo(
    () => import.meta.env.VITE_API_URL || "https://portifolio-api-mu.vercel.app",
    []
  );

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/notion/notes`);
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, [apiUrl]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleNav = useCallback(() => setMenuOpen(false), []);

  const navigateToNotes = useCallback(() => {
    handleNav();
    navigate("/notes", { state: { notes } });
  }, [navigate, notes, handleNav]);

  const handleHome = useCallback(() => {
    handleNav();
    navigate("/");
  }, [navigate, handleNav]);

  return (
    <header
      className={`bg-white shadow-sm fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      } mb-8 dark:bg-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={handleHome}
          tabIndex={0}
          role="button"
          aria-label="Ir para a Home"
        >
          <Layout className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Eduardo Sichelero
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
          <DarkModeToggle />
        </div>
        <nav
          className={`fixed top-0 right-0 h-full w-72 max-w-full bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
          aria-label="Menu principal"
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
              Menu
            </span>
            <button
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex-1 flex flex-col gap-2 px-6 py-6">
            <li>
              <a
                href="curriculo-eduardo-sichelero.pdf"
                download
                className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-800 transition"
                title="Baixar Currículo em PDF"
                onClick={handleNav}
              >
                <FileDown className="w-5 h-5 mr-2" />
                Currículo
              </a>
            </li>
            <li>
              <a
                href="https://t.me/EduardoSichelero"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                title="Telegram"
                onClick={handleNav}
              >
                <Send className="w-5 h-5 mr-2" />
                Telegram
              </a>
            </li>
            <li>
              <Link
                to="/certificates"
                className="flex items-center px-3 py-2 rounded-md hover:bg-yellow-50 dark:hover:bg-yellow-900 transition"
                title="Minhas Certificações"
                onClick={handleNav}
              >
                <Award className="w-5 h-5 mr-2" />
                Certificações
              </Link>
            </li>
            <li>
              <Link
                to="/goals"
                state={goals ? { goals } : undefined}
                className="flex items-center px-3 py-2 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900 transition"
                title="Objetivos do Momento"
                onClick={handleNav}
              >
                <Target className="w-5 h-5 mr-2" />
                Objetivos
              </Link>
            </li>
            <li>
              {loading ? (
                <span className="flex items-center px-3 py-2 rounded-md text-gray-400">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Carregando...
                </span>
              ) : (
                <button
                  onClick={navigateToNotes}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md hover:bg-pink-50 dark:hover:bg-pink-900 transition"
                  title="Todas as Anotações do Notion"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Anotações
                </button>
              )}
            </li>
            {/* Bloco: Recursos Úteis (top 5) */}
            <li className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Recursos úteis</div>
              <ul className="flex flex-col gap-1">
                {usefulLinks.slice(0, 5).map((item, idx) => (
                  <li key={`useful-${idx}`}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      onClick={handleNav}
                    >
                      <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                        {item.icon}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{item.title}</span>
                      {item.isCurrent && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 border border-green-300 dark:border-green-600">Atual</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {/* Ação extra: Alternar tema dentro do menu */}
            <li className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <button
                onClick={() => {
                  const isDark = document.documentElement.classList.contains('dark');
                  const next = isDark ? 'light' : 'dark';
                  document.documentElement.classList.toggle('dark');
                  try { localStorage.setItem('theme', next); } catch {/* ignore */}
                }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm text-gray-700 dark:text-gray-300"
              >
                Alternar tema rapidamente
              </button>
            </li>
          </ul>
        </nav>
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}
