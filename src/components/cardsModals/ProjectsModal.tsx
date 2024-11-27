import React from 'react';
import { Shield, Globe, Server } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Sistema de Detecção de Intrusão na Rede",
    description: "Desenvolvi um sistema de monitoramento de rede em tempo real usando Python e algoritmos de aprendizado de máquina para detectar e prevenir ameaças de segurança.",
    icon: <Shield className="w-6 h-6 text-indigo-600" />,
    tags: ["Python", "ML", "Cibersegurança"]
  },
  {
    title: "Framework Seguro para Aplicações Web",
    description: "Construí um framework seguro para aplicações web com proteção integrada contra vulnerabilidades comuns, como XSS e CSRF.",
    icon: <Globe className="w-6 h-6 text-green-600" />,
    tags: ["TypeScript", "React", "Segurança"]
  },
  {
    title: "Sistema de Banco de Dados Criptografado",
    description: "Implementei um sistema de banco de dados criptografado com criptografia de ponta a ponta para armazenamento de dados sensíveis.",
    icon: <Server className="w-6 h-6 text-blue-600" />,
    tags: ["Criptografia", "Banco de Dados", "Segurança"]
  }
];

export function ProjectsContent() {
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">{project.icon}</div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">{project.title}</h4>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{project.description}</p>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
