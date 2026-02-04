import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';
import { Loader2, BookOpen } from 'lucide-react';

export default function AuthGate() {
  const navigate = useNavigate();
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-semibold text-foreground">
            Welcome to Church Origins
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A space to recognize God's work in the present day and grow in spiritual discernment through
            Scripture, reflection, and shared testimony.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="w-full max-w-xs"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Sign In to Continue'
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate({ to: '/peace-with-god' })}
            className="w-full max-w-xs"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Explore Faith Resources
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          Sign in securely using Internet Identity
        </p>
      </div>
    </div>
  );
}
