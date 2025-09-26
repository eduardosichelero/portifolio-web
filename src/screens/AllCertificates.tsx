import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CertificateCard } from '@/components/features/certificates/CertificateCard';
import { Header } from '@/screens/Header';
import { ArrowLeft, Filter, Award, Clock, PlayCircle } from 'lucide-react';
import { AppBackground } from '@/components/layout/AppBackground';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { BackToTopButton } from '@/components/common/BackToTopButton';

// Tipo atualizado para corresponder à estrutura da API
type Certificate = {
  id: string;
  name: string;        // Atualizado de 'title' para 'name'
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
  progress: number;    // Novo campo (0-100)
};

type FilterType = 'all' | 'completed' | 'inProgress' | 'notStarted';

export function AllCertificates() {
  const navigate = useNavigate();
  const location = useLocation();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Função para categorizar certificados por progresso
  const getCertificatesByStatus = (certificates: Certificate[]) => {
    const completed = certificates.filter(cert => cert.progress === 100);
    const inProgress = certificates.filter(cert => cert.progress > 0 && cert.progress < 100);
    const notStarted = certificates.filter(cert => cert.progress === 0);
    
    return { completed, inProgress, notStarted };
  };

  // Função para filtrar certificados baseado no filtro ativo
  const getFilteredCertificates = () => {
    switch (filter) {
      case 'completed': 
        return certificates.filter(cert => cert.progress === 100);
      case 'inProgress': 
        return certificates.filter(cert => cert.progress > 0 && cert.progress < 100);
      case 'notStarted': 
        return certificates.filter(cert => cert.progress === 0);
      default: 
        return certificates;
    }
  };

  // Carregar certificados da API
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://portifolio-api-mu.vercel.app/api/certificates');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        const certs = Array.isArray(data)
          ? data.map((cert, idx) => ({
              id: cert.id || `cert-${idx}-${cert.name?.slice(0, 8) || 'noid'}`,
              name: cert.name || cert.title || 'Certificado sem nome', // Fallback para 'title'
              issuer: cert.issuer || 'Não informado',
              date: cert.date || 'Não informado',
              credentialUrl: cert.credentialUrl || '',
              imageUrl: cert.imageUrl || '',
              progress: Math.min(Math.max(cert.progress || 0, 0), 100) // Garantir 0-100
            }))
          : [];
        
        setCertificates(certs);
      } catch (err) {
        console.error('Erro ao carregar certificados:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar certificados. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Listener para mudanças de tema
  useEffect(() => {
    const handler = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Listener para tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  const { completed, inProgress, notStarted } = getCertificatesByStatus(certificates);
  const filteredCertificates = getFilteredCertificates();

  // Botões de filtro
  const filterButtons = [
    { key: 'all', label: 'Todos', count: certificates.length, icon: Filter },
    { key: 'completed', label: 'Concluídos', count: completed.length, icon: Award },
    { key: 'inProgress', label: 'Em Progresso', count: inProgress.length, icon: Clock },
    { key: 'notStarted', label: 'Não Iniciados', count: notStarted.length, icon: PlayCircle },
  ] as const;

  return (
    <AppBackground isDarkMode={isDarkMode}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todas as Certificações
          </h2>
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
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Erro ao carregar certificados
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

        {/* Loading */}
        {loading && (
          <LoadingSpinner message="Carregando certificados..." />
        )}

        {/* Conteúdo principal */}
        {!loading && !error && (
          <>
            {/* Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídos</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completed.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Em Progresso</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgress.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PlayCircle className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Não Iniciados</p>
                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{notStarted.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Filter className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{certificates.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {filterButtons.map(({ key, label, count, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      filter === key
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      filter === key
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de certificados */}
            {filteredCertificates.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Nenhum certificado encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {filter === 'all' 
                    ? 'Não há certificados cadastrados ainda.'
                    : `Não há certificados ${filter === 'completed' ? 'concluídos' : filter === 'inProgress' ? 'em progresso' : 'não iniciados'}.`
                  }
                </p>
                {filter !== 'all' && (
                  <button
                    onClick={() => setFilter('all')}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Ver todos os certificados
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Contador de resultados */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mostrando <span className="font-semibold">{filteredCertificates.length}</span> de{' '}
                    <span className="font-semibold">{certificates.length}</span> certificados
                    {filter !== 'all' && (
                      <span className="ml-2">
                        ({filter === 'completed' ? 'concluídos' : filter === 'inProgress' ? 'em progresso' : 'não iniciados'})
                      </span>
                    )}
                  </p>
                </div>
              {/* Grid de certificados */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((certificate: Certificate) => (
                  <CertificateCard
                    key={certificate.id}
                    id={certificate.id}
                    title={certificate.name}        
                    name={certificate.name}         
                    issuer={certificate.issuer}
                    date={certificate.date}
                    credentialUrl={certificate.credentialUrl}
                    imageUrl={certificate.imageUrl}
                    progress={certificate.progress}
                  />
                ))}
              </div>
              </>
            )}
          </>
        )}
      </main>
      <BackToTopButton />
    </AppBackground>
  );
}

export default AllCertificates;