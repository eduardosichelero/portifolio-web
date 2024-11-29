import React, { useState, useEffect } from 'react';
import { GoalCard } from './components/cardsModals/GoalCard';
import { SkillsRadar } from './components/cardsModals/SkillsRadar';
import { ProfileSection } from './components/about me/ProfileSection';
import { Modal } from './components/cardsModals/Modal';
import { ProjectsContent } from './components/cardsModals/ProjectsModal';
import { PublicationsContent } from './components/cardsModals/PublicationsModal';
import { BlogPosts } from './components/posts/BlogPosts';
import { UsefulLinks } from './components/links/UsefulLinks';
import { SocialLinks } from './components/links/SocialLinks';
import { AboutMeCard } from './components/about me/AboutMeCard';
import { WorkExperienceSection } from './components/about me/WorkExperienceSection';
import { CertificateCard } from './components/about me/CertificateCard';
import { Footer } from './screens/Footer';
import { Layout, Plus, Trophy, User, Target, CheckCircle2 } from 'lucide-react';
import { Header } from './screens/Header';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalState, setModalState] = useState<{ type: string | null; isOpen: boolean }>({
    type: null,
    isOpen: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const goals = [
    {
      title: 'Learn Advanced React Patterns',
      deadline: 'June 30, 2024',
      progress: 65,
      category: 'Habilidades',
    },
    {
      title: 'Complete AWS Certification',
      deadline: 'August 15, 2024',
      progress: 40,
      category: 'Carreira',
    },
    {
      title: 'Build Portfolio Projects',
      deadline: 'July 1, 2024',
      progress: 80,
      category: 'Pessoal',
    },
  ];

  const certificates = [
    {
      title: 'React Developer Certification',
      date: 'July 15, 2024',
      issuer: 'Udemy',
      progress: 60,
    },
    {
      title: 'AWS Certified Solutions Architect',
      date: 'August 25, 2024',
      issuer: 'Amazon',
      progress: 85,
    },
    {
      title: 'Full Stack Web Development Bootcamp',
      date: 'June 10, 2024',
      issuer: 'freeCodeCamp',
      progress: 100,
    },
    {
      title: 'CISSP Certification',
      date: 'September 20, 2024',
      issuer: 'ISC2',
      progress: 20,
    },
  ];

  return (
    <div
    className="min-h-screen bg-background-light dark:bg-gray-900"
    style={{
      backgroundImage: isDarkMode
        ? 'radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px), radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px)' 
        : 'radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px), radial-gradient(rgba(240, 58, 229, 0.20) 2px, transparent 2px)', 
        backgroundSize: '100px 100px',
        backgroundPosition: '0 0, 50px 50px',
    }}
    
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileSection />
        <AboutMeCard />
        <WorkExperienceSection />

      {/* Stats Overview */}
      <div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Meus Objetivos</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <Target className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Completos</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Como estou indo</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">85%</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Goals Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Objetivos do momento</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">Ver todos</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((goal, index) => (
                  <GoalCard key={index} {...goal} />
                ))}
              </div>
            </div>

            {/* Certificates Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Minhas Certificações</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">Ver todas</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((certificate, index) => (
                  <CertificateCard key={index} {...certificate} />
                ))}
              </div>
            </div>

            {/* Blog Posts Section */}
            <BlogPosts />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <SkillsRadar />
            <UsefulLinks />
            <SocialLinks />
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'projects'}
        onClose={() => setModalState({ type: null, isOpen: false })}
        title="Projects Portfolio"
      >
        <ProjectsContent />
      </Modal>

      <Modal
        isOpen={modalState.isOpen && modalState.type === 'publications'}
        onClose={() => setModalState({ type: null, isOpen: false })}
        title="Academic Publications"
      >
        <PublicationsContent />
      </Modal>
    </div>
  );
}

export default App;
