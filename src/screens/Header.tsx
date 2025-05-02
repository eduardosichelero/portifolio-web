import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  X,
  FileDown,
  MessageCircle,
  Send,
  Award,
  Target,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DarkModeToggle } from "../components/useful/DarkModeToggle";

// Receba "goals" como prop ou do contexto global
export function Header({ goals }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Fecha o menu ao pressionar ESC
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Fecha o menu ao navegar
  const handleNav = () => setMenuOpen(false);

  return (
    <header
      className={`bg-white shadow-sm fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      } mb-8 dark:bg-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo e Título */}
        <div className="flex items-center space-x-3">
          <Layout className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Eduardo Sichelero
          </h1>
        </div>

        {/* Botões do lado direito */}
        <div className="flex items-center space-x-2">
          {/* Botão do menu hambúrguer */}
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
          {/* Alternador de tema */}
          <DarkModeToggle />
        </div>

        {/* Menu lateral */}
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
                href="/curriculo-eduardo-sichelero.pdf"
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
                href="https://wa.me/54999595865"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-md hover:bg-green-50 dark:hover:bg-green-900 transition"
                title="WhatsApp"
                onClick={handleNav}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
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
              <Link
                to="/notes"
                className="flex items-center px-3 py-2 rounded-md hover:bg-pink-50 dark:hover:bg-pink-900 transition"
                title="Minhas Anotações Recentes"
                onClick={handleNav}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Anotações
              </Link>
            </li>
          </ul>
        </nav>

        {/* Overlay para fechar o menu ao clicar fora */}
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
