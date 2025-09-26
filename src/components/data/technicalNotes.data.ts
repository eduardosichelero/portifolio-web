export interface TechnicalNote {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  category: string;
  content?: string;
  lastUpdated?: string;
}

export const technicalNotesData: TechnicalNote[] = [
  {
    id: '1',
    title: 'Configuração de Firewall pfSense',
    description: 'Guia completo para configuração de regras de firewall, VPN e políticas de segurança no pfSense',
    tags: ['firewall', 'pfsense', 'segurança', 'vpn'],
    date: '2024-12-15',
    category: 'segurança',
    content: 'Configurações básicas e avançadas do pfSense...',
    lastUpdated: '2024-12-20'
  },
  {
    id: '2',
    title: 'Virtualização com Proxmox VE',
    description: 'Setup e gerenciamento de máquinas virtuais e containers LXC no Proxmox Virtual Environment',
    tags: ['proxmox', 'virtualização', 'vm', 'lxc', 'containers'],
    date: '2024-12-10',
    category: 'virtualização',
    content: 'Instalação e configuração do Proxmox...',
    lastUpdated: '2024-12-18'
  },
  {
    id: '3',
    title: 'Monitoramento com Zabbix',
    description: 'Implementação de sistema de monitoramento completo usando Zabbix e integração com Grafana',
    tags: ['zabbix', 'monitoramento', 'grafana', 'alertas'],
    date: '2024-12-05',
    category: 'monitoramento',
    content: 'Configuração do servidor Zabbix...',
    lastUpdated: '2024-12-16'
  },
  {
    id: '4',
    title: 'MikroTik RouterOS - Configuração Básica',
    description: 'Configuração inicial de roteadores MikroTik, incluindo DHCP, firewall e QoS',
    tags: ['mikrotik', 'routeros', 'redes', 'dhcp', 'qos'],
    date: '2024-12-01',
    category: 'redes',
    content: 'Primeiros passos com RouterOS...',
    lastUpdated: '2024-12-14'
  },
  {
    id: '5',
    title: 'Linux Server Hardening',
    description: 'Práticas de segurança para servidores Linux, incluindo SSH, UFW e fail2ban',
    tags: ['linux', 'segurança', 'ssh', 'ufw', 'fail2ban'],
    date: '2024-11-28',
    category: 'linux',
    content: 'Hardening básico de servidores Linux...',
    lastUpdated: '2024-12-12'
  },
  {
    id: '6',
    title: 'Backup e Recovery com Veeam',
    description: 'Estratégias de backup para ambientes virtualizados usando Veeam Backup & Replication',
    tags: ['backup', 'veeam', 'recovery', 'virtualização'],
    date: '2024-11-25',
    category: 'backup',
    content: 'Configuração de políticas de backup...',
    lastUpdated: '2024-12-10'
  },
  {
    id: '7',
    title: 'VPN Site-to-Site com pfSense',
    description: 'Configuração de túneis VPN IPSec entre filiais usando pfSense',
    tags: ['vpn', 'ipsec', 'pfsense', 'site-to-site'],
    date: '2024-11-20',
    category: 'segurança',
    content: 'Setup de VPN corporativa...',
    lastUpdated: '2024-12-08'
  },
  {
    id: '8',
    title: 'Docker e Container Management',
    description: 'Containerização de aplicações e gerenciamento com Docker Compose',
    tags: ['docker', 'containers', 'compose', 'devops'],
    date: '2024-11-18',
    category: 'containers',
    content: 'Introdução ao Docker...',
    lastUpdated: '2024-12-06'
  },
  {
    id: '9',
    title: 'VLAN Configuration e Trunking',
    description: 'Configuração de VLANs em switches gerenciáveis e implementação de trunking',
    tags: ['vlan', 'switches', 'trunking', 'redes'],
    date: '2024-11-15',
    category: 'redes',
    content: 'Segmentação de redes com VLANs...',
    lastUpdated: '2024-12-04'
  },
  {
    id: '10',
    title: 'Active Directory e Domain Controller',
    description: 'Implementação e gerenciamento de Active Directory em ambiente Windows Server',
    tags: ['active-directory', 'windows-server', 'domain', 'gpo'],
    date: '2024-11-12',
    category: 'windows',
    content: 'Setup do Active Directory...',
    lastUpdated: '2024-12-02'
  },
  {
    id: '11',
    title: 'Nginx Load Balancer e Reverse Proxy',
    description: 'Configuração de load balancing e reverse proxy usando Nginx',
    tags: ['nginx', 'load-balancer', 'proxy', 'web-server'],
    date: '2024-11-10',
    category: 'web',
    content: 'Configuração avançada do Nginx...',
    lastUpdated: '2024-11-30'
  },
  {
    id: '12',
    title: 'Database Backup Automation',
    description: 'Automação de backups de bancos de dados MySQL e PostgreSQL',
    tags: ['database', 'mysql', 'postgresql', 'backup', 'automation'],
    date: '2024-11-08',
    category: 'database',
    content: 'Scripts de backup automatizado...',
    lastUpdated: '2024-11-28'
  },
  {
    id: '13',
    title: 'Sophos XG Firewall - Primeiros Passos',
    description: 'Configuração inicial do Sophos XG Firewall e políticas de segurança básicas',
    tags: ['sophos', 'firewall', 'xg', 'segurança'],
    date: '2024-11-05',
    category: 'segurança',
    content: 'Introdução ao Sophos XG...',
    lastUpdated: '2024-11-26'
  },
  {
    id: '14',
    title: 'Kubernetes Cluster Setup',
    description: 'Implementação de cluster Kubernetes para orquestração de containers',
    tags: ['kubernetes', 'k8s', 'cluster', 'orchestration'],
    date: '2024-11-03',
    category: 'containers',
    content: 'Setup básico do Kubernetes...',
    lastUpdated: '2024-11-24'
  },
  {
    id: '15',
    title: 'Network Troubleshooting com Wireshark',
    description: 'Técnicas de análise de tráfego de rede usando Wireshark para troubleshooting',
    tags: ['wireshark', 'network', 'troubleshooting', 'análise'],
    date: '2024-11-01',
    category: 'redes',
    content: 'Análise de pacotes com Wireshark...',
    lastUpdated: '2024-11-22'
  },
  {
    id: '16',
    title: 'SSL/TLS Certificate Management',
    description: 'Gerenciamento de certificados SSL/TLS e implementação de HTTPS',
    tags: ['ssl', 'tls', 'certificates', 'https', 'segurança'],
    date: '2024-10-28',
    category: 'segurança',
    content: 'Gestão de certificados digitais...',
    lastUpdated: '2024-11-20'
  },
  {
    id: '17',
    title: 'Elasticsearch e Log Management',
    description: 'Implementação de stack ELK (Elasticsearch, Logstash, Kibana) para análise de logs',
    tags: ['elasticsearch', 'elk', 'logs', 'kibana', 'logstash'],
    date: '2024-10-25',
    category: 'monitoramento',
    content: 'Setup do stack ELK...',
    lastUpdated: '2024-11-18'
  },
  {
    id: '18',
    title: 'PowerShell Automation Scripts',
    description: 'Scripts PowerShell para automação de tarefas administrativas em Windows',
    tags: ['powershell', 'automation', 'windows', 'scripts'],
    date: '2024-10-22',
    category: 'automation',
    content: 'Automação com PowerShell...',
    lastUpdated: '2024-11-16'
  },
  {
    id: '19',
    title: 'Hyper-V Virtualization Setup',
    description: 'Configuração e gerenciamento de ambiente de virtualização Hyper-V',
    tags: ['hyper-v', 'virtualização', 'windows', 'vm'],
    date: '2024-10-20',
    category: 'virtualização',
    content: 'Setup do Hyper-V...',
    lastUpdated: '2024-11-14'
  },
  {
    id: '20',
    title: 'Incident Response Playbook',
    description: 'Procedimentos padronizados para resposta a incidentes de segurança',
    tags: ['incident-response', 'security', 'playbook', 'procedures'],
    date: '2024-10-18',
    category: 'segurança',
    content: 'Playbook de resposta a incidentes...',
    lastUpdated: '2024-11-12'
  },
  {
    id: '21',
    title: 'Ansible Configuration Management',
    description: 'Automação de configuração de servidores usando Ansible',
    tags: ['ansible', 'automation', 'configuration', 'devops'],
    date: '2024-10-15',
    category: 'automation',
    content: 'Gerenciamento de configuração com Ansible...',
    lastUpdated: '2024-11-10'
  },
  {
    id: '22',
    title: 'RAID Configuration e Storage',
    description: 'Configuração de arrays RAID e estratégias de armazenamento empresarial',
    tags: ['raid', 'storage', 'hardware', 'backup'],
    date: '2024-10-12',
    category: 'storage',
    content: 'Configuração de RAID...',
    lastUpdated: '2024-11-08'
  },
  {
    id: '23',
    title: 'Git Workflow e Version Control',
    description: 'Práticas de controle de versão e workflows Git para projetos de infraestrutura',
    tags: ['git', 'version-control', 'workflow', 'devops'],
    date: '2024-10-10',
    category: 'devops',
    content: 'Workflows Git para infraestrutura...',
    lastUpdated: '2024-11-06'
  },
  {
    id: '24',
    title: 'Network Security Assessment',
    description: 'Metodologias para avaliação de segurança de redes corporativas',
    tags: ['network-security', 'assessment', 'pentest', 'segurança'],
    date: '2024-10-08',
    category: 'segurança',
    content: 'Avaliação de segurança de redes...',
    lastUpdated: '2024-11-04'
  }
];

// Função para obter anotações por categoria
export const getNotesByCategory = (category: string): TechnicalNote[] => {
  return technicalNotesData.filter(note => 
    note.category.toLowerCase() === category.toLowerCase()
  );
};

// Função para obter anotações recentes
export const getRecentNotes = (limit: number = 5): TechnicalNote[] => {
  return technicalNotesData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Função para buscar anotações por tags
export const getNotesByTags = (tags: string[]): TechnicalNote[] => {
  return technicalNotesData.filter(note =>
    tags.some(tag => 
      note.tags.some(noteTag => 
        noteTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
};

// Função para obter estatísticas das anotações
export const getNotesStats = () => {
  const categories = [...new Set(technicalNotesData.map(note => note.category))];
  const totalNotes = technicalNotesData.length;
  const totalTags = [...new Set(technicalNotesData.flatMap(note => note.tags))].length;
  
  return {
    totalNotes,
    totalCategories: categories.length,
    totalTags,
    categories: categories.map(category => ({
      name: category,
      count: getNotesByCategory(category).length
    }))
  };
};
