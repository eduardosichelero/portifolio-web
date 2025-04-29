import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Header } from './Header';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

// Posts recebidos do dashboard
const defaultPosts: BlogPost[] = [
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
    excerpt: "Minhas anotações sobre a formação completa do google com ciee e coursera, atualmente no 2º módulo.",
    tags: ["Segurança Web", "Formação", 'Python', 'Linux'],
    readTime: "6 min de leitura"
  },
];

// Posts exclusivos desta tela
const extraPosts: BlogPost[] = [
  {
    title: "Como comecei em Cibersegurança",
    date: "Abril 2024",
    excerpt: "Relato de como iniciei meus estudos em cibersegurança e as principais fontes de aprendizado.",
    tags: ["Carreira", "Cibersegurança"],
    readTime: "8 min de leitura"
  },
  {
    title: "Primeiros passos com React",
    date: "Março 2024",
    excerpt: "Dicas e aprendizados ao construir meus primeiros projetos em React.",
    tags: ["React", "Frontend"],
    readTime: "7 min de leitura"
  }
];

export function AllBlogPosts() {
  const location = useLocation();
  const postsFromDashboard = location.state?.posts || defaultPosts;
  const allPosts = [...postsFromDashboard, ...extraPosts];

  useEffect(() => {
    // Opcional: ScrollReveal ou outra animação
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Dashboard
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todos os Posts do Blog
        </h2>
        <div className="space-y-6">
          {allPosts.map((post, index) => (
            <div key={index} className="group cursor-pointer bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:text-gray-100">
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
      </main>
    </div>
  );
}
