import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { usefulLinks } from './usefulLinks.data';
import { ExternalLink } from 'lucide-react';

export function UsefulLinks() {
  useEffect(() => {
    ScrollReveal().reveal('.useful-links-container', {
      distance: '50px',
      duration: 600, 
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true, 
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 useful-links-container">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recursos Úteis</h3>
      <div className="grid gap-4">
  {usefulLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-600 flex items-center justify-center text-indigo-600 dark:text-white">
              {link.icon}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 group-hover:text-indigo-600 flex items-center gap-2">
                  {link.title}
                  {link.isCurrent && (
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 border border-green-300 dark:border-green-600">
                      Atual
                    </span>
                  )}
                </h4>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-400 group-hover:text-indigo-600 ml-2 shrink-0" />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{link.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {link.category.map((cat, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
