import React, { useState, useEffect } from 'react';
import { Layout, User, Menu, X } from 'lucide-react';
import { DarkModeToggle } from '../components/useful/DarkModeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header Principal */}
      <header
        className={`bg-white shadow-sm fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        } mb-8 dark:bg-gray-800`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e Título */}
            <div className="flex items-center space-x-3">
              <Layout className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Eduardo Sichelero</h1>
            </div>

            {/* Botão Menu Hamburguer para Mobile */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Navegação para Desktop */}
            <nav className="hidden sm:flex items-center space-x-6">
              <a
                href="/"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Início
              </a>
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Dashboard
              </a>
              <a
                href="/blog"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Blog
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Sobre
              </a>

              {/* Botão de Alternância de Tema (Desktop) */}
              <DarkModeToggle />
            </nav>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white shadow-md dark:bg-gray-800">
            <nav className="flex flex-col space-y-2 p-4">
              <a
                href="/"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Início
              </a>
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Dashboard
              </a>
              <a
                href="/blog"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Blog
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-indigo-600 font-medium dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Sobre
              </a>

              {/* Botão de Alternância de Tema (Mobile) */}
              <DarkModeToggle />
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
