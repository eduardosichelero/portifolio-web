import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar } from 'lucide-react';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

const posts: BlogPost[] = [
  {
    title: "Advent of Cyber 2024",
    date: "No momento",
    excerpt: "Acompanhe minha evolução no meu primeiro evento do TryHackMe, com a resolução e pratica dos laboratórios.",
    tags: ["Segurança", "Baixo Nível"],
    readTime: "10 min de leitura"
  },
  {
    title: "Google Cyber Security",
    date: "Atualemente",
    excerpt: "Minhas anotações sobre a formação completa do google com ciee e coursera, atualmente no 2º módulo. ",
    tags: ["Segurança Web", "Formação", 'Python', 'Linux'],
    readTime: "6 min de leitura"
  },
];

export function BlogPosts() {
  useEffect(() => {
    ScrollReveal().reveal('.blog-posts-container', {
      distance: '50px',
      duration: 1000, 
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true, 
    });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:text-gray-100 blog-posts-container">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Minhas Anotações recentes</h3>
      </div>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="flex items-center space-x-2 text-base md:text-lg text-gray-500 dark:text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h4 className="text-xl md:text-2xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors dark:text-gray-100 dark:group-hover:text-indigo-400 mb-2">
              {post.title}
            </h4>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-3">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-sm md:text-base font-medium bg-gray-100 text-gray-600 rounded-full dark:bg-gray-700 dark:text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
