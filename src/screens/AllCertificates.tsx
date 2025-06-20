import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CertificateCard } from '@/components/features/certificates/CertificateCard';
import { Header } from '@/screens/Header';
import { ArrowLeft } from 'lucide-react';
import { AppBackground } from '@/components/layout/AppBackground';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { BackToTopButton } from '@/components/common/BackToTopButton';
import type { Certificate } from '@/components/data/ActiveInfoProvider';

export function AllCertificates() {
  const navigate = useNavigate();
  const location = useLocation();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    fetch('https://portifolio-api-mu.vercel.app/api/certificates')
      .then(r => r.json())
      .then(data => {
        const certs = Array.isArray(data)
          ? data.map((cert, idx) => ({
              ...cert,
              id: cert.id || `cert-${idx}-${cert.title?.slice(0, 8) || 'noid'}`
            }))
          : [];
        setCertificates(certs);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
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
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Dashboard
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner message="Carregando certificados..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate: Certificate) => (
              <CertificateCard
                key={certificate.id}
                {...certificate}
              />
            ))}
          </div>
        )}
      </main>
      <BackToTopButton />
    </AppBackground>
  );
}

export default AllCertificates;