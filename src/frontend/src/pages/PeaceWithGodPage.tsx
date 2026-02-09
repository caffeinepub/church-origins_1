import { Link } from '@tanstack/react-router';
import EvangelismPageShell from '../components/evangelism/EvangelismPageShell';
import EvangelismCtaCard from '../components/evangelism/EvangelismCtaCard';
import { evangelismContent } from './evangelismContent';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { BookOpen } from 'lucide-react';

export default function PeaceWithGodPage() {
  const content = evangelismContent.peaceWithGod;

  return (
    <EvangelismPageShell
      title={content.title}
      subtitle={content.subtitle}
      showHero={true}
    >
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-foreground">
          The Gospel—the "good news"—is the message that God has made a way for sinful humanity to be reconciled to Him through Jesus Christ. This is the most important message you will ever hear.
        </p>

        {content.sections.map((section, index) => (
          <Card key={index} className="border-border/40">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">{section.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">{section.content}</p>
              <div className="flex flex-wrap gap-2">
                {section.references.map((ref, refIndex) => (
                  <Badge key={refIndex} variant="secondary" className="text-xs">
                    {ref}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">
              {content.churchOriginsConnection.heading}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              {content.churchOriginsConnection.content}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/40 bg-accent/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-serif">
                Explore More Topics
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed mb-4">
              Have questions about faith, Scripture, or following Christ? Our Topics & Questions section addresses common questions with biblical answers.
            </p>
            <Link
              to="/topics-questions"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Browse All Topics
              <span className="text-lg">→</span>
            </Link>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 pt-4">
          <Link
            to="/why-jesus"
            className="block p-6 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
          >
            <h3 className="text-xl font-serif font-semibold mb-2">Why Jesus? →</h3>
            <p className="text-sm text-muted-foreground">
              Learn about the unique identity and work of Jesus Christ
            </p>
          </Link>
          <Link
            to="/how-to-begin"
            className="block p-6 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
          >
            <h3 className="text-xl font-serif font-semibold mb-2">How to Begin →</h3>
            <p className="text-sm text-muted-foreground">
              Take your first steps in following Jesus Christ
            </p>
          </Link>
        </div>

        <EvangelismCtaCard />
      </div>
    </EvangelismPageShell>
  );
}
