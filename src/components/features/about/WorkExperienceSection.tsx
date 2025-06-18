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
    title: 'Estagiário em Ciência da Computação',
    company: 'Prefeitura Municipal de Carazinho',
    duration: 'Fevereiro de 2024 - Atualmente',
    achievements: [
      'Responsável pela manutenção e configuração de computadores com sistemas Windows e Linux.',
      'Efetuo ajustes e configurações em redes locais, garantindo a conectividade e a segurança da infraestrutura.',
      'Presto suporte técnico, tanto presencial quanto remoto, para solucionar problemas de hardware e software.',
      'Realizo a manutenção em servidores, tanto Linux quanto Windows Server, assegurando seu bom funcionamento.',
    ],
  },
  {
    title: 'Freelancer em Tecnologia da Informação',
    company: 'Autônomo',
    duration: 'Janeiro de 2020 - Atualmente',
    achievements: [
      'Presto serviços de manutenção preventiva e corretiva em computadores e servidores, atuando tanto no hardware quanto no software.',
      'Instalo e configuro sistemas operacionais, como Windows e Linux, atendendo tanto a usuários domésticos quanto a empresas.',
      'Implemento redes locais e Wi-Fi, garantindo alto desempenho e segurança para pequenas empresas.',
      'Ofereço suporte técnico remoto e presencial, solucionando problemas e fornecendo treinamento aos usuários sobre o uso das tecnologias.',
      'Consultoria na aquisição e upgrade de equipamentos, ajudando a otimizar a infraestrutura tecnológica dos meus clientes.',
    ],
  },
  {
    title: 'Auxiliar de Monitoramento',
    company: 'BRK Tecnologia',
    duration: 'Setembro de 2023 - Fevereiro de 2024',
    location: 'Carazinho, Rio Grande do Sul, Brasil',
    type: 'Presencial',
    achievements: [
      'Realizei o monitoramento de veículos por meio de sistemas internos de logística, garantindo a eficiência nas operações.',
      'Fui responsável pela expedição de cargas, utilizando ferramentas do Microsoft Office para gerenciar e otimizar os processos.',
      'Utilizei análises de dados com Python para ajudar na otimização dos processos logísticos, melhorando a precisão e a agilidade.',
    ],
  }
];


export function WorkExperienceSection() {
  useEffect(() => {
    ScrollReveal().reveal('.work-experience-section', {
      distance: '50px',
      duration: 700,
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
