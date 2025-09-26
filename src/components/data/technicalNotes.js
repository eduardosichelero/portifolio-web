// Dados das anotações técnicas
export const technicalNotesData = [
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
  }
];

// Função para obter anotações por categoria
export const getNotesByCategory = (category) => {
  return technicalNotesData.filter(note => 
    note.category.toLowerCase() === category.toLowerCase()
  );
};

// Função para obter anotações recentes
export const getRecentNotes = (limit = 5) => {
  return technicalNotesData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
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
