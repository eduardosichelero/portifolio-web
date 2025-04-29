import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl md:text-8xl font-extrabold text-indigo-500 mb-4 animate-bounce">404</div>
      <h1 className="text-2xl md:text-4xl font-bold mb-2">Oops! Você se perdeu no universo do portfólio 🚀</h1>
      <p className="mb-6 text-lg md:text-xl text-gray-600 dark:text-gray-300">
        Parece que essa página não existe ou foi abduzida por ETs! <br />
        Mas não se preocupe, você pode voltar para a base.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
