import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar, Award, Clock, ExternalLink } from 'lucide-react';

interface CertificateProps {
  title: string;
  date: string;
  issuer: string;
  progress: number;
  externalUrl?: string; // Novo campo para o link externo
}

export function CertificateCard({ title, date, issuer, progress, externalUrl }: CertificateProps) {
  useEffect(() => {
    ScrollReveal().reveal('.certificate-card', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 300,
      reset: true, 
    });
  }, []);

  return (
    <div className="certificate-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-gray-100 dark:hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900">
          Certificado
        </span>
        <Award className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Emitido em: {date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-2">Emissor: {issuer}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span>Progresso</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: progress >= 100 ? '#2E7D32' : '#1976D2'
              }}
            ></div>
          </div>
        </div>
        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 text-sm font-medium"
          >
            Visualizar Certificação
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
}
