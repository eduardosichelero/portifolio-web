import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { ExternalLink, MessageCircle, LucideMessageCircleMore, Github, Linkedin, Instagram } from 'lucide-react';

interface Link {
  title: string;
  url: string;
  icon: React.ReactNode;
}

const links: Link[] = [
  {
    title: "Telegram",
    url: "https://t.me/yourusername",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    title: "WhatsApp",
    url: "https://wa.me/yourphonenumber",
    icon: <LucideMessageCircleMore className="w-5 h-5" />,
  },
  {
    title: "GitHub",
    url: "https://github.com/yourusername",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: <Instagram className="w-5 h-5" />,
  },
];

export function SocialLinks() {
  useEffect(() => {
    ScrollReveal().reveal('.social-links-container', {
      distance: '50px',
      duration: 1300, 
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true, 
    });
  }, []);

  return (
    
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 social-links-container" id="socialLinks">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Redes Sociais</h3>
      <div className="grid gap-4">
        {links.map((link, index) => (
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
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 group-hover:text-indigo-600">
                  {link.title}
                </h4>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-400 group-hover:text-indigo-600" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
