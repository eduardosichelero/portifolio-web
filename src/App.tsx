import { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppBackground } from '@/components/layout/AppBackground';
import { Header } from '@/screens/Header';
import { Footer } from '@/screens/Footer';
import { MainGrid } from '@/components/layout/MainGrid';
import { ProfileSection } from '@/components/features/about/ProfileSection';
import { AboutMeCard } from '@/components/features/about/AboutMeCard';
import { StatsOverview } from '@/components/features/goals/StatsOverview';
import { SectionList } from '@/components/features/goals/SectionList';
import { GoalCard, GoalCategory } from '@/components/features/goals/GoalCard';
import { CertificateCard } from '@/components/features/certificates/CertificateCard';
import { UsefulLinks } from '@/components/links/UsefulLinks';
import { SocialLinks } from '@/components/links/SocialLinks';
import { RightColumn } from '@/components/layout/RightColumn';
import { NotionNotes } from '@/components/data/NotionNotes';
import { Modal } from '@/components/common/Modal';
import { ProjectsContent } from '@/components/common/ProjectsModal';
import { PublicationsContent } from '@/components/common/PublicationsModal';
import { useApiGoals, useApiCertificates } from '@/components/data/ActiveInfoProvider';
import type { Goal, Certificate } from '@/components/data/ActiveInfoProvider';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Lazy loading para componentes não críticos
// Mapear exports nomeados para default para uso com React.lazy
const WorkExperienceSection = lazy(() =>
  import('@/components/features/about/WorkExperienceSection').then((m) => ({ default: m.WorkExperienceSection }))
);
const SkillsRadar = lazy(() =>
  import('@/components/features/about/SkillsRadar').then((m) => ({ default: m.SkillsRadar }))
);
const AllCertificates = lazy(() => import('@/screens/AllCertificates'));
const NotFound = lazy(() => import('@/screens/NotFound'));
const AllGoals = lazy(() => import('@/screens/AllGoals'));
const AllNotionNotes = lazy(() => import('@/components/data/AllNotionNotes'));

function App() {
  const [modalState, setModalState] = useState({ type: null, isOpen: false });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { goals: previewGoals, loading: loadingGoals } = useApiGoals();
  const { certificates, loading: loadingCertificates } = useApiCertificates();

  // Adapters para alinhar tipos de itens com os Cards
  const GoalCardAdapter: React.FC<Goal> = ({ title, progress }) => (
    <GoalCard
      title={title}
      // Valores default quando não disponíveis no preview
      deadline={new Date().toISOString()}
      progress={typeof progress === 'number' ? progress : 0}
      category={GoalCategory.Skills}
    />
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
      <div className="relative min-h-screen flex flex-col z-10">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner message="Carregando página..." />}>
            <Routes>
              <Route
                path="/"
                element={
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <ProfileSection />
                    <AboutMeCard />
                    <Suspense fallback={<LoadingSpinner message="Carregando experiência..." />}>
                      <WorkExperienceSection />
                    </Suspense>
                    <StatsOverview />
                    <MainGrid
                      left={
                        <>
                          <SectionList
                            title="Objetivos do momento"
                            items={loadingGoals ? [] : previewGoals}
                            Card={GoalCardAdapter}
                            seeAllTo="/goals"
                            seeAllState={{}}
                          />
                          <SectionList
                            title="Minhas Certificações"
                            items={loadingCertificates ? [] : certificates}
                            Card={CertificateCard}
                            mapItem={(c: Certificate & { date?: string; issuer?: string; progress?: number; externalUrl?: string }) => ({
                              title: c.title,
                              date: c.date || new Date().toLocaleDateString('pt-BR'),
                              issuer: c.issuer || '—',
                              progress: c.progress ?? 0,
                              externalUrl: c.externalUrl,
                            })}
                            seeAllTo="/certificates"
                            seeAllState={{ certificates }}
                          />
                          <NotionNotes />
                        </>
                      }
                      right={
                        <RightColumn>
                          <Suspense fallback={<LoadingSpinner message="Carregando habilidades..." />}>
                            <SkillsRadar />
                          </Suspense>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
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