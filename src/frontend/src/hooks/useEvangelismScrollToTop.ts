import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const EVANGELISM_ROUTES = [
  '/why-jesus',
  '/how-to-begin',
  '/assurance-next-steps',
  '/connect',
  '/topics-questions',
  '/peace-with-god-steps-intro',
  '/peace-with-god-steps',
];

// Check if path starts with any evangelism route or topics-questions sub-routes
function isEvangelismRoute(path: string): boolean {
  return EVANGELISM_ROUTES.some(route => path === route) || path.startsWith('/topics-questions/');
}

export function useEvangelismScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.state.location.pathname;
    
    if (isEvangelismRoute(currentPath)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [router.state.location.pathname]);
}
