import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { LogOut, Plus, BookOpen, Heart } from 'lucide-react';

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
    <header className="border-b border-border/40 bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <button
            onClick={handleLogoClick}
            className="focus:outline-none focus:ring-2 focus:ring-ring rounded flex-shrink-0"
          >
            <img
              src="/assets/generated/image-4.png"
              alt="Church Origins"
              className="h-10 w-auto sm:h-12 md:h-14 object-contain"
            />
          </button>

          {/* Center: Main CTA Button */}
          <div className="flex-1 flex justify-center px-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate({ to: '/peace-with-god-steps-intro' })}
              className="whitespace-nowrap text-sm md:text-base"
            >
              <Heart className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Ready For The Peace with Jesus?</span>
              <span className="sm:hidden">Peace with Jesus?</span>
            </Button>
          </div>

          {/* Right: Navigation Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/peace-with-god' })}
              className="hidden md:flex"
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
                  className="hidden sm:flex"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Share Testimony</span>
                  <span className="lg:hidden">Share</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
