import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CertificateCard } from '../components/about me/CertificateCard';
import { Header } from './Header';
import { ArrowLeft } from 'lucide-react';
import { AppBackground } from '../components/AppBackground'; // ajuste o caminho conforme seu projeto

export function AllCertificates() {
  const location = useLocation();
  const certificatesFromDashboard = location.state?.certificates || [];

  // Certificações extras com links externos
  const extraCertificates = [
    {
      title: 'AWS Certified Solutions Architect',
      date: '10 de outubro de 2024',
      issuer: 'Amazon',
      progress: 100,
      externalUrl: 'https://www.credly.com/badges/exemplo-aws'
    },
    {
      title: 'Microsoft Azure Fundamentals',
      date: 'em andamento',
      issuer: 'Microsoft',
      progress: 30,
      externalUrl: 'https://learn.microsoft.com/pt-br/certifications/exemplo-azure'
    },
    {
      title: 'Linux Professional Institute LPIC-1',
      date: 'em andamento',
      issuer: 'LPI',
      progress: 50,
      externalUrl: 'https://www.lpi.org/pt-br/our-certifications/exemplo-lpic'
    },
  ];

  const allCertificates = [...certificatesFromDashboard, ...extraCertificates];

  // Detecta tema escuro (ajuste conforme seu contexto de tema)
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Atualiza o estado se o tema mudar em outro local
    const handler = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AppBackground isDarkMode={isDarkMode}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todas as Certificações
        </h2>
        
        {/* Botão de retorno */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Dashboard
          </Link>
        </div>

        {/* Grid de certificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCertificates.map((certificate, index) => (
            <CertificateCard 
              key={index} 
              {...certificate}
            />
          ))}
        </div>
      </main>
    </AppBackground>
  );
}
