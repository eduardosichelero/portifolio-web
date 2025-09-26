import type { ReactNode } from 'react';
import { GraduationCap, Globe, HardDriveDownload, FolderOpen, NotebookPen, Book, Code } from 'lucide-react';

export interface UsefulLink {
  title: string;
  url: string;
  description: string;
  icon: ReactNode;
  category: string[];
  isCurrent?: boolean;
}

export const usefulLinks: UsefulLink[] = [
  {
    title: 'Dispositivos de Rede e Configuração Inicial',
    url: 'https://www.netacad.com/pt/launch?id=ed51fa37-4652-45cf-a7b1-d13e2b9d3f4c&tab=curriculum&view=493e2386-408b-5140-81fa-ac5a83ffb705',
    description: 'Curso em andamento na Cisco Networking Academy',
    icon: <GraduationCap className="w-5 h-5" />,
    category: ['Curso', 'Redes'],
    isCurrent: true,
  },
  {
    title: 'OS Click',
    url: 'https://os.click/en',
    description: 'Portal e recursos',
    icon: <Globe className="w-5 h-5" />,
    category: ['Plataforma'],
  },
  {
    title: 'Drive instaladores',
    url: 'https://drive.google.com/drive/folders/1OQQPuzqtqGKy7DYDtUnlifa45rJgm90o?usp=sharing',
    description: 'Recursos úteis como instaladores e scripts',
    icon: <HardDriveDownload className="w-5 h-5" />,
    category: ['Segurança', 'Ferramentas'],
  },
  {
    title: 'TecHub',
    url: 'https://drive.google.com/drive/folders/15JSNjIU9W1kUCO38Ca_UlC9zrm99wePu?usp=sharing',
    description: 'Pasta TecHub no Drive',
    icon: <FolderOpen className="w-5 h-5" />,
    category: ['Materiais'],
  },
  {
    title: 'Notion',
    url: 'https://eduardosichelero.notion.site/Caderno-de-Anota-es-16b567501ddb45aea10ea7e0894da4de',
    description: 'Caderno de anotações',
    icon: <NotebookPen className="w-5 h-5" />,
    category: ['Anotações'],
  },
  {
    title: 'Google Cybersecurity',
    url: 'https://www.coursera.org/programs/cybersecurity-10mk1/professional-certificates/google-cybersecurity?collectionId=3s0c9',
    description: 'Programa de certificação do Google',
    icon: <Book className="w-5 h-5" />,
    category: ['Segurança', 'Aprendizado'],
  },
  {
    title: 'Ferramentas de Segurança',
    url: 'https://github.com/topics/security-tools',
    description: 'Ferramentas open source de segurança',
    icon: <Code className="w-5 h-5" />,
    category: ['Ferramentas'],
  },
];
