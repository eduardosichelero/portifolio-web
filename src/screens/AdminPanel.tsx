import React, { useEffect, useState, FormEvent } from 'react';
import AdminLogin from './AdminLogin';
import { GoalCategory } from '../components/features/goals/GoalCard';

type Goal = { id: string; title: string; deadline: string; progress: number; category: string; };
type Certificate = { id: string; title: string; date: string; issuer: string; progress: number; externalUrl?: string; };

export default function AdminPanel() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('admin_token'));

  const [goalForm, setGoalForm] = useState<Goal>({ id: '', title: '', deadline: '', progress: 0, category: '' });
  const [certForm, setCertForm] = useState<Certificate>({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' });

  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);

  const [certError, setCertError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('https://portifolio-api-mu.vercel.app/api/goals').then(r => r.json()),
      fetch('https://portifolio-api-mu.vercel.app/api/certificates').then(r => r.json())
    ]).then(([goalsData, certsData]) => {
      setGoals(Array.isArray(goalsData) ? goalsData : goalsData.goals || []);
      setCerts(Array.isArray(certsData) ? certsData : certsData.certificates || []);
      setLoading(false);
    });
  }, []);

  const addGoal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = sessionStorage.getItem('admin_token');
    if (editingGoalId) {
      const updatedGoal = { ...goalForm, id: editingGoalId };
      const res = await fetch(`https://portifolio-api-mu.vercel.app/api/goals/${editingGoalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updatedGoal)
      });
      if (res.ok) {
        setGoals(goals.map(g => g.id === editingGoalId ? updatedGoal : g));
        setGoalForm({ id: '', title: '', deadline: '', progress: 0, category: '' });
        setEditingGoalId(null);
      }
    } else {
      const goal = { ...goalForm, id: crypto.randomUUID() };
      const res = await fetch('https://portifolio-api-mu.vercel.app/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(goal)
      });
      if (res.ok) {
        setGoals([...goals, goal]);
        setGoalForm({ id: '', title: '', deadline: '', progress: 0, category: '' });
      }
    }
  };

  const startEditGoal = (goal: Goal) => {
    setGoalForm(goal);
    setEditingGoalId(goal.id);
  };

  const deleteGoal = async (id: string) => {
    const token = sessionStorage.getItem('admin_token');
    await fetch(`https://portifolio-api-mu.vercel.app/api/goals/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setGoals(goals.filter((g: Goal) => g.id !== id));
  };

  const addCert = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCertError('');
    const token = sessionStorage.getItem('admin_token');
    try {
      if (editingCertId) {
        const updatedCert = { ...certForm, id: editingCertId };
        const res = await fetch(`https://portifolio-api-mu.vercel.app/api/certificates/${editingCertId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(updatedCert)
        });
        if (res.ok) {
          const certsData = await fetch('https://portifolio-api-mu.vercel.app/api/certificates').then(r => r.json());
          setCerts(Array.isArray(certsData) ? certsData : certsData.certificates || []);
          setCertForm({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' });
          setEditingCertId(null);
        } else {
          setCertError('Erro ao editar certificado.');
        }
      } else {
        const cert = { ...certForm, id: crypto.randomUUID() };
        const res = await fetch('https://portifolio-api-mu.vercel.app/api/certificates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(cert)
        });
        if (res.ok) {
          const certsData = await fetch('https://portifolio-api-mu.vercel.app/api/certificates').then(r => r.json());
          setCerts(Array.isArray(certsData) ? certsData : certsData.certificates || []);
          setCertForm({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' });
        } else {
          setCertError('Erro ao adicionar certificado.');
        }
      }
    } catch {
      setCertError('Erro de conexão com o servidor.');
    }
  };

  const startEditCert = (cert: Certificate) => {
    setCertForm(cert);
    setEditingCertId(cert.id);
  };

  const deleteCert = async (id: string) => {
    const token = sessionStorage.getItem('admin_token');
    await fetch(`https://portifolio-api-mu.vercel.app/api/certificates/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setCerts(certs.filter((c: Certificate) => c.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.reload();
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="text-primary-light dark:text-primary-dark text-2xl font-semibold">Carregando...</div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-3xl mx-auto my-16 bg-transparent rounded-2xl shadow-lg p-8 flex flex-col gap-12">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-primary-light dark:text-primary-dark font-bold text-3xl m-0">Painel Admin</h2>
          <button className="bg-primary-light dark:bg-primary-dark text-white rounded-lg px-4 py-2 font-semibold shadow transition hover:bg-primary-dark dark:hover:bg-primary-light" onClick={handleLogout}>Sair</button>
        </header>
        {/* Goals */}
        <section>
          <h3 className="text-primary-light dark:text-primary-dark font-semibold text-xl mb-3">Goals</h3>
          <form className="flex flex-wrap gap-6 mb-10" onSubmit={addGoal}>
            <input className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="Título" value={goalForm.title} onChange={e => setGoalForm({ ...goalForm, title: e.target.value })} required aria-label="Título do Goal" />
            <input className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="Deadline" value={goalForm.deadline} onChange={e => setGoalForm({ ...goalForm, deadline: e.target.value })} required aria-label="Deadline do Goal" />
            <select
              className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base"
              value={goalForm.category}
              onChange={e => setGoalForm({ ...goalForm, category: e.target.value })}
              required
              aria-label="Categoria do Goal"
            >
              <option value="" disabled>Selecione a categoria</option>
              {Object.entries(GoalCategory).map(([key, value]) => (
                <option key={key} value={value}>{value}</option>
              ))}
            </select>
            <input type="number" className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="Progresso" value={goalForm.progress} onChange={e => setGoalForm({ ...goalForm, progress: Number(e.target.value) })} min={0} max={100} required aria-label="Progresso do Goal" />
            <button type="submit" className="bg-primary-light dark:bg-primary-dark text-white rounded-lg px-4 py-2 font-semibold transition hover:bg-primary-dark dark:hover:bg-primary-light">{editingGoalId ? 'Salvar Alteração' : 'Adicionar Goal'}</button>
            {editingGoalId && (
              <button type="button" className="bg-gray-200 dark:bg-gray-700 text-primary-light dark:text-primary-dark rounded-lg px-4 py-2 font-semibold" onClick={() => { setEditingGoalId(null); setGoalForm({ id: '', title: '', deadline: '', progress: 0, category: '' }); }}>
                Cancelar
              </button>
            )}
          </form>
          <ul className="space-y-2">
            {goals.map((goal: Goal) => (
              <li key={goal.id} className="bg-background-light dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between gap-2 flex-wrap border border-border-light dark:border-border-dark">
                <div>
                  <span className="font-medium text-text-light dark:text-text-dark">{goal.title}</span>
                  <span className="text-primary-light dark:text-primary-dark font-semibold ml-2">{goal.progress}%</span>
                  <div className="text-xs text-gray-500 mt-1">{goal.category} | {goal.deadline}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteGoal(goal.id)} className="bg-red-600 text-white rounded px-3 py-1 font-medium">Remover</button>
                  <button onClick={() => startEditGoal(goal)} className="bg-primary-light dark:bg-primary-dark text-white rounded px-3 py-1 font-medium">Editar</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* Certificados */}
        <section>
          <h3 className="text-primary-light dark:text-primary-dark font-semibold text-xl mb-3">Certificados</h3>
          <form className="flex flex-wrap gap-6 mb-10" onSubmit={addCert}>
            <input className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="Título" value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} required aria-label="Título do Certificado" />
            <input className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="Data" value={certForm.date} onChange={e => setCertForm({ ...certForm, date: e.target.value })} required aria-label="Data do Certificado" />
            <input className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="Emissor" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} required aria-label="Emissor do Certificado" />
            <input type="number" className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="Progresso" value={certForm.progress} onChange={e => setCertForm({ ...certForm, progress: Number(e.target.value) })} min={0} max={100} required aria-label="Progresso do Certificado" />
            <input className="flex-1 min-w-[120px] p-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base" placeholder="URL externa" value={certForm.externalUrl} onChange={e => setCertForm({ ...certForm, externalUrl: e.target.value })} aria-label="URL externa do Certificado" />
            <button type="submit" className="bg-primary-light dark:bg-primary-dark text-white rounded-lg px-4 py-2 font-semibold transition hover:bg-primary-dark dark:hover:bg-primary-light">{editingCertId ? 'Salvar Alteração' : 'Adicionar Certificado'}</button>
            {editingCertId && (
              <button type="button" className="bg-gray-200 dark:bg-gray-700 text-primary-light dark:text-primary-dark rounded-lg px-4 py-2 font-semibold" onClick={() => { setEditingCertId(null); setCertForm({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' }); }}>
                Cancelar
              </button>
            )}
          </form>
          {certError && <div className="text-red-600 mb-4" role="alert">{certError}</div>}
          <ul className="space-y-2">
            {certs.map((cert: Certificate) => (
              <li key={cert.id} className="bg-background-light dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between gap-2 flex-wrap border border-border-light dark:border-border-dark">
                <div>
                  <span className="font-medium text-text-light dark:text-text-dark">{cert.title}</span>
                  <span className="text-primary-light dark:text-primary-dark font-semibold ml-2">{cert.issuer}</span>
                  <div className="text-xs text-gray-500 mt-1">
                    {cert.date} | {cert.progress}% {cert.externalUrl && (
                      <a href={cert.externalUrl} target="_blank" rel="noopener noreferrer" className="text-primary-light dark:text-primary-dark underline ml-2">Ver</a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteCert(cert.id)} className="bg-red-600 text-white rounded px-3 py-1 font-medium">Remover</button>
                  <button onClick={() => startEditCert(cert)} className="bg-primary-light dark:bg-primary-dark text-white rounded px-3 py-1 font-medium">Editar</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}