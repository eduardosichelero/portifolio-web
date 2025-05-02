import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoalCard } from './components/cardsModals/GoalCard';
import { SkillsRadar } from './components/cardsModals/SkillsRadar';
import { ProfileSection } from './components/about me/ProfileSection';
import { Modal } from './components/cardsModals/Modal';
import { ProjectsContent } from './components/cardsModals/ProjectsModal';
import { PublicationsContent } from './components/cardsModals/PublicationsModal';
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
import { StatsOverview } from './components/useful/StatsOverview';
import { SectionList } from './components/useful/SectionList';
import { RightColumn } from './components/layout/RightColumn';
import { MainGrid } from './components/layout/MainGrid';
import { BlogPosts } from './components/posts/BlogPosts';
import { goals, certificates } from './components/data/ActiveInfoProvider';
import { NotionNotes } from './components/data/NotionNotes';
import { AllNotionNotes } from './components/data/AllNotionNotes';
import { AppBackground } from './components/AppBackground';

function App() {
  const [modalState, setModalState] = useState({ type: null, isOpen: false });
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

  return (
    <AppBackground isDarkMode={isDarkMode}>
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
                    {/* BlogPosts /> COMENTÁRIO JSX */}
                    <NotionNotes />
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
        <Route path="/notes" element={<AllNotionNotes />} />
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
    </AppBackground>
  );
}

export default App;
