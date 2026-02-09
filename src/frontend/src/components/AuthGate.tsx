import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';
import { Loader2, ArrowRight, BookOpen, Users, Heart } from 'lucide-react';
import { useState } from 'react';

export default function AuthGate() {
  const navigate = useNavigate();
  const { login, loginStatus } = useInternetIdentity();
  const [imageError, setImageError] = useState(false);

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Hero Image - Inline above headline */}
            <div className="w-full max-w-4xl rounded-lg overflow-hidden bg-gradient-to-b from-background to-muted/20">
              {!imageError ? (
                <img
                  src="/assets/generated/home-hero.dim_1600x600.jpg"
                  alt="Crown of thorns"
                  className="w-full h-auto object-contain"
                  style={{ aspectRatio: '8/3' }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div 
                  className="w-full bg-gradient-to-br from-muted/40 via-muted/20 to-background flex items-center justify-center"
                  style={{ aspectRatio: '8/3' }}
                >
                  <div className="text-center space-y-3 px-6">
                    <Heart className="h-16 w-16 text-primary/40 mx-auto" />
                    <p className="text-sm text-muted-foreground/60">Hero image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl leading-[1.1]">
              Recognize God's Work in the Present Day
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              A space to grow in spiritual discernment through Scripture, reflection, and shared testimony.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                onClick={login}
                disabled={isLoggingIn}
                size="lg"
                className="text-lg px-8 py-6 h-auto"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate({ to: '/peace-with-god' })}
                className="text-lg px-8 py-6 h-auto border-2"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Faith Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 border-t border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Daily Scripture
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive carefully selected Scripture passages with motivation and context to guide your spiritual journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Spiritual Discernment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Grow in wisdom through reflections rooted in Scripture, helping you recognize God's work today.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Community Testimony
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Share and discover testimonies of faith, building a community centered on Christ's work in our lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-24 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Built for Believers
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Church Origins is a platform designed to help Christians grow in their faith through daily engagement with Scripture, thoughtful reflection, and authentic community. Whether you're seeking peace with God or looking to deepen your walk with Christ, you'll find resources and fellowship here.
            </p>
            <div className="pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate({ to: '/peace-with-god-steps-intro' })}
                className="text-lg px-8 py-6 h-auto border-2"
              >
                <Heart className="mr-2 h-5 w-5" />
                Find Peace with God
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 py-12 mt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()}. Built with</span>
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button
                onClick={() => navigate({ to: '/peace-with-god' })}
                className="hover:text-foreground transition-colors"
              >
                Faith Resources
              </button>
              <button
                onClick={() => navigate({ to: '/topics-questions' })}
                className="hover:text-foreground transition-colors"
              >
                Topics & Questions
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
