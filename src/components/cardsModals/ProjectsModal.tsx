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
      className="space-y-4 md:space-y-6 max-h-[500px] overflow-y-auto px-2" // Define altura máxima e adiciona barra de rolagem
    >
      {projects.map((project, index) => (
        <div
          key={index}
          className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0 sm:max-w-xs sm:mx-auto sm:pb-4"
        >
          <div className="flex items-start space-x-4 sm:space-x-3">
            <div className="flex-shrink-0">{project.icon}</div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white sm:text-sm">
                {project.title}
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm sm:text-xs">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-indigo-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 text-sm sm:text-xs font-medium"
              >
                Ver Repositório
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
