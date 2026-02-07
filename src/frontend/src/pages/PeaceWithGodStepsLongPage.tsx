import EvangelismPageShell from '../components/evangelism/EvangelismPageShell';
import EvangelismCtaCard from '../components/evangelism/EvangelismCtaCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { stepsContent, responseSteps, examplePrayer, churchOriginsConnection } from './peaceWithGodStepsContent';

export default function PeaceWithGodStepsLongPage() {
  return (
    <EvangelismPageShell
      title="Steps to Peace with God"
      subtitle="A clear path to experiencing God's love and forgiveness through Jesus Christ"
    >
      <div className="space-y-12">
        {stepsContent.map((step, index) => (
          <section key={step.number} className="scroll-mt-8">
            <div className="flex items-start gap-4 mb-6">
              <Badge variant="default" className="text-xl px-4 py-2 flex-shrink-0">
                Step {step.number}
              </Badge>
              <div>
                <h2 className="text-3xl font-serif font-semibold text-foreground mb-2">
                  {step.title}
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  {step.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {step.content.map((paragraph, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <Card className="bg-muted/30 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">The Bible says:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {step.scriptures.map((scripture, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-base italic text-foreground/90">
                      "{scripture.text}"
                    </p>
                    <p className="text-sm font-medium text-primary">
                      — {scripture.reference}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {index < stepsContent.length - 1 && (
              <Separator className="my-12" />
            )}
          </section>
        ))}

        <Separator className="my-12" />

        <section className="space-y-6">
          <h2 className="text-3xl font-serif font-semibold text-foreground">
            How to Receive Christ
          </h2>
          
          <p className="text-lg leading-relaxed text-foreground/90">
            Here is how you can receive Christ into your life:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {responseSteps.map((step, idx) => (
              <Card key={idx} className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">
                    {idx + 1}. {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl font-serif">A Prayer to Receive Christ</CardTitle>
              <p className="text-sm text-muted-foreground">
                This is a suggested prayer. What matters is the sincerity of your heart, not the exact words.
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 p-6 rounded-lg">
                <p className="text-base leading-relaxed whitespace-pre-line font-serif italic">
                  {examplePrayer}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-2">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Did You Pray This Prayer?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base text-foreground/90">
                If you sincerely prayed to receive Jesus Christ, the Bible promises that He has come 
                into your life. You are now a child of God, and your sins are forgiven.
              </p>
              <p className="text-base text-foreground/90">
                This is just the beginning of a wonderful journey with Christ. We encourage you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-foreground/90 ml-4">
                <li>Tell someone about your decision to follow Christ</li>
                <li>Read the Bible daily, starting with the Gospel of John</li>
                <li>Pray and talk to God regularly</li>
                <li>Find a local church where you can worship and grow</li>
                <li>Be baptized as an outward sign of your faith</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        <section className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                {churchOriginsConnection.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-foreground/90 mb-6">
                {churchOriginsConnection.content}
              </p>
              <EvangelismCtaCard />
            </CardContent>
          </Card>
        </section>
      </div>
    </EvangelismPageShell>
  );
}
