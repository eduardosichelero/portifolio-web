import React, { useEffect, useState } from 'react';

// Definir tipos atualizados para corresponder à estrutura da API
export interface Goal {
  id: string;
  title: string;
  progress: number;
}

export interface Certificate {
  id: string;
  name: string;        // Campo principal da API
  title?: string;      // Para compatibilidade com componentes existentes
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
  progress: number;
}

export const useApiGoals = (options?: { all?: boolean }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://portifolio-api-mu.vercel.app/api/goals')
      .then(r => r.json())
      .then(data => {
        setGoals(Array.isArray(data)
          ? (options?.all ? data : data.slice(0, 4))
          : []);
        setLoading(false);
      })
      .catch(() => {
        setGoals([]);
        setLoading(false);
      });
  }, [options?.all]);

  return { goals, loading };
};

export const useApiCertificates = (options?: { all?: boolean }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://portifolio-api-mu.vercel.app/api/certificates')
      .then(r => r.json())
      .then(data => {
        const processedCertificates = Array.isArray(data)
          ? data.map((cert, idx) => ({
              id: cert.id || `cert-${idx}-${cert.name?.slice(0, 8) || 'noid'}`,
              name: cert.name || 'Certificado sem nome',
              title: cert.name || cert.title || 'Certificado sem nome', // ← MAPEAMENTO PARA TÍTULO
              issuer: cert.issuer || 'Não informado',
              date: cert.date || 'Não informado',
              credentialUrl: cert.credentialUrl || '',
              imageUrl: cert.imageUrl || '',
              progress: Math.min(Math.max(cert.progress || 0, 0), 100)
            }))
          : [];
        
        setCertificates(options?.all ? processedCertificates : processedCertificates.slice(0, 4));
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar certificados:', error);
        setCertificates([]);
        setLoading(false);
      });
  }, [options?.all]);

  return { certificates, loading };
};