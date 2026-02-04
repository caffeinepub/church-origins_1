import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { LogOut, Plus, BookOpen } from 'lucide-react';

export default function AppHeader() {
  const navigate = useNavigate();
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate({ to: '/feed' });
    } else {
      navigate({ to: '/' });
    }
  };

  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
        <button
          onClick={handleLogoClick}
          className="focus:outline-none focus:ring-2 focus:ring-ring rounded"
        >
          <img
            src="/assets/generated/church-origins-wordmark.dim_1200x300.png"
            alt="Church Origins"
            className="h-10 w-auto"
          />
        </button>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: '/peace-with-god' })}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Start Here
          </Button>

          {isAuthenticated && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: '/submit-testimony' })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Share Testimony
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
