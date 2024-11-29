import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { ExternalLink, Book, Code, Shield, Laptop } from 'lucide-react';

interface Link {
  title: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const links: Link[] = [
  {
    title: "OWASP Top 10",
    url: "https://owasp.org/www-project-top-ten/",
    description: "Riscos essenciais de segurança em aplicações web",
    icon: <Shield className="w-5 h-5" />,
    category: "Segurança"
  },
  {
    title: "Curso de Criptografia",
    url: "https://www.coursera.org/learn/crypto",
    description: "Fundamentos de criptografia da Stanford",
    icon: <Book className="w-5 h-5" />,
    category: "Aprendizado"
  },
  {
    title: "CTF Time",
    url: "https://ctftime.org/",
    description: "Competições de Capture The Flag",
    icon: <Laptop className="w-5 h-5" />,
    category: "Prática"
  },
  {
    title: "Ferramentas de Segurança",
    url: "https://github.com/topics/security-tools",
    description: "Ferramentas open source de segurança",
    icon: <Code className="w-5 h-5" />,
    category: "Ferramentas"
  }
];

export function UsefulLinks() {
  useEffect(() => {
    ScrollReveal().reveal('.useful-links-container', {
      distance: '50px',
      duration: 1000, 
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
              <span className="mt-2 inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                {link.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
