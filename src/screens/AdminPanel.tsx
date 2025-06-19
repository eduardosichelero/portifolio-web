import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import AdminLogin from './AdminLogin';

type Goal = { id: string; title: string; deadline: string; progress: number; category: string; };
type Certificate = { id: string; title: string; date: string; issuer: string; progress: number; externalUrl?: string; };

export default function AdminPanel() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('admin_token'));

  // States para os formulários
  const [goalForm, setGoalForm] = useState<Goal>({ id: '', title: '', deadline: '', progress: 0, category: '' });
  const [certForm, setCertForm] = useState<Certificate>({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' });

  // Novo estado para controlar se está editando e qual goal
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('https://portifolio-api-mu.vercel.app/api/goals').then(r => r.json()),
      fetch('https://portifolio-api-mu.vercel.app/api/certificates').then(r => r.json())
    ]).then(([goalsData, certsData]) => {
      // Corrige caso a resposta venha como { goals: [...] } ou { certificates: [...] }
      setGoals(Array.isArray(goalsData) ? goalsData : goalsData.goals || []);
      setCerts(Array.isArray(certsData) ? certsData : certsData.certificates || []);
      setLoading(false);
    });
  }, []);

  // Adicionar ou Editar Goal
  const addGoal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (editingGoalId) {
      // Editar
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
      // Adicionar
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

  // Função para iniciar edição
  const startEditGoal = (goal: Goal) => {
    setGoalForm(goal);
    setEditingGoalId(goal.id);
  };

  // Remover Goal
  const deleteGoal = async (id: string) => {
    const token = localStorage.getItem('admin_token');
    await fetch(`https://portifolio-api-mu.vercel.app/api/goals/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setGoals(goals.filter((g: Goal) => g.id !== id));
  };

  // Adicionar Certificado
  const addCert = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const cert = { ...certForm, id: crypto.randomUUID() };
    const res = await fetch('https://portifolio-api-eduardosichelero.vercel.app/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(cert)
    });
    if (res.ok) {
      setCerts([...certs, cert]);
      setCertForm({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' });
    }
  };

  // Remover Certificado
  const deleteCert = async (id: string) => {
    const token = localStorage.getItem('admin_token');
    await fetch(`https://portifolio-api-eduardosichelero.vercel.app/api/certificates/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setCerts(certs.filter((c: Certificate) => c.id !== id));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.reload();
  };

  // Adicione esta verificação antes do return principal:
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <button onClick={handleLogout} style={{ float: 'right', margin: 8 }}>Sair</button>
      <h2>Painel Admin</h2>

      <h3>Goals</h3>
      <form onSubmit={addGoal} style={{ marginBottom: 16 }}>
        <input placeholder="Título" value={goalForm.title} onChange={(e: ChangeEvent<HTMLInputElement>) => setGoalForm({ ...goalForm, title: e.target.value })} required />
        <input placeholder="Deadline" value={goalForm.deadline} onChange={(e: ChangeEvent<HTMLInputElement>) => setGoalForm({ ...goalForm, deadline: e.target.value })} required />
        <input placeholder="Categoria" value={goalForm.category} onChange={(e: ChangeEvent<HTMLInputElement>) => setGoalForm({ ...goalForm, category: e.target.value })} required />
        <input type="number" placeholder="Progresso" value={goalForm.progress} onChange={(e: ChangeEvent<HTMLInputElement>) => setGoalForm({ ...goalForm, progress: Number(e.target.value) })} min={0} max={100} required />
        <button type="submit">{editingGoalId ? 'Salvar Alteração' : 'Adicionar Goal'}</button>
        {editingGoalId && (
          <button type="button" onClick={() => { setEditingGoalId(null); setGoalForm({ id: '', title: '', deadline: '', progress: 0, category: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {goals.map((goal: Goal) => (
          <li key={goal.id}>
            {goal.title} - {goal.progress}%
            <button onClick={() => deleteGoal(goal.id)}>Remover</button>
            <button onClick={() => startEditGoal(goal)}>Editar</button>
          </li>
        ))}
      </ul>

      <h3>Certificados</h3>
      <form onSubmit={addCert} style={{ marginBottom: 16 }}>
        <input placeholder="Título" value={certForm.title} onChange={(e: ChangeEvent<HTMLInputElement>) => setCertForm({ ...certForm, title: e.target.value })} required />
        <input placeholder="Data" value={certForm.date} onChange={(e: ChangeEvent<HTMLInputElement>) => setCertForm({ ...certForm, date: e.target.value })} required />
        <input placeholder="Emissor" value={certForm.issuer} onChange={(e: ChangeEvent<HTMLInputElement>) => setCertForm({ ...certForm, issuer: e.target.value })} required />
        <input type="number" placeholder="Progresso" value={certForm.progress} onChange={(e: ChangeEvent<HTMLInputElement>) => setCertForm({ ...certForm, progress: Number(e.target.value) })} min={0} max={100} required />
        <input placeholder="URL externa" value={certForm.externalUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setCertForm({ ...certForm, externalUrl: e.target.value })} />
        <button type="submit">Adicionar Certificado</button>
      </form>
      <ul>
        {certs.map((cert: Certificate) => (
          <li key={cert.id}>
            {cert.title} - {cert.issuer}
            <button onClick={() => deleteCert(cert.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}