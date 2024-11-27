import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import profileImage from '../../assets/profile.png';

export function AboutMeCard() {
  useEffect(() => {
    ScrollReveal().reveal('.about-me-card', {
      distance: '50px',
      duration: 1300,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 500, 
      reset: true, 
    });
  }, []);

  return (
    <div className="about-me-card bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-11 dark:bg-gray-800 dark:text-gray-100">
      {/* Foto */}
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 dark:bg-gray-600">
        <img
          src={profileImage}
          alt="Sua Foto"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Informações */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Eduardo Sichelero</h2>
        <p className="text-gray-600 mt-2 dark:text-gray-300">
          Sou um estudante de Ciência da Computação com foco em cibersegurança e desenvolvimento de software.
          Apaixonado por explorar novas tecnologias e criar soluções inovadoras.
        </p>
        <p className="text-gray-600 mt-2 dark:text-gray-300">
          Atualmente, estou no 5º semestre da graduação e desenvolvo projetos em áreas como segurança de redes,
          aprendizado de máquina e desenvolvimento frontend.
        </p>
        <a
          href="https://www.linkedin.com/in/eduardo-sichelero" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 font-medium"
        >
          Conecte-se comigo
        </a>

        {/* Interesses */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Interesses:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100">
              Programação
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
              Leitura
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100">
              Vídeos
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">
              Games
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
