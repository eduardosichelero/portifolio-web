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
      sessionStorage.setItem('admin_token', token); // <-- Persistência só até fechar o navegador
      onLogin();
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 min-w-[320px] flex flex-col gap-5">
        <h2 className="text-center text-primary-light dark:text-primary-dark font-bold text-2xl mb-2">Painel Admin</h2>
        <label className="font-medium text-gray-600 dark:text-gray-300">Usuário</label>
        <input 
          placeholder="Digite seu usuário" 
          value={user} 
          onChange={e => setUser(e.target.value)} 
          required 
          className="p-2 rounded-lg border border-border-light dark:border-border-dark text-base bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
        />
        <label className="font-medium text-gray-600 dark:text-gray-300">Senha</label>
        <input 
          type="password" 
          placeholder="Digite sua senha" 
          value={pass} 
          onChange={e => setPass(e.target.value)} 
          required 
          className="p-2 rounded-lg border border-border-light dark:border-border-dark text-base bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
        />
        <button 
          type="submit" 
          className="mt-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg py-3 font-semibold text-lg cursor-pointer shadow transition hover:bg-primary-dark dark:hover:bg-primary-light"
        >Entrar</button>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </form>
    </div>
  );
}