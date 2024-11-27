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
    title: "Abordagens Modernas para Arquitetura Zero-Trust",
    journal: "Revista de Pesquisa em Cibersegurança",
    date: "Março de 2024",
    description: "Uma análise da implementação de arquitetura zero-trust em ambientes corporativos.",
    link: "#"
  },
  {
    title: "Aprendizado de Máquina na Detecção de Ameaças",
    journal: "Conferência Internacional de Segurança",
    date: "Janeiro de 2024",
    description: "Artigo de pesquisa sobre a aplicação de algoritmos de aprendizado de máquina para detectar ameaças emergentes.",
    link: "#"
  }
];

export function PublicationsContent() {
  return (
    <div className="space-y-6">
      {publications.map((pub, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">{pub.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{pub.journal} • {pub.date}</p>
              <p className="mt-1 text-gray-600 dark:text-gray-300">{pub.description}</p>
              <a
                href={pub.link}
                className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
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
