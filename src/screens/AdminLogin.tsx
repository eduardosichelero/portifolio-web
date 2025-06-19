import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: LoginProps) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
const res = await fetch('https://portifolio-api-mu.vercel.app/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ usuario: user, senha: pass })
});
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('admin_token', token);
      onLogin();
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)' }}>
      <form onSubmit={handleLogin} style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)', padding: 32, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h2 style={{ textAlign: 'center', color: '#3730a3', fontWeight: 700, fontSize: 28, marginBottom: 12 }}>Painel Admin</h2>
        <label style={{ fontWeight: 500, color: '#4b5563' }}>Usuário</label>
        <input 
          placeholder="Digite seu usuário" 
          value={user} 
          onChange={e => setUser(e.target.value)} 
          required 
          style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16 }}
        />
        <label style={{ fontWeight: 500, color: '#4b5563' }}>Senha</label>
        <input 
          type="password" 
          placeholder="Digite sua senha" 
          value={pass} 
          onChange={e => setPass(e.target.value)} 
          required 
          style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16 }}
        />
        <button 
          type="submit" 
          style={{
            marginTop: 10,
            background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)'
          }}
        >Entrar</button>
        {error && <div style={{ color: '#dc2626', textAlign: 'center', marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
