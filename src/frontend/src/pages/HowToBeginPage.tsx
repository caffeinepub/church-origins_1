import { Link } from '@tanstack/react-router';
import EvangelismPageShell from '../components/evangelism/EvangelismPageShell';
import EvangelismCtaCard from '../components/evangelism/EvangelismCtaCard';
import { evangelismContent } from './evangelismContent';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Heart } from 'lucide-react';

export default function HowToBeginPage() {
  const content = evangelismContent.howToBegin;

  return (
    <EvangelismPageShell title={content.title} subtitle={content.subtitle}>
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-foreground">
          If you are ready to trust in Jesus Christ, here are the steps the Bible describes for beginning your relationship with God.
        </p>

        {content.steps.map((step) => (
          <Card key={step.number} className="border-border/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  {step.number}
                </div>
                <CardTitle className="text-2xl font-serif">{step.heading}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">{step.content}</p>
              <div className="flex flex-wrap gap-2">
                {step.references.map((ref, refIndex) => (
                  <Badge key={refIndex} variant="secondary" className="text-xs">
                    {ref}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <Alert className="border-primary/30 bg-primary/5">
          <Heart className="h-5 w-5 text-primary" />
          <AlertTitle className="text-xl font-serif">
            {content.prayerExample.heading}
          </AlertTitle>
          <AlertDescription className="space-y-3 mt-3">
            <p className="text-base">{content.prayerExample.content}</p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-base">
              {content.prayerExample.prayer}
            </blockquote>
            <p className="text-sm text-muted-foreground">{content.prayerExample.note}</p>
          </AlertDescription>
        </Alert>

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

        <div className="grid md:grid-cols-2 gap-4 pt-4">
          <Link
            to="/why-jesus"
            className="block p-6 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
          >
            <h3 className="text-xl font-serif font-semibold mb-2">← Why Jesus?</h3>
            <p className="text-sm text-muted-foreground">
              The unique identity and work of Jesus Christ
            </p>
          </Link>
          <Link
            to="/assurance-next-steps"
            className="block p-6 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
          >
            <h3 className="text-xl font-serif font-semibold mb-2">Next Steps →</h3>
            <p className="text-sm text-muted-foreground">
              Growing in confidence and faithfulness as a follower of Christ
            </p>
          </Link>
        </div>

        <EvangelismCtaCard />
      </div>
    </EvangelismPageShell>
  );
}
