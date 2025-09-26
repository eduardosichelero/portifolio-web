import { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import { BookOpen, Shield, Code, GraduationCap, Server, PcCase} from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { ProjectsContent } from '@/components/common/ProjectsModal';
import { PublicationsContent } from '@/components/common/PublicationsModal';

export function ProfileSection() {
  const [modalState, setModalState] = useState<{ type: string | null; isOpen: boolean }>({
    type: null,
    isOpen: false,
  });

  useEffect(() => {
    ScrollReveal().reveal('.profile-section', {
      distance: '50px',
      duration: 600,
      easing: 'ease-out',
      origin: 'top',
      delay: 600,
      reset: true, 
    });
  }, []);

  const openProjectsModal = () => {
    setModalState({ type: 'projects', isOpen: true });
  };

  const openPublicationsModal = () => {
    setModalState({ type: 'publications', isOpen: true });
  };

  return (
  <div className="profile-section bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 mt-16">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-700 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Estudante de Ciência da Computação</h2>
          <p className="text-gray-600 dark:text-gray-300">Focado em Redes, Linux e Virtualização (rumo à Segurança)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>5º semestre de graduação</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <PcCase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Redes, Linux e Virtualização</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Configuração e monitoramento de servidores</span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Atualmente estou estudando redes de computadores, máquinas virtuais e Linux. No dia a dia faço
        configuração e monitoramento de servidores Linux, utilizando <strong>Proxmox</strong>, <strong>VirtualBox</strong>,
        <strong> Mikrotik RouterOS</strong>, e para observabilidade <strong>Zabbix</strong> e <strong>Grafana</strong>.
        No firewall, uso <strong>pfSense</strong> e estou começando com <strong>Sophos</strong>.
        Estou focado nessa área e pretendo seguir com segurança (cibersegurança) em breve.
      </p>

      <div className="flex space-x-3">
        <button onClick={openProjectsModal} className="btn-primary">
          Ver Projetos
        </button>
        <button 
          onClick={openPublicationsModal} 
          className="btn-secondary dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Publicações
        </button>
      </div>

      {/* Modais */}
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'projects'}
        onClose={() => setModalState({ type: null, isOpen: false })}
        title="Portfólio de Projetos"
      >
        <ProjectsContent />
      </Modal>

      <Modal
        isOpen={modalState.isOpen && modalState.type === 'publications'}
        onClose={() => setModalState({ type: null, isOpen: false })}
        title="Publicações Acadêmicas"
      >
        <PublicationsContent />
      </Modal>
    </div>
  );
}