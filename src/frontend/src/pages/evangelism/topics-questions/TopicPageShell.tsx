import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import EvangelismPageShell from '../../../components/evangelism/EvangelismPageShell';
import EvangelismCtaCard from '../../../components/evangelism/EvangelismCtaCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { TopicContent } from '../../topicsQuestionsContent';

interface TopicPageShellProps {
  topic: TopicContent;
}

export default function TopicPageShell({ topic }: TopicPageShellProps) {
  return (
    <EvangelismPageShell
      title={topic.title}
      subtitle={topic.shortDescription}
      showHero={false}
    >
      <div className="space-y-8">
        <Link
          to="/topics-questions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Topics & Questions
        </Link>

        {topic.sections.map((section, index) => (
          <Card key={index} className="border-border/40">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">{section.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">{section.content}</p>
              {section.references && section.references.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {section.references.map((ref, refIndex) => (
                    <Badge key={refIndex} variant="secondary" className="text-xs">
                      {ref}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">
              {topic.churchOriginsFraming.heading}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              {topic.churchOriginsFraming.content}
            </p>
          </CardContent>
        </Card>

        <EvangelismCtaCard />
      </div>
    </EvangelismPageShell>
  );
}
