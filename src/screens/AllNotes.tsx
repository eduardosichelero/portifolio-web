import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Server, Wifi, Globe } from 'lucide-react';
import { AppBackground } from '@/components/layout/AppBackground';
import { Header } from '@/screens/Header';
import { BackToTopButton } from '@/components/common/BackToTopButton';

// Interface atualizada para dados do Notion
interface TechnicalNote {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  date: string;
  category?: string;
  content?: string;
  lastUpdated?: string;
  url?: string; // URL do Notion
  createdTime?: string;
  lastEditedTime?: string;
}

export function AllNotes() {
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  const [notes, setNotes] = useState<TechnicalNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalCategories: 0,
    totalTags: 0,
    categories: [] as { name: string; count: number }[],
    lastUpdate: 'Carregando...'
  });

  // 🎯 CATEGORIAS PERMITIDAS - Apenas firewall, mikrotik, linux e redes
  const ALLOWED_CATEGORIES = ['segurança', 'redes', 'linux'];

  // 🔝 SCROLL TO TOP - Sempre começar no topo da página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Listener para mudanças de tema
    const handler = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Função para extrair categoria do título - FILTRADA
  const extractCategoryFromTitle = (title: string): string | null => {
    const titleLower = title.toLowerCase();
    
    // 🔥 FIREWALL E SEGURANÇA
    if (titleLower.includes('firewall') || 
        titleLower.includes('pfsense') || 
        titleLower.includes('sophos') || 
        titleLower.includes('fortinet') ||
        titleLower.includes('segurança') || 
        titleLower.includes('security') ||
        titleLower.includes('iptables') ||
        titleLower.includes('ufw')) {
      return 'segurança';
    }
    
    // 🌐 MIKROTIK E REDES
    if (titleLower.includes('mikrotik') || 
        titleLower.includes('routeros') ||
        titleLower.includes('rede') || 
        titleLower.includes('network') ||
        titleLower.includes('switch') ||
        titleLower.includes('router') ||
        titleLower.includes('vlan') ||
        titleLower.includes('ospf') ||
        titleLower.includes('bgp') ||
        titleLower.includes('dhcp') ||
        titleLower.includes('dns') ||
        titleLower.includes('vpn')) {
      return 'redes';
    }
    
    // 🐧 LINUX E SERVIDORES
    if (titleLower.includes('linux') || 
        titleLower.includes('ubuntu') ||
        titleLower.includes('debian') ||
        titleLower.includes('centos') ||
        titleLower.includes('redhat') ||
        titleLower.includes('servidor') || 
        titleLower.includes('server') ||
        titleLower.includes('bash') ||
        titleLower.includes('shell') ||
        titleLower.includes('systemd') ||
        titleLower.includes('apache') ||
        titleLower.includes('nginx')) {
      return 'linux';
    }
    
    // ❌ Retorna null se não for uma categoria permitida
    return null;
  };

  // Função para gerar descrição baseada no título e categoria
  const generateDescription = (title: string, category: string): string => {
    const descriptions: { [key: string]: string } = {
      'segurança': 'Configurações de firewall e proteção de sistemas',
      'redes': 'Configurações de rede MikroTik e equipamentos de conectividade',
      'linux': 'Administração de sistemas Linux e servidores'
    };
    
    return descriptions[category] || 'Documentação técnica especializada';
  };

  // Função para gerar tags baseadas no título e categoria
  const generateTags = (title: string, category: string): string[] => {
    const titleLower = title.toLowerCase();
    const tags: string[] = [category];
    
    // Adicionar tags específicas baseadas no conteúdo do título
    if (titleLower.includes('config') || titleLower.includes('configuração')) tags.push('configuração');
    if (titleLower.includes('install') || titleLower.includes('instalação')) tags.push('instalação');
    if (titleLower.includes('troubleshoot') || titleLower.includes('problema')) tags.push('troubleshooting');
    if (titleLower.includes('backup')) tags.push('backup');
    if (titleLower.includes('tutorial') || titleLower.includes('guia')) tags.push('tutorial');
    if (titleLower.includes('script') || titleLower.includes('automação')) tags.push('automação');
    if (titleLower.includes('performance') || titleLower.includes('otimização')) tags.push('performance');
    
    // Tags específicas por tecnologia FILTRADAS
    if (titleLower.includes('pfsense')) tags.push('pfSense');
    if (titleLower.includes('mikrotik')) tags.push('MikroTik');
    if (titleLower.includes('sophos')) tags.push('Sophos');
    if (titleLower.includes('fortinet')) tags.push('Fortinet');
    if (titleLower.includes('ubuntu')) tags.push('Ubuntu');
    if (titleLower.includes('debian')) tags.push('Debian');
    if (titleLower.includes('centos')) tags.push('CentOS');
    if (titleLower.includes('iptables')) tags.push('iptables');
    if (titleLower.includes('nginx')) tags.push('Nginx');
    if (titleLower.includes('apache')) tags.push('Apache');
    
    return [...new Set(tags)].slice(0, 4); // Remover duplicatas e limitar a 4 tags
  };

  // Função para calcular estatísticas
  const calculateStats = (notesData: TechnicalNote[]) => {
    const categories = [...new Set(notesData.map(note => note.category || 'geral'))];
    const allTags = notesData.flatMap(note => note.tags || []);
    const uniqueTags = [...new Set(allTags)];
    
    const categoriesWithCount = categories.map(category => ({
      name: category,
      count: notesData.filter(note => (note.category || 'geral') === category).length
    }));

    // Encontrar a data mais recente
    const dates = notesData
      .map(note => note.lastEditedTime || note.date)
      .filter(Boolean)
      .sort()
      .reverse();
    
    const lastUpdate = dates.length > 0 
      ? new Date(dates[0]).toLocaleDateString('pt-BR')
      : 'Não informado';

    return {
      totalNotes: notesData.length,
      totalCategories: categories.length,
      totalTags: uniqueTags.length,
      categories: categoriesWithCount,
      lastUpdate
    };
  };

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Carregando anotações técnicas do Notion (filtradas)...');
        
        // Primeira tentativa: API do Notion
        try {
          const response = await fetch('https://portifolio-api-mu.vercel.app/api/notion');
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Dados do Notion recebidos:', data);
            
            const processedNotes = Array.isArray(data) 
              ? data
                  .map((note: any, idx: number) => {
                    const title = note.title || `Anotação ${idx + 1}`;
                    const category = extractCategoryFromTitle(title);
                    
                    // 🎯 FILTRO: Só retorna se a categoria for permitida
                    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
                      return null;
                    }
                    
                    const description = generateDescription(title, category);
                    const tags = generateTags(title, category);
                    
                    return {
                      id: note.id || `notion-${idx}`,
                      title: title,
                      description: description,
                      tags: tags,
                      date: note.createdTime || new Date().toISOString(),
                      category: category,
                      url: note.url,
                      lastUpdated: note.lastEditedTime,
                      createdTime: note.createdTime,
                      lastEditedTime: note.lastEditedTime
                    };
                  })
                  .filter(Boolean) // Remove os nulls (anotações filtradas)
              : [];
            
            setNotes(processedNotes);
            setStats(calculateStats(processedNotes));
            console.log(`✅ ${processedNotes.length} anotações filtradas carregadas do Notion`);
            return;
          } else {
            console.log(`⚠️ API Notion retornou status ${response.status}`);
          }
        } catch (notionError) {
          console.log('⚠️ Erro ao acessar API do Notion:', notionError);
        }
        
        // Segunda tentativa: API específica
        try {
          const response = await fetch('https://portifolio-api-mu.vercel.app/api/technical-notes');
          
          if (response.ok) {
            const data = await response.json();
            const processedNotes = Array.isArray(data) 
              ? data
                  .map((note: any, idx: number) => {
                    const category = extractCategoryFromTitle(note.title || note.name || '');
                    
                    // 🎯 FILTRO: Só retorna se a categoria for permitida
                    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
                      return null;
                    }
                    
                    return {
                      id: note.id || `note-${idx}`,
                      title: note.title || note.name || 'Anotação sem título',
                      description: note.description || note.texto || 'Sem descrição',
                      tags: note.tags || [],
                      date: note.date || note.createdTime || new Date().toISOString(),
                      category: category,
                      url: note.url
                    };
                  })
                  .filter(Boolean) // Remove os nulls
              : [];
            
            setNotes(processedNotes);
            setStats(calculateStats(processedNotes));
            console.log(`✅ ${processedNotes.length} anotações filtradas carregadas da API específica`);
            return;
          }
        } catch (apiError) {
          console.log('⚠️ API específica não disponível:', apiError);
        }
        
        // Fallback: dados de exemplo FILTRADOS
        const fallbackNotes: TechnicalNote[] = [
          {
            id: '1',
            title: 'Configuração de Firewall pfSense',
            description: 'Configurações de firewall e proteção de sistemas',
            tags: ['segurança', 'pfSense', 'configuração'],
            date: '2024-12-15',
            category: 'segurança'
          },
          {
            id: '2',
            title: 'Configuração MikroTik RouterOS',
            description: 'Configurações de rede MikroTik e equipamentos de conectividade',
            tags: ['redes', 'MikroTik', 'RouterOS'],
            date: '2024-12-10',
            category: 'redes'
          },
          {
            id: '3',
            title: 'Administração Linux Ubuntu Server',
            description: 'Administração de sistemas Linux e servidores',
            tags: ['linux', 'Ubuntu', 'servidor'],
            date: '2024-12-05',
            category: 'linux'
          }
        ];
        
        setNotes(fallbackNotes);
        setStats(calculateStats(fallbackNotes));
        console.log('📁 Usando dados de fallback filtrados');
        
      } catch (err) {
        console.error('❌ Erro geral ao carregar anotações:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar anotações');
        setNotes([]);
        setStats({
          totalNotes: 0,
          totalCategories: 0,
          totalTags: 0,
          categories: [],
          lastUpdate: 'Erro'
        });
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Função para obter ícone da categoria - APENAS CATEGORIAS PERMITIDAS
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'segurança': return Shield;
      case 'redes': return Wifi;
      case 'linux': return Server;
      default: return FileText;
    }
  };

  // Função para obter cores da categoria - APENAS CATEGORIAS PERMITIDAS
  const getCategoryColors = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'segurança':
        return { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900' };
      case 'redes':
        return { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900' };
      case 'linux':
        return { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900' };
      default:
        return { color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-900' };
    }
  };

  return (
    <AppBackground isDarkMode={isDarkMode}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo principal das anotações */}
          <div className="lg:col-span-3">
            {/* Cabeçalho */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                🛡️ Anotações de Infraestrutura
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {loading ? 'Sincronizando com Notion...' : 'Firewall, MikroTik, Linux e Redes - Documentação especializada'}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  <Shield className="w-3 h-3 mr-1" />
                  Firewall & Segurança
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <Wifi className="w-3 h-3 mr-1" />
                  MikroTik & Redes
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Server className="w-3 h-3 mr-1" />
                  Linux & Servidores
                </span>
              </div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar para o Dashboard
              </Link>
            </div>

            {/* Tratamento de erro */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Erro ao carregar anotações do Notion
                    </h3>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 text-sm bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Estatísticas das Anotações */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Anotações de Infraestrutura</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {loading ? '...' : stats.totalNotes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold">🏷️</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tecnologias Cobertas</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {loading ? '...' : stats.totalTags}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">📅</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Última Atualização</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {loading ? '...' : stats.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="space-y-4 pb-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Lista de Anotações FILTRADAS */
              <div className="space-y-4 pb-6">
                {notes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="flex justify-center space-x-2 mb-4">
                      <Shield className="h-8 w-8 text-red-400" />
                      <Wifi className="h-8 w-8 text-blue-400" />
                      <Server className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Nenhuma anotação de infraestrutura encontrada
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {error ? 'Não foi possível carregar as anotações.' : 'Aguarde enquanto sincronizamos com o Notion ou adicione novas anotações sobre Firewall, MikroTik, Linux e Redes.'}
                    </p>
                  </div>
                ) : (
                  notes.map((note, index) => {
                    const Icon = getCategoryIcon(note.category || 'geral');
                    const colors = getCategoryColors(note.category || 'geral');
                    
                    return (
                      <div key={note.id || index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-start space-x-3 mb-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                                <Icon className={`w-5 h-5 ${colors.color}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                  {note.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                  {note.description || 'Documentação de infraestrutura'}
                                </p>
                              </div>
                            </div>
                            
                            {note.tags && note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {note.tags.map((tag: string, tagIndex: number) => (
                                  <span
                                    key={tagIndex}
                                    className={`px-3 py-1 text-xs rounded-full ${colors.bg} ${colors.color} font-medium`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {note.url && (
                              <a
                                href={note.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                              >
                                <Globe className="w-4 h-4 mr-1" />
                                Ver no Notion
                              </a>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(note.lastEditedTime || note.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Categorias FILTRADAS */}
            {!loading && stats.categories.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📊 Distribuição por Área de Infraestrutura
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.categories.map((category) => {
                    const Icon = getCategoryIcon(category.name);
                    const colors = getCategoryColors(category.name);
                    
                    return (
                      <div key={category.name} className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                          <Icon className={`w-5 h-5 ${colors.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {category.name === 'segurança' ? 'Firewall & Segurança' : 
                             category.name === 'redes' ? 'MikroTik & Redes' : 
                             category.name === 'linux' ? 'Linux & Servidores' : category.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {category.count} {category.count === 1 ? 'anotação' : 'anotações'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Barra lateral */}
          <div className="lg:col-span-1 lg:pl-4">
            <div className="sticky top-28 space-y-4">
              {/* Status de Sincronização */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📡 Sincronização Filtrada
                </h3>
                <div className={`p-3 rounded-lg ${loading ? 'bg-yellow-50 dark:bg-yellow-900/20' : error ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : error ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className={`text-sm font-medium ${loading ? 'text-yellow-800 dark:text-yellow-200' : error ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'}`}>
                      {loading ? 'Filtrando...' : error ? 'Erro na sincronização' : 'Filtros Aplicados'}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${loading ? 'text-yellow-600 dark:text-yellow-400' : error ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {loading ? 'Carregando apenas Firewall, MikroTik e Linux...' : error ? 'Usando dados de backup' : 'Apenas infraestrutura essencial'}
                  </p>
                </div>
              </div>

              {/* Tecnologias Cobertas */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🛠️ Tecnologias Cobertas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Firewall</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">pfSense, Sophos, Fortinet</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Redes</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">MikroTik, RouterOS, VLANs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <Server className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Linux</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Ubuntu, Debian, CentOS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links úteis FILTRADOS */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🔗 Documentação Oficial
                </h3>
                <div className="space-y-3">
                  <a href="https://docs.netgate.com/pfsense/" target="_blank" rel="noopener noreferrer"
                     className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-red-600" />
                      pfSense Docs
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Documentação oficial firewall
                    </p>
                  </a>
                  <a href="https://wiki.mikrotik.com/" target="_blank" rel="noopener noreferrer"
                     className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm flex items-center">
                      <Wifi className="w-4 h-4 mr-2 text-blue-600" />
                      MikroTik Wiki
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      RouterOS documentation
                    </p>
                  </a>
                  <a href="https://ubuntu.com/server/docs" target="_blank" rel="noopener noreferrer"
                     className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm flex items-center">
                      <Server className="w-4 h-4 mr-2 text-yellow-600" />
                      Ubuntu Server
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Documentação servidor Linux
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BackToTopButton />
    </AppBackground>
  );
}

export default AllNotes;