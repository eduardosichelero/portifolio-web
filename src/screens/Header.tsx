import React, { useState, useEffect } from 'react';
import { Layout } from 'lucide-react';
import { DarkModeToggle } from '../components/useful/DarkModeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Eduardo Sichelero
            </h1>
          </div>

          {/* Botão de Alternância de Temas */}
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}