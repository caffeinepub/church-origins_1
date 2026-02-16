import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { LogOut, Plus, BookOpen, Heart, Library, HelpCircle } from 'lucide-react';
import SupportWithIcpButton from './SupportWithIcpButton';

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

  return (
    <header className="border-b border-border/40 bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Main CTA Buttons */}
          <div className="flex items-center gap-2">
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
            <SupportWithIcpButton />
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

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/faith-resources' })}
              className="hidden sm:flex"
            >
              <Library className="h-4 w-4 sm:mr-2" />
              <span className="hidden md:inline">Faith Resources</span>
              <span className="md:hidden sr-only">Faith Resources</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/topics-questions' })}
              className="hidden sm:flex"
            >
              <HelpCircle className="h-4 w-4 sm:mr-2" />
              <span className="hidden md:inline">Topics & Questions</span>
              <span className="md:hidden sr-only">Topics & Questions</span>
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
