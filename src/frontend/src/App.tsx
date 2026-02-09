import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { useEvangelismScrollToTop } from './hooks/useEvangelismScrollToTop';
import OnboardingPage from './pages/OnboardingPage';
import DailyFeedPage from './pages/DailyFeedPage';
import SubmitTestimonyPage from './pages/SubmitTestimonyPage';
import ScriptureDetailPage from './pages/ScriptureDetailPage';
import DiscernmentDetailPage from './pages/DiscernmentDetailPage';
import PeaceWithGodPage from './pages/PeaceWithGodPage';
import WhyJesusPage from './pages/WhyJesusPage';
import HowToBeginPage from './pages/HowToBeginPage';
import AssuranceNextStepsPage from './pages/AssuranceNextStepsPage';
import ConnectPage from './pages/ConnectPage';
import TopicsQuestionsIndexPage from './pages/TopicsQuestionsIndexPage';
import WhoIsGodPage from './pages/evangelism/topics-questions/topics/WhoIsGodPage';
import WhatIsSinPage from './pages/evangelism/topics-questions/topics/WhatIsSinPage';
import WhyDidJesusDiePage from './pages/evangelism/topics-questions/topics/WhyDidJesusDiePage';
import WhatIsFaithPage from './pages/evangelism/topics-questions/topics/WhatIsFaithPage';
import WhatIsRepentancePage from './pages/evangelism/topics-questions/topics/WhatIsRepentancePage';
import WhatIsTheGospelPage from './pages/evangelism/topics-questions/topics/WhatIsTheGospelPage';
import WhatIsSalvationPage from './pages/evangelism/topics-questions/topics/WhatIsSalvationPage';
import WhatIsTheChurchPage from './pages/evangelism/topics-questions/topics/WhatIsTheChurchPage';
import WhatIsBaptismPage from './pages/evangelism/topics-questions/topics/WhatIsBaptismPage';
import WhatIsPrayerPage from './pages/evangelism/topics-questions/topics/WhatIsPrayerPage';
import HowToReadTheBiblePage from './pages/evangelism/topics-questions/topics/HowToReadTheBiblePage';
import WhatHappensAfterDeathPage from './pages/evangelism/topics-questions/topics/WhatHappensAfterDeathPage';
import HowToShareYourFaithPage from './pages/evangelism/topics-questions/topics/HowToShareYourFaithPage';
import PeaceWithGodStepsIntroPage from './pages/PeaceWithGodStepsIntroPage';
import PeaceWithGodStepsLongPage from './pages/PeaceWithGodStepsLongPage';
import FaithResourcesPage from './pages/FaithResourcesPage';
import AuthGate from './components/AuthGate';
import AppLayout from './components/layout/AppLayout';
import { Loader2 } from 'lucide-react';

const queryClient = new QueryClient();

function RootLayout() {
  useEvangelismScrollToTop();
  
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  component: OnboardingPage,
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/feed',
  component: DailyFeedPage,
});

const submitTestimonyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-testimony',
  component: SubmitTestimonyPage,
});

const scriptureDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/scripture/$index',
  component: ScriptureDetailPage,
});

const discernmentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/discernment/$index',
  component: DiscernmentDetailPage,
});

const peaceWithGodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/peace-with-god',
  component: PeaceWithGodPage,
});

const whyJesusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/why-jesus',
  component: WhyJesusPage,
});

const howToBeginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-to-begin',
  component: HowToBeginPage,
});

const assuranceNextStepsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assurance-next-steps',
  component: AssuranceNextStepsPage,
});

const connectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/connect',
  component: ConnectPage,
});

const topicsQuestionsIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions',
  component: TopicsQuestionsIndexPage,
});

const faithResourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faith-resources',
  component: FaithResourcesPage,
});

const whoIsGodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/who-is-god',
  component: WhoIsGodPage,
});

const whatIsSinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-sin',
  component: WhatIsSinPage,
});

const whyDidJesusDieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/why-did-jesus-die',
  component: WhyDidJesusDiePage,
});

const whatIsFaithRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-faith',
  component: WhatIsFaithPage,
});

const whatIsRepentanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-repentance',
  component: WhatIsRepentancePage,
});

const whatIsTheGospelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-the-gospel',
  component: WhatIsTheGospelPage,
});

const whatIsSalvationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-salvation',
  component: WhatIsSalvationPage,
});

const whatIsTheChurchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-the-church',
  component: WhatIsTheChurchPage,
});

const whatIsBaptismRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-baptism',
  component: WhatIsBaptismPage,
});

const whatIsPrayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-is-prayer',
  component: WhatIsPrayerPage,
});

const howToReadTheBibleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/how-to-read-the-bible',
  component: HowToReadTheBiblePage,
});

const whatHappensAfterDeathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/what-happens-after-death',
  component: WhatHappensAfterDeathPage,
});

const howToShareYourFaithRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/topics-questions/how-to-share-your-faith',
  component: HowToShareYourFaithPage,
});

const peaceWithGodStepsIntroRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/peace-with-god-steps-intro',
  component: PeaceWithGodStepsIntroPage,
});

const peaceWithGodStepsLongRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/peace-with-god-steps',
  component: PeaceWithGodStepsLongPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  feedRoute,
  submitTestimonyRoute,
  scriptureDetailRoute,
  discernmentDetailRoute,
  peaceWithGodRoute,
  whyJesusRoute,
  howToBeginRoute,
  assuranceNextStepsRoute,
  connectRoute,
  topicsQuestionsIndexRoute,
  faithResourcesRoute,
  whoIsGodRoute,
  whatIsSinRoute,
  whyDidJesusDieRoute,
  whatIsFaithRoute,
  whatIsRepentanceRoute,
  whatIsTheGospelRoute,
  whatIsSalvationRoute,
  whatIsTheChurchRoute,
  whatIsBaptismRoute,
  whatIsPrayerRoute,
  howToReadTheBibleRoute,
  whatHappensAfterDeathRoute,
  howToShareYourFaithRoute,
  peaceWithGodStepsIntroRoute,
  peaceWithGodStepsLongRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function IndexPage() {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (loginStatus === 'initializing' || (isAuthenticated && profileLoading)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthGate />;
  }

  if (showProfileSetup) {
    router.navigate({ to: '/onboarding' });
    return null;
  }

  if (userProfile) {
    router.navigate({ to: '/feed' });
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function AppWithProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return <AppWithProviders />;
}
