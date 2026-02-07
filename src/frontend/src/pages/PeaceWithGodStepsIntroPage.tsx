import { useNavigate } from '@tanstack/react-router';
import EvangelismPageShell from '../components/evangelism/EvangelismPageShell';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { stepsOutline } from './peaceWithGodStepsContent';
import { ArrowRight } from 'lucide-react';

export default function PeaceWithGodStepsIntroPage() {
  const navigate = useNavigate();

  return (
    <EvangelismPageShell
      title="Ready For The Peace with Jesus?"
      subtitle="You can have real, lasting peace today through a relationship with Jesus Christ. Start your four-step journey now."
      showHero={true}
    >
      <div className="space-y-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Many people search for peace through achievements, relationships, experiences, or possessions. 
            But true, lasting peace comes only through knowing Jesus Christ personally.
          </p>
          <p className="text-lg text-muted-foreground">
            This simple four-step journey will help you understand God's love for you and how you can 
            begin a relationship with Him today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {stepsOutline.map((step) => (
            <Card key={step.number} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Badge variant="default" className="text-lg px-3 py-1">
                    Step {step.number}
                  </Badge>
                  <CardTitle className="text-xl font-serif flex-1">
                    {step.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 py-8">
          <Button
            size="lg"
            onClick={() => navigate({ to: '/peace-with-god-steps' })}
            className="text-lg px-8 py-6 h-auto"
          >
            Begin Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Take a few minutes to read through all four steps and discover how you can 
            experience peace with God through Jesus Christ.
          </p>
        </div>

        <Card className="bg-muted/50 border-2">
          <CardHeader>
            <CardTitle className="font-serif">Why Church Origins?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Church Origins is a community dedicated to helping people discover and grow in their 
              faith in Jesus Christ. We provide daily Scripture, spiritual guidance, and a supportive 
              community of believers.
            </p>
            <p className="text-muted-foreground">
              Whether you're just beginning to explore faith or have been following Jesus for years, 
              Church Origins is here to encourage and equip you in your spiritual journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </EvangelismPageShell>
  );
}
