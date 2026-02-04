import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const EVANGELISM_ROUTES = [
  '/why-jesus',
  '/how-to-begin',
  '/assurance-next-steps',
  '/connect',
];

export function useEvangelismScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.state.location.pathname;
    
    if (EVANGELISM_ROUTES.includes(currentPath)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [router.state.location.pathname]);
}
