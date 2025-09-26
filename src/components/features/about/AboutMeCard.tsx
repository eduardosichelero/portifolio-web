import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import profileImage from '@/assets/profile.png';
import { AiOutlineLinkedin } from 'react-icons/ai'; 
import { SiNotion } from 'react-icons/si';
import OptimizedImage from '../../common/OptimizedImage'; 

export function AboutMeCard() {
  useEffect(() => {
    ScrollReveal().reveal('.about-me-card', {
      distance: '50px',
      duration: 600,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 600,
      reset: true,
    });
  }, []);

  return (
    <div className="about-me-card bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-11 dark:bg-gray-800 dark:text-gray-100">
      {/* Foto */}
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 dark:bg-gray-600">
        <OptimizedImage
          src={profileImage}
          alt="Eduardo Sichelero - Foto de perfil"
          className="object-cover w-full h-full"
          width={128}
          height={128}
          loading="eager"
        />
      </div>

      {/* Informações */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Eduardo Sichelero</h2>
        <p className="text-gray-600 mt-2 dark:text-gray-300">
          Sou o Eduardo, estudante de Ciência da Computação na <strong>ATITUS</strong>, em Passo Fundo.
          No momento, estou focado em <strong>redes de computadores</strong>, <strong>máquinas virtuais</strong> e <strong>Linux</strong>.
        </p>
        <p className="text-gray-600 mt-2 dark:text-gray-300">
          No dia a dia, realizo <strong>configuração</strong> e <strong>monitoramento</strong> de servidores Linux, utilizando
          tecnologias como <strong>Proxmox</strong>, <strong>VirtualBox</strong>, <strong>Mikrotik RouterOS</strong>, e para observabilidade
          <strong> Zabbix</strong> e <strong>Grafana</strong>. Para firewall, uso <strong>pfSense</strong> e estou começando com <strong>Sophos</strong>.
        </p>
        <p className="text-gray-600 mt-2 dark:text-gray-300">
          Estou focado nessa área e pretendo seguir para <strong>Segurança</strong> em breve. Também compartilho minhas anotações e conteúdos
          no meu <strong>Notion</strong>. Fique à vontade para conferir!
        </p>

        {/* Links */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <a
            href="https://eduardosichelero.notion.site/Caderno-de-Anota-es-16b567501ddb45aea10ea7e0894da4de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 font-medium bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-md"
          >
            <SiNotion className="mr-2 text-xl" /> Acesse meu Notion
          </a>
          <a
            href="https://www.linkedin.com/in/eduardo-sichelero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-2 sm:mt-0 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 font-medium"
          >
            <AiOutlineLinkedin className="mr-2 text-xl" /> Conecte-se comigo
          </a>
        </div>

        {/* Interesses */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Interesses:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100">
              Redes
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
              Linux
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100">
              Virtualização
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100">
              Servidores
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100">
              Monitoramento
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">
              Firewall
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
