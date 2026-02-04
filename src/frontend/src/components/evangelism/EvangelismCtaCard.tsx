import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function EvangelismCtaCard() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAction = async () => {
    if (!isAuthenticated) {
      await login();
      return;
    }

    if (userProfile === null && !profileLoading) {
      navigate({ to: '/onboarding' });
      return;
    }

    if (userProfile) {
      navigate({ to: '/feed' });
    }
  };

  const getCtaText = () => {
    if (isLoggingIn) return 'Connecting...';
    if (!isAuthenticated) return 'Sign In to Continue';
    if (userProfile === null && !profileLoading) return 'Complete Your Profile';
    if (userProfile) return 'Go to Community Feed';
    return 'Continue';
  };

  return (
    <Card className="border-primary/20 bg-accent/10">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Ready to Take the Next Step?</CardTitle>
        <CardDescription className="text-base">
          Join the Church Origins community to grow in faith, share your testimony, and connect with others seeking to follow Christ faithfully.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          size="lg"
          onClick={handleAction}
          disabled={isLoggingIn || (isAuthenticated && profileLoading)}
          className="w-full"
        >
          {(isLoggingIn || (isAuthenticated && profileLoading)) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {getCtaText()}
            </>
          ) : (
            <>
              {getCtaText()}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
