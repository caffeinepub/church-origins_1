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
