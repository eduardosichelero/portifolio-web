import React, { useEffect, useState } from 'react';

// Definir tipos para os dados de objetivos e certificados
export interface Goal {
  id: string;
  title: string;
  progress: number;
}

export interface Certificate {
  id: string;
  title: string;
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
        setCertificates(Array.isArray(data)
          ? (options?.all ? data : data.slice(0, 4))
          : []);
        setLoading(false);
      })
      .catch(() => {
        setCertificates([]);
        setLoading(false);
      });
  }, [options?.all]);

  return { certificates, loading };
};
