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

  // Estados para edição
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);

  // Erros
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

  // Função para iniciar edição de Goal
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

  // Adicionar ou Editar Certificado
  const addCert = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCertError('');
    const token = localStorage.getItem('admin_token');
    try {
      if (editingCertId) {
        // Editar
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
        // Adicionar
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

  // Função para iniciar edição de Certificado
  const startEditCert = (cert: Certificate) => {
    setCertForm(cert);
    setEditingCertId(cert.id);
  };

  // Remover Certificado
  const deleteCert = async (id: string) => {
    const token = localStorage.getItem('admin_token');
    await fetch(`https://portifolio-api-mu.vercel.app/api/certificates/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    setCerts(certs.filter((c: Certificate) => c.id !== id));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.reload();
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)',
      color: '#3730a3',
      fontSize: 24,
      fontWeight: 600
    }}>Carregando...</div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)',
      padding: 0,
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 800,
        margin: '40px auto',
        background: 'white',
        borderRadius: 18,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
        padding: 36,
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ color: '#3730a3', fontWeight: 700, fontSize: 32, margin: 0 }}>Painel Admin</h2>
          <button onClick={handleLogout} style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)'
          }}>Sair</button>
        </div>

        {/* Goals */}
        <section>
          <h3 style={{ color: '#6366f1', fontWeight: 600, fontSize: 22, marginBottom: 12 }}>Goals</h3>
          <form onSubmit={addGoal} style={{
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <input placeholder="Título" value={goalForm.title} onChange={e => setGoalForm({ ...goalForm, title: e.target.value })} required style={inputStyle} />
            <input placeholder="Deadline" value={goalForm.deadline} onChange={e => setGoalForm({ ...goalForm, deadline: e.target.value })} required style={inputStyle} />
            <input placeholder="Categoria" value={goalForm.category} onChange={e => setGoalForm({ ...goalForm, category: e.target.value })} required style={inputStyle} />
            <input type="number" placeholder="Progresso" value={goalForm.progress} onChange={e => setGoalForm({ ...goalForm, progress: Number(e.target.value) })} min={0} max={100} required style={{ ...inputStyle, width: 100 }} />
            <button type="submit" style={buttonStyle}>{editingGoalId ? 'Salvar Alteração' : 'Adicionar Goal'}</button>
            {editingGoalId && (
              <button type="button" onClick={() => { setEditingGoalId(null); setGoalForm({ id: '', title: '', deadline: '', progress: 0, category: '' }); }} style={cancelButtonStyle}>
                Cancelar
              </button>
            )}
          </form>
          <ul style={{ marginBottom: 32, padding: 0, listStyle: 'none' }}>
            {goals.map((goal: Goal) => (
              <li key={goal.id} style={listItemStyle}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 500 }}>{goal.title}</span>
                  <span style={{ color: '#818cf8', fontWeight: 600, marginLeft: 8 }}>{goal.progress}%</span>
                  <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                    {goal.category} | {goal.deadline}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => deleteGoal(goal.id)} style={removeButtonStyle}>Remover</button>
                  <button onClick={() => startEditGoal(goal)} style={editButtonStyle}>Editar</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Certificados */}
        <section>
          <h3 style={{ color: '#6366f1', fontWeight: 600, fontSize: 22, marginBottom: 12 }}>Certificados</h3>
          <form onSubmit={addCert} style={{
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <input placeholder="Título" value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} required style={inputStyle} />
            <input placeholder="Data" value={certForm.date} onChange={e => setCertForm({ ...certForm, date: e.target.value })} required style={inputStyle} />
            <input placeholder="Emissor" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} required style={inputStyle} />
            <input type="number" placeholder="Progresso" value={certForm.progress} onChange={e => setCertForm({ ...certForm, progress: Number(e.target.value) })} min={0} max={100} required style={{ ...inputStyle, width: 100 }} />
            <input placeholder="URL externa" value={certForm.externalUrl} onChange={e => setCertForm({ ...certForm, externalUrl: e.target.value })} style={{ ...inputStyle, flex: 2 }} />
            <button type="submit" style={buttonStyle}>{editingCertId ? 'Salvar Alteração' : 'Adicionar Certificado'}</button>
            {editingCertId && (
              <button type="button" onClick={() => { setEditingCertId(null); setCertForm({ id: '', title: '', date: '', issuer: '', progress: 0, externalUrl: '' }); }} style={cancelButtonStyle}>
                Cancelar
              </button>
            )}
          </form>
          {certError && <div style={{ color: '#dc2626', marginBottom: 16 }}>{certError}</div>}
          <ul style={{ marginBottom: 0, padding: 0, listStyle: 'none' }}>
            {certs.map((cert: Certificate) => (
              <li key={cert.id} style={listItemStyle}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 500 }}>{cert.title}</span>
                  <span style={{ color: '#818cf8', fontWeight: 600, marginLeft: 8 }}>{cert.issuer}</span>
                  <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                    {cert.date} | {cert.progress}% {cert.externalUrl && (
                      <a href={cert.externalUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', marginLeft: 8, textDecoration: 'underline' }}>Ver</a>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => deleteCert(cert.id)} style={removeButtonStyle}>Remover</button>
                  <button onClick={() => startEditCert(cert)} style={editButtonStyle}>Editar</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      {/* Responsividade simples */}
      <style>
        {`
        @media (max-width: 600px) {
          .admin-panel-card {
            padding: 12px !important;
          }
          .admin-panel-form {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
        `}
      </style>
    </div>
  );
}

// Estilos reutilizáveis
const inputStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 120,
  padding: 8,
  borderRadius: 8,
  border: '1px solid #d1d5db',
  fontSize: 15,
  background: '#f9fafb'
};

const buttonStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '10px 18px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer'
};

const cancelButtonStyle: React.CSSProperties = {
  background: '#e0e7ff',
  color: '#3730a3',
  border: 'none',
  borderRadius: 8,
  padding: '10px 18px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer'
};

const removeButtonStyle: React.CSSProperties = {
  background: '#dc2626',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  padding: '6px 12px',
  fontWeight: 500,
  marginRight: 0,
  cursor: 'pointer'
};

const editButtonStyle: React.CSSProperties = {
  background: '#6366f1',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  padding: '6px 12px',
  fontWeight: 500,
  cursor: 'pointer'
};

const listItemStyle: React.CSSProperties = {
  background: '#f3f4f6',
  borderRadius: 10,
  marginBottom: 10,
  padding: '12px 18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8
};