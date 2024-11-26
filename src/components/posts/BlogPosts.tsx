import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

const posts: BlogPost[] = [
  {
    title: "Entendendo Ataques de Buffer Overflow",
    date: "15 de março de 2024",
    excerpt: "Uma análise aprofundada sobre exploração de memória e técnicas de prevenção em sistemas modernos.",
    tags: ["Segurança", "Baixo Nível"],
    readTime: "8 min de leitura"
  },
  {
    title: "Implementando OAuth2 com Segurança",
    date: "10 de março de 2024",
    excerpt: "Melhores práticas para implementar autenticação OAuth2 em aplicações web.",
    tags: ["Segurança Web", "Autenticação"],
    readTime: "6 min de leitura"
  },

];

export function BlogPosts() {

  useEffect(() => {
    ScrollReveal().reveal('.blog-posts-container', {
      distance: '50px',
      duration: 1300, 
      easing: 'ease-out',
      origin: 'bottom',
      delay: 200,
      reset: true, 
    });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:text-gray-100 blog-posts-container">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Minhas Anotações recentes</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center">
          Ver todos <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h4 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors dark:text-gray-100 dark:group-hover:text-indigo-400 mb-2">
              {post.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full dark:bg-gray-700 dark:text-gray-200"
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
