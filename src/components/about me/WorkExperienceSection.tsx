import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

interface Job {
  title: string;
  company: string;
  duration: string;
  achievements: string[];
}

const jobs: Job[] = [
  {
    title: 'Desenvolvedor Front-End',
    company: 'TechCorp',
    duration: 'Janeiro de 2020 - Dezembro de 2022',
    achievements: [
      'Desenvolvi aplicações interativas utilizando React.js.',
      'Implementei otimizações que reduziram o tempo de carregamento em 25%.',
      'Colaborei com equipes multidisciplinares para melhorar a experiência do usuário.',
    ],
  },
  {
    title: 'Analista de Sistemas',
    company: 'InfoSolutions',
    duration: 'Março de 2018 - Dezembro de 2019',
    achievements: [
      'Gerenciei projetos para a implementação de novos sistemas internos.',
      'Forneci suporte técnico e treinamento para a equipe de operações.',
      'Automatizei relatórios financeiros, reduzindo o tempo de processamento em 50%.',
    ],
  },
  {
    title: 'Estagiário de TI',
    company: 'StartupXYZ',
    duration: 'Julho de 2017 - Fevereiro de 2018',
    achievements: [
      'Realizei manutenção em sistemas legados e documentei processos técnicos.',
      'Auxiliei na migração de dados para uma nova plataforma.',
      'Criei scripts para simplificar tarefas rotineiras da equipe.',
    ],
  },
];

export function WorkExperienceSection() {
  useEffect(() => {
    ScrollReveal().reveal('.work-experience-section', {
      distance: '50px',
      duration: 1300,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 500,
      reset: true, 
    });
  }, []);

  return (
    <div className="work-experience-section bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-12">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Experiência Profissional</h2>
      <ul className="space-y-6">
        {jobs.map((job, index) => (
          <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:pb-0 last:border-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {job.company} • {job.duration}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              {job.achievements.map((achievement, idx) => (
                <li key={idx} className="text-sm text-gray-800 dark:text-gray-300">
                  {achievement}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
