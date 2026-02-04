import { Link } from '@tanstack/react-router';
import EvangelismPageShell from '../components/evangelism/EvangelismPageShell';
import EvangelismCtaCard from '../components/evangelism/EvangelismCtaCard';
import { evangelismContent } from './evangelismContent';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function AssuranceNextStepsPage() {
  const content = evangelismContent.assuranceNextSteps;

  return (
    <EvangelismPageShell title={content.title} subtitle={content.subtitle}>
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-foreground">
          If you have trusted in Christ, your journey of faith has just begun. Here are the next steps God calls you to take as you grow in your relationship with Him.
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

        <div className="grid md:grid-cols-2 gap-4 pt-4">
          <Link
            to="/how-to-begin"
            className="block p-6 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
          >
            <h3 className="text-xl font-serif font-semibold mb-2">← How to Begin</h3>
            <p className="text-sm text-muted-foreground">
              Taking your first steps in following Jesus Christ
            </p>
          </Link>
          <Link
            to="/connect"
            className="block p-6 border border-border/40 rounded-lg hover:border-primary/40 hover:bg-accent/5 transition-colors"
          >
            <h3 className="text-xl font-serif font-semibold mb-2">Connect →</h3>
            <p className="text-sm text-muted-foreground">
              Join the Church Origins community
            </p>
          </Link>
        </div>

        <EvangelismCtaCard />
      </div>
    </EvangelismPageShell>
  );
}
