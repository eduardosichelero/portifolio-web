import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { Header } from './screens/Header';
import { AllGoals } from './screens/AllGoals';
import { AllCertificates } from './screens/AllCertificates';
import { AllBlogPosts } from './screens/AllBlogPosts';
import NotFound from './screens/NotFound';
import { StatsOverview } from './components/StatsOverview';
import { SectionList } from './components/SectionList';
import { RightColumn } from './components/layout/RightColumn';
import { MainGrid } from './components/layout/MainGrid';
import { BlogPostsSection } from './components/posts/BlogPostsSection';

function App() {
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
    {
      title: 'Advent of Cyber 2024',
      deadline: 'Atualmente em curso',
      progress: 68,
      category: 'Pessoal',
    },
  ];

  const certificates = [
    {
      title: 'Google Cybersecurity Professional',
      date: 'em andamento',
      issuer: 'Google',
      progress: 40,
    },
    {
      title: 'One oracle next education T6',
      date: '16 de julho de 2024',
      issuer: 'Oracle',
      progress: 100,
    },
    {
      title: 'Introduction to Generative AI',
      date: '07 de Dezembro de 2023',
      issuer: 'Google',
      progress: 100,
    },
    {
      title: 'Advent of Cyber 2024',
      date: 'em andamento',
      issuer: 'TryHackMe',
      progress: 68,
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
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProfileSection />
              <AboutMeCard />
              <WorkExperienceSection />

              <StatsOverview />

              <MainGrid
                left={
                  <>
                    <SectionList
                      title="Objetivos do momento"
                      items={goals}
                      Card={GoalCard}
                      seeAllTo="/goals"
                      seeAllState={{ goals }}
                    />
                    <SectionList
                      title="Minhas Certificações"
                      items={certificates}
                      Card={CertificateCard}
                      seeAllTo="/certificates"
                      seeAllState={{ certificates }}
                    />
                    <BlogPosts />
                  </>
                }
                right={
                  <RightColumn>
                    <SkillsRadar />
                    <UsefulLinks />
                    <SocialLinks />
                  </RightColumn>
                }
              />
            </main>
          }
        />

        <Route path="/goals" element={<AllGoals />} />
        <Route path="/certificates" element={<AllCertificates />} />
        <Route path="/blog" element={<AllBlogPosts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

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
