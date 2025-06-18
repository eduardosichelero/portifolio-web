import React from 'react';
import { BookOpen, Link } from 'lucide-react';

interface Publication {
  title: string;
  journal: string;
  date: string;
  description: string;
  link: string;
}

const publications: Publication[] = [
  {
    title: "Abordagens para Arquitetura Zero-Trust",
    journal: "Revista de Cibersegurança",
    date: "Março de 2024",
    description: "Análise da arquitetura zero-trust em empresas.",
    link: "#"
  },
  {
    title: "Aprendizado de Máquina e Segurança",
    journal: "Conf. Internacional de Segurança",
    date: "Jan. de 2024",
    description: "Aplicação de machine learning para detectar ameaças.",
    link: "#"
  },
];

export function PublicationsContent() {
  return (
    <div
      className="w-full max-w-2xl mx-auto px-2 max-h-[70vh] overflow-y-auto"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="hide-scrollbar flex flex-col gap-6">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0">
                <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                {pub.title}
              </h4>
            </div>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
              {pub.journal} • {pub.date}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-2">
              {pub.description}
            </p>
            <div className="flex justify-end">
              <a
                href={pub.link}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors text-sm md:text-base"
              >
                <Link className="w-4 h-4 mr-1" />
                Leia mais
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}