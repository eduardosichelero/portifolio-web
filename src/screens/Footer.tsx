import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-indigo-50 text-blue-700 py-6 dark:bg-background-dark dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3 dark:text-text-dark">Sobre</h3>
            <p className="text-sm">
              Olá, sou o{' '}
              <button
                className="font-bold hover:underline focus:outline-none"
                onClick={() => navigate('/')}
                tabIndex={0}
                aria-label="Ir para a Home"
              >
                Eduardo
              </button>
              , estudante de Ciência da Computação. Tenho interesse em segurança cibernética e redes. Acompanhe meus projetos e o que estou aprendendo no meu{' '}
              <strong>Notion</strong>!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3 dark:text-text-dark">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{' '}
                <a
                  href="mailto:contato@devpath.com"
                  className="text-indigo-400 hover:underline dark:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  eduardoddssichelero@gmail.com
                </a>
              </li>
              <li>
                Telefone: <span>(54) 9 99595865</span>
              </li>
              <li>
                LinkedIn:{' '}
                <a
                  href="https://linkedin.com/in/eduardo-sichelero"
                  className="text-indigo-400 hover:underline dark:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/eduardo-sichelero
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3 dark:text-text-dark">Redes Sociais</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://facebook.com/devpath"
                  className="text-indigo-400 hover:underline dark:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/devpath"
                  className="text-indigo-400 hover:underline dark:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/devpath"
                  className="text-indigo-400 hover:underline dark:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-blue-300 pt-4 text-center text-sm dark:border-border-dark">
          <p className="text-blue-700 dark:text-text-dark">
            &copy; {new Date().getFullYear()} Eduardo Sichelero. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
