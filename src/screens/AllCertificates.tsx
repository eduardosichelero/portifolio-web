import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CertificateCard } from '../components/about me/CertificateCard';
import { Header } from './Header';
import { ArrowLeft } from 'lucide-react';
import { AppBackground } from '../components/AppBackground';

export function AllCertificates() {
  const location = useLocation();
  const navigate = useNavigate();
  const certificatesFromDashboard = location.state?.certificates || [];

  // Certificações completas - adicionei todas as que aparecem na segunda imagem
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
    {
      title: 'Google Cybersecurity Professional',
      date: 'em andamento',
      issuer: 'Google',
      progress: 40,
      externalUrl: 'https://www.coursera.org/professional-certificates/google-cybersecurity'
    },
    {
      title: 'One Oracle Next Education T6',
      date: '16 de julho de 2024',
      issuer: 'Oracle',
      progress: 100,
      externalUrl: 'https://www.oracle.com/br/education/oracle-next-education/'
    },
    {
      title: 'Introduction to Generative AI',
      date: '07 de dezembro de 2023',
      issuer: 'Google',
      progress: 100,
      externalUrl: 'https://cloud.google.com/training/generative-ai'
    },
    {
      title: 'Advent of Cyber 2024',
      date: 'em andamento',
      issuer: 'TryHackMe',
      progress: 68,
      externalUrl: 'https://tryhackme.com/christmas'
    },
  ];

  // Garante que não haverá duplicação de certificados
  const allCertificates = [...certificatesFromDashboard];
  
  // Adiciona apenas certificados extras que não existem no dashboard
  extraCertificates.forEach(extra => {
    if (!allCertificates.some(cert => cert.title === extra.title)) {
      allCertificates.push(extra);
    }
  });

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

  // ESC para voltar para a tela inicial
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

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
