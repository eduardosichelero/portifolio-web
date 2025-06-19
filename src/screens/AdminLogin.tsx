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
    const res = await fetch('https://portifolio-api-mu.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
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
    <form onSubmit={handleLogin} style={{ maxWidth: 320, margin: '80px auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ textAlign: 'center' }}>Login Admin</h2>
      <input placeholder="Usuário" value={user} onChange={e => setUser(e.target.value)} required />
      <input type="password" placeholder="Senha" value={pass} onChange={e => setPass(e.target.value)} required />
      <button type="submit">Entrar</button>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
    </form>
  );
}
