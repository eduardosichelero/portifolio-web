import React, { useEffect, useState } from 'react';

type Goal = { id: string; title: string; deadline: string; progress: number; category: string; };
type Certificate = { id: string; title: string; date: string; issuer: string; progress: number; externalUrl?: string; };

export default function AdminPanel() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  // States para os formulários
  const [goalForm, setGoalForm] = useState<Goal>({ id: '', title: '', deadline: '', progress: 0, category: '' });
  const [certForm, setCertForm] = useState<Certificate>({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' });

  useEffect(() => {
    Promise.all([
      fetch('https://portifolio-api-eduardosichelero.vercel.app/api/goals').then(r => r.json()),
      fetch('https://portifolio-api-eduardosichelero.vercel.app/api/certificates').then(r => r.json())
    ]).then(([goals, certs]) => {
      setGoals(goals);
      setCerts(certs);
      setLoading(false);
    });
  }, []);

  // Adicionar Goal
  const addGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const goal = { ...goalForm, id: crypto.randomUUID() };
    const res = await fetch('https://portifolio-api-eduardosichelero.vercel.app/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    });
    if (res.ok) {
      setGoals([...goals, goal]);
      setGoalForm({ id: '', title: '', deadline: '', progress: 0, category: '' });
    }
  };

  // Remover Goal
  const deleteGoal = async (id: string) => {
    await fetch(`https://portifolio-api-eduardosichelero.vercel.app/api/goals/${id}`, { method: 'DELETE' });
    setGoals(goals.filter(g => g.id !== id));
  };

  // Adicionar Certificado
  const addCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const cert = { ...certForm, id: crypto.randomUUID() };
    const res = await fetch('https://portifolio-api-eduardosichelero.vercel.app/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cert)
    });
    if (res.ok) {
      setCerts([...certs, cert]);
      setCertForm({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' });
    }
  };

  // Remover Certificado
  const deleteCert = async (id: string) => {
    await fetch(`https://portifolio-api-eduardosichelero.vercel.app/api/certificates/${id}`, { method: 'DELETE' });
    setCerts(certs.filter(c => c.id !== id));
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Painel Admin</h2>

      <h3>Goals</h3>
      <form onSubmit={addGoal} style={{ marginBottom: 16 }}>
        <input placeholder="Título" value={goalForm.title} onChange={e => setGoalForm({ ...goalForm, title: e.target.value })} required />
        <input placeholder="Deadline" value={goalForm.deadline} onChange={e => setGoalForm({ ...goalForm, deadline: e.target.value })} required />
        <input placeholder="Categoria" value={goalForm.category} onChange={e => setGoalForm({ ...goalForm, category: e.target.value })} required />
        <input type="number" placeholder="Progresso" value={goalForm.progress} onChange={e => setGoalForm({ ...goalForm, progress: Number(e.target.value) })} min={0} max={100} required />
        <button type="submit">Adicionar Goal</button>
      </form>
      <ul>
        {goals.map(goal => (
          <li key={goal.id}>
            {goal.title} - {goal.progress}%
            <button onClick={() => deleteGoal(goal.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <h3>Certificados</h3>
      <form onSubmit={addCert} style={{ marginBottom: 16 }}>
        <input placeholder="Título" value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} required />
        <input placeholder="Data" value={certForm.date} onChange={e => setCertForm({ ...certForm, date: e.target.value })} required />
        <input placeholder="Emissor" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} required />
        <input type="number" placeholder="Progresso" value={certForm.progress} onChange={e => setCertForm({ ...certForm, progress: Number(e.target.value) })} min={0} max={100} required />
        <input placeholder="URL externa" value={certForm.externalUrl} onChange={e => setCertForm({ ...certForm, externalUrl: e.target.value })} />
        <button type="submit">Adicionar Certificado</button>
      </form>
      <ul>
        {certs.map(cert => (
          <li key={cert.id}>
            {cert.title} - {cert.issuer}
            <button onClick={() => deleteCert(cert.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}