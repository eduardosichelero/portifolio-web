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
    <div className="space-y-4 md:space-y-6 max-h-[400px] overflow-y-auto px-2">
      {publications.map((pub, index) => (
        <div
          key={index}
          className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0 sm:max-w-xs sm:mx-auto sm:pb-4"
        >
          <div className="flex items-start space-x-4 sm:space-x-3">
            <div className="flex-shrink-0">
              <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white sm:text-sm">
                {pub.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-xs">
                {pub.journal} • {pub.date}
              </p>
              <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm sm:text-xs">
                {pub.description}
              </p>
              <a
                href={pub.link}
                className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500 sm:text-xs"
              >
                <Link className="w-4 h-4 mr-1" />
                Leia mais
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
