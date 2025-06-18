import React from 'react';
import { Shield, Globe, Server, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  repoLink: string; 
}

const projects: Project[] = [
  {
    title: "Sistema de Detecção de Intrusão na Rede",
    description: "Sistema de monitoramento de rede com Python e aprendizado de máquina para detectar ameaças.",
    icon: <Shield className="w-6 h-6 text-indigo-600" />,
    tags: ["Python", "ML", "Cibersegurança"],
    repoLink: "https://github.com/seu-usuario/intrusion-detection-system"
  },
  {
    title: "Framework Seguro para Aplicações Web",
    description: "Framework para proteção contra vulnerabilidades como XSS e CSRF em aplicações web.",
    icon: <Globe className="w-6 h-6 text-green-600" />,
    tags: ["TypeScript", "React", "Segurança"],
    repoLink: "https://github.com/seu-usuario/secure-web-framework"
  },
  {
    title: "Sistema de Banco de Dados Criptografado",
    description: "Banco de dados criptografado para armazenamento seguro de dados sensíveis.",
    icon: <Server className="w-6 h-6 text-blue-600" />,
    tags: ["Criptografia", "Banco de Dados", "Segurança"],
    repoLink: "https://github.com/seu-usuario/encrypted-database"
  },
];

export function ProjectsContent() {
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
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0">{project.icon}</div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-indigo-100"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-end">
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors text-sm md:text-base"
              >
                Ver Repositório
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}