import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BackgroundLines } from '@/components/ui/background-lines';
import { AppBackground } from '@/components/layout/AppBackground';
import { Header } from '@/screens/Header';
import { Footer } from '@/screens/Footer';
import { MainGrid } from '@/components/layout/MainGrid';
import { ProfileSection } from '@/components/features/about/ProfileSection';
import { AboutMeCard } from '@/components/features/about/AboutMeCard';
import { WorkExperienceSection } from '@/components/features/about/WorkExperienceSection';
import { StatsOverview } from '@/components/features/goals/StatsOverview';
import { SectionList } from '@/components/features/goals/SectionList';
import { GoalCard } from '@/components/features/goals/GoalCard';
import { CertificateCard } from '@/components/features/certificates/CertificateCard';
import { SkillsRadar } from '@/components/features/about/SkillsRadar';
import { UsefulLinks } from '@/components/links/UsefulLinks';
import { SocialLinks } from '@/components/links/SocialLinks';
import { RightColumn } from '@/components/layout/RightColumn';
import { NotionNotes } from '@/components/data/NotionNotes';
import { Modal } from '@/components/common/Modal';
import { ProjectsContent } from '@/components/common/ProjectsModal';
import { PublicationsContent } from '@/components/common/PublicationsModal';
import { useApiGoals, useApiCertificates } from '@/components/data/ActiveInfoProvider';
import { BackToTopButton } from '@/components/common/BackToTopButton';

const AllCertificates = lazy(() => import('@/screens/AllCertificates'));
const NotFound = lazy(() => import('@/screens/NotFound'));
const AllGoals = lazy(() => import('@/screens/AllGoals'));
const AllNotionNotes = lazy(() => import('@/components/data/AllNotionNotes'));
const AdminPanel = lazy(() => import('@/screens/AdminPanel'));

function App() {
  const [modalState, setModalState] = useState({ type: null, isOpen: false });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const { goals: previewGoals, loading: loadingGoals } = useApiGoals();
  const { certificates, loading: loadingCertificates } = useApiCertificates();

  const totalGoals = useMemo(() => previewGoals.length, [previewGoals]);
  const completedGoals = useMemo(
    () => previewGoals.filter((goal: { progress: number }) => goal.progress === 100).length,
    [previewGoals]
  );
  const completionRate = useMemo(
    () => totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0,
    [totalGoals, completedGoals]
  );

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

  const closeModal = useCallback(() => setModalState({ type: null, isOpen: false }), []);

  return (
    <AppBackground isDarkMode={isDarkMode}>
      <BackgroundLines className="fixed inset-0 w-full h-full z-0 pointer-events-none" />
      <div className="relative min-h-screen flex flex-col z-10">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<div className="flex items-center justify-center h-40 text-lg text-gray-500">Carregando...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <ProfileSection />
                    <AboutMeCard />
                    <WorkExperienceSection />
                    <StatsOverview 
                      totalGoals={totalGoals}
                      completedGoals={completedGoals}
                      completionRate={completionRate}
                    />
                    <MainGrid
                      left={
                        <>
                          <SectionList
                            title="Objetivos do momento"
                            items={loadingGoals ? [] : previewGoals}
                            Card={GoalCard}
                            seeAllTo="/goals"
                            seeAllState={{}}
                          />
                          <SectionList
                            title="Minhas Certificações"
                            items={loadingCertificates ? [] : certificates}
                            Card={CertificateCard}
                            seeAllTo="/certificates"
                            seeAllState={{ certificates }}
                          />
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
              <Route path="/notes" element={<AllNotionNotes />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {/* Renderiza o Footer apenas se não estiver na rota /admin */}
        {location.pathname !== '/admin' && <Footer />}
      </div>
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'projects'}
        onClose={closeModal}
        title="Projects Portfolio"
      >
        <ProjectsContent />
      </Modal>
      <Modal
        isOpen={modalState.isOpen && modalState.type === 'publications'}
        onClose={closeModal}
        title="Academic Publications"
      >
        <PublicationsContent />
      </Modal>
    </AppBackground>
  );
}

export default App;