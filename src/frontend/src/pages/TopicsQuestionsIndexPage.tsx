import { Link } from '@tanstack/react-router';
import EvangelismPageShell from '../components/evangelism/EvangelismPageShell';
import EvangelismCtaCard from '../components/evangelism/EvangelismCtaCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { topicsQuestionsContent } from './topicsQuestionsContent';
import { ArrowRight } from 'lucide-react';

// Map slugs to explicit route paths for type safety
const slugToRoute: Record<string, string> = {
  'who-is-god': '/topics-questions/who-is-god',
  'what-is-sin': '/topics-questions/what-is-sin',
  'why-did-jesus-die': '/topics-questions/why-did-jesus-die',
  'what-is-faith': '/topics-questions/what-is-faith',
  'what-is-repentance': '/topics-questions/what-is-repentance',
  'what-is-the-gospel': '/topics-questions/what-is-the-gospel',
  'what-is-salvation': '/topics-questions/what-is-salvation',
  'what-is-the-church': '/topics-questions/what-is-the-church',
  'what-is-baptism': '/topics-questions/what-is-baptism',
  'what-is-prayer': '/topics-questions/what-is-prayer',
  'how-to-read-the-bible': '/topics-questions/how-to-read-the-bible',
  'what-happens-after-death': '/topics-questions/what-happens-after-death',
  'how-to-share-your-faith': '/topics-questions/how-to-share-your-faith',
};

export default function TopicsQuestionsIndexPage() {
  return (
    <EvangelismPageShell
      title="Topics & Questions"
      subtitle="Exploring essential questions about faith, Scripture, and following Christ"
      showHero={true}
      heroOverride={{
        src: '/assets/generated/topics-hero.dim_1600x600.jpg',
        alt: 'Topics & Questions - Exploring Faith',
      }}
    >
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-foreground">
          Whether you're new to faith or seeking to grow deeper, these topics address common questions about Christianity from a biblical perspective. Each article is grounded in Scripture and written to help you understand God's truth more clearly.
        </p>

        <div className="grid gap-4">
          {topicsQuestionsContent.map((topic) => (
            <Link
              key={topic.slug}
              to={slugToRoute[topic.slug] as any}
              className="block"
            >
              <Card className="border-border/40 hover:border-primary/40 hover:bg-accent/5 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-serif mb-2">
                        {topic.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {topic.shortDescription}
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <EvangelismCtaCard />
      </div>
    </EvangelismPageShell>
  );
}
