import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CertificateCard } from '@/components/features/certificates/CertificateCard';
import { Header } from '@/screens/Header';
import { ArrowLeft } from 'lucide-react';
import { AppBackground } from '@/components/layout/AppBackground';

export function AllCertificates() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    fetch('https://portifolio-api-mu.vercel.app/api/certificates')
      .then(r => r.json())
      .then(data => {
        setCertificates(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setCertificates([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
          <div className="text-center text-gray-500">Carregando certificados...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <CertificateCard 
                key={index} 
                {...certificate}
              />
            ))}
          </div>
        )}
      </main>
    </AppBackground>
  );
}

export default AllCertificates;
