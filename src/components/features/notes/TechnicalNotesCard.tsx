import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Code, Shield, Server, Network, Database, Wifi, Lock } from 'lucide-react';
import ScrollReveal from 'scrollreveal';
import { technicalNotesData, getRecentNotes } from '@/components/data/technicalNotes';

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
}

export function TechnicalNotesCard() {
  const [notes, setNotes] = useState<TechnicalNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ScrollReveal().reveal('.technical-notes-card', {
      distance: '50px',
      duration: 600,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 300,
      reset: true,
    });
  }, []);

  useEffect(() => {
    const fetchTechnicalNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Primeira tentativa: Buscar do Notion através da API
        try {
          console.log('🔍 Tentando carregar anotações do Notion...');
          const response = await fetch('https://portifolio-api-mu.vercel.app/api/notion');
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Dados recebidos do Notion:', data);
            
            // Processar dados do Notion
            const notionNotes = Array.isArray(data) 
              ? data.map((note: any, idx: number) => {
                  // Extrair categoria do título ou tags
                  const title = note.title || 'Anotação sem título';
                  const category = extractCategoryFromTitle(title) || 'geral';
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
                    lastUpdated: note.lastEditedTime
                  };
                })
              : [];
            
            setNotes(notionNotes);
            console.log(`✅ ${notionNotes.length} anotações técnicas carregadas do Notion`);
            return;
          } else {
            console.log(`⚠️ API Notion retornou status ${response.status}`);
          }
        } catch (notionError) {
          console.log('⚠️ Erro ao acessar API do Notion:', notionError);
        }
        
        // Segunda tentativa: API específica para anotações técnicas (se existir)
        try {
          console.log('🔍 Tentando API específica de anotações técnicas...');
          const response = await fetch('https://portifolio-api-mu.vercel.app/api/technical-notes');
          
          if (response.ok) {
            const data = await response.json();
            
            const processedNotes = Array.isArray(data) 
              ? data.map((note: any, idx: number) => ({
                  id: note.id || `note-${idx}`,
                  title: note.title || note.name || 'Anotação sem título',
                  description: note.description || note.texto || 'Sem descrição',
                  tags: note.tags || [],
                  date: note.date || note.createdTime || new Date().toISOString(),
                  category: note.category || 'geral',
                  url: note.url
                }))
              : [];
            
            setNotes(processedNotes);
            console.log(`✅ ${processedNotes.length} anotações carregadas da API específica`);
            return;
          }
        } catch (apiError) {
          console.log('⚠️ API específica não disponível:', apiError);
        }
        
        // Fallback: usar dados locais
        console.log('📁 Usando dados locais como fallback');
        const localNotes = getRecentNotes(24);
        setNotes(localNotes);
        console.log(`📁 ${localNotes.length} anotações carregadas dos dados locais`);
        
      } catch (err) {
        console.error('❌ Erro geral ao carregar anotações técnicas:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar anotações');
        
        // Último recurso: dados mínimos
        setNotes(technicalNotesData.slice(0, ));
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicalNotes();
  }, []);

  // Função para extrair categoria do título
  const extractCategoryFromTitle = (title: string): string => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('firewall') || titleLower.includes('segurança') || titleLower.includes('security')) {
      return 'segurança';
    }
    if (titleLower.includes('proxmox') || titleLower.includes('vm') || titleLower.includes('virtualização')) {
      return 'virtualização';
    }
    if (titleLower.includes('zabbix') || titleLower.includes('monitoramento') || titleLower.includes('monitoring')) {
      return 'monitoramento';
    }
    if (titleLower.includes('mikrotik') || titleLower.includes('rede') || titleLower.includes('network')) {
      return 'redes';
    }
    if (titleLower.includes('linux') || titleLower.includes('servidor') || titleLower.includes('server')) {
      return 'linux';
    }
    if (titleLower.includes('docker') || titleLower.includes('container')) {
      return 'containers';
    }
    if (titleLower.includes('database') || titleLower.includes('mysql') || titleLower.includes('postgres')) {
      return 'database';
    }
    
    return 'geral';
  };

  // Função para gerar descrição baseada no título e categoria
  const generateDescription = (title: string, category: string): string => {
    const descriptions: { [key: string]: string } = {
      'segurança': 'Configurações de segurança e proteção',
      'virtualização': 'Virtualização e gerenciamento de VMs',
      'monitoramento': 'Monitoramento e observabilidade',
      'redes': 'Configurações de rede e conectividade',
      'linux': 'Administração de sistemas Linux',
      'containers': 'Containerização e orquestração',
      'database': 'Administração de banco de dados',
      'geral': 'Anotação técnica e documentação'
    };
    
    return descriptions[category] || 'Documentação técnica';
  };

  // Função para gerar tags baseadas no título e categoria
  const generateTags = (title: string, category: string): string[] => {
    const titleLower = title.toLowerCase();
    const tags: string[] = [category];
    
    // Adicionar tags específicas baseadas no conteúdo do título
    if (titleLower.includes('config')) tags.push('configuração');
    if (titleLower.includes('install')) tags.push('instalação');
    if (titleLower.includes('troubleshoot')) tags.push('troubleshooting');
    if (titleLower.includes('backup')) tags.push('backup');
    if (titleLower.includes('tutorial')) tags.push('tutorial');
    if (titleLower.includes('script')) tags.push('script');
    if (titleLower.includes('automation')) tags.push('automação');
    
    return tags.slice(0, 3); // Limitar a 3 tags
  };

  // Função para determinar ícone baseado na categoria
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'segurança':
      case 'firewall':
        return Shield;
      case 'virtualização':
      case 'proxmox':
      case 'containers':
        return Server;
      case 'monitoramento':
      case 'zabbix':
        return Network;
      case 'database':
      case 'banco':
        return Database;
      case 'redes':
      case 'mikrotik':
        return Wifi;
      case 'linux':
      case 'servidor':
        return Server;
      default:
        return FileText;
    }
  };

  // Função para determinar cores baseado na categoria
  const getCategoryColors = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'segurança':
      case 'firewall':
        return {
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/20"
        };
      case 'virtualização':
      case 'proxmox':
      case 'containers':
        return {
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-900/20"
        };
      case 'monitoramento':
      case 'zabbix':
        return {
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20"
        };
      case 'redes':
      case 'mikrotik':
        return {
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/20"
        };
      case 'database':
        return {
          color: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-50 dark:bg-orange-900/20"
        };
      case 'linux':
        return {
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
        };
      default:
        return {
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-50 dark:bg-gray-900/20"
        };
    }
  };

  // Pegar apenas as 1 primeiras anotações para preview
  const previewNotes = notes.slice(0, 1);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:text-gray-100 technical-notes-card">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-700 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Anotações Técnicas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {loading ? 'Carregando do Notion...' : 'Documentação e estudos práticos'}
            </p>
          </div>
        </div>
        <Link
          to="/all-notes"
          className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full transition-colors"
        >
          Ver todas <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-500 dark:text-red-400 text-sm mb-2">
            Erro ao carregar anotações do Notion
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {previewNotes.map((note, index) => {
            const Icon = getCategoryIcon(note.category || 'geral');
            const colors = getCategoryColors(note.category || 'geral');
            
            return (
              <div key={note.id || index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors.bgColor}`}>
                  <Icon className={`w-4 h-4 ${colors.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {note.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {note.description}
                  </p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
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
                      className="inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
                    >
                      Ver no Notion <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border-l-4 border-indigo-500">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {loading ? 'Sincronizando com Notion...' : `${notes.length} anotações técnicas disponíveis`}
          </span>
        </div>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
          {loading 
            ? 'Carregando configurações e documentações do Notion...' 
            : 'Sincronizado com Notion • Configurações, troubleshooting e melhores práticas'
          }
        </p>
      </div>
    </div>
  );
}