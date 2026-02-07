import { ReactNode } from 'react';

interface HeroOverride {
  src: string;
  alt: string;
}

interface EvangelismPageShellProps {
  title: string;
  subtitle?: string;
  showHero?: boolean;
  heroOverride?: HeroOverride;
  children: ReactNode;
}

export default function EvangelismPageShell({
  title,
  subtitle,
  showHero = false,
  heroOverride,
  children,
}: EvangelismPageShellProps) {
  const heroSrc = heroOverride?.src || '/assets/generated/evangelism-hero.dim_1600x600.png';
  const heroAlt = heroOverride?.alt || 'Church Origins Faith Resources';

  return (
    <div className="evangelism-page">
      {showHero && (
        <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-lg mb-8">
          <img
            src={heroSrc}
            alt={heroAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-start gap-4 mb-8">
          <img
            src="/assets/generated/evangelism-emblem.dim_256x256.png"
            alt=""
            className="w-12 h-12 flex-shrink-0"
          />
          <div>
            <h1 className="text-4xl font-serif font-semibold text-foreground mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {children}
        </div>

        <div className="mt-12 pt-6 border-t border-border/40">
          <p className="text-sm text-muted-foreground italic">
            This page is original Church Origins content, written to be Scripture-rooted and copyright-safe.
          </p>
        </div>
      </div>
    </div>
  );
}
