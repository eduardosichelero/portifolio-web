import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo"
      className="fixed bottom-6 right-6 z-50 bg-primary-light dark:bg-primary-dark text-white rounded-full shadow-lg p-3 hover:bg-primary-dark dark:hover:bg-primary-light transition flex items-center justify-center"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  ) : null;
}

export default BackToTopButton;
