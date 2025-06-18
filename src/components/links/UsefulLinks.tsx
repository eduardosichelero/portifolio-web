import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { ExternalLink, Book, Code, Shield, Laptop, HardDriveDownload, NotebookPen } from 'lucide-react';

interface Link {
  title: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  category: string[];
}

const links: Link[] = [
  {
    title: "Drive instaladores",
    url: "https://drive.google.com/drive/folders/1OQQPuzqtqGKy7DYDtUnlifa45rJgm90o?usp=sharing",
    description: "Recursos úteis como instaladores e scripts",
    icon: <HardDriveDownload className="w-5 h-5" />,
    category: ["Segurança", "Ferramentas"]
  },
  {
    title: "Notion",
    url: "https://eduardosichelero.notion.site/Caderno-de-Anota-es-16b567501ddb45aea10ea7e0894da4de",
    description: "Caderno de anotações",
    icon: <NotebookPen className="w-5 h-5" />,
    category: ["Anotações"]
  },
  {
    title: "Curso de Criptografia",
    url: "https://www.coursera.org/learn/crypto",
    description: "Fundamentos de criptografia da Stanford",
    icon: <Book className="w-5 h-5" />,
    category: ["Aprendizado"]
  },
  {
    title: "Google Cybersecurity",
    url: "https://www.coursera.org/programs/cybersecurity-10mk1/professional-certificates/google-cybersecurity?collectionId=3s0c9",
    description: "Programa de certificação do Google",
    icon: <Book className="w-5 h-5" />,
    category: ["Segurança", "Aprendizado"]
  },
  {
    title: "Ferramentas de Segurança",
    url: "https://github.com/topics/security-tools",
    description: "Ferramentas open source de segurança",
    icon: <Code className="w-5 h-5" />,
    category: ["Ferramentas"]
  }
];

export function UsefulLinks() {
  useEffect(() => {
    ScrollReveal().reveal('.useful-links-container', {
      distance: '50px',
      duration: 600, 
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true, 
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 useful-links-container">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recursos Úteis</h3>
      <div className="grid gap-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-600 flex items-center justify-center text-indigo-600 dark:text-white">
              {link.icon}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 group-hover:text-indigo-600">
                  {link.title}
                </h4>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-400 group-hover:text-indigo-600" />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{link.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {link.category.map((cat, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
