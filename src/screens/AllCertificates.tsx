import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CertificateCard } from '../components/about me/CertificateCard';
import { Header } from './Header';
import { ArrowLeft } from 'lucide-react';

export function AllCertificates() {
  const location = useLocation();
  const certificatesFromDashboard = location.state?.certificates || [];

  // Certificações extras, só aparecem aqui
  const extraCertificates = [
    {
      title: 'AWS Certified Solutions Architect',
      date: '10 de outubro de 2024',
      issuer: 'Amazon',
      progress: 0,
    },
    {
      title: 'Microsoft Azure Fundamentals',
      date: 'em andamento',
      issuer: 'Microsoft',
      progress: 30,
    },
    {
      title: 'Linux Professional Institute LPIC-1',
      date: 'em andamento',
      issuer: 'LPI',
      progress: 50,
    },
  ];

  const allCertificates = [...certificatesFromDashboard, ...extraCertificates];

  return (
    <div className="min-h-screen bg-background-light dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Dashboard
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todas as Certificações
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCertificates.map((certificate, index) => (
            <CertificateCard key={index} {...certificate} />
          ))}
        </div>
      </main>
    </div>
  );
}
