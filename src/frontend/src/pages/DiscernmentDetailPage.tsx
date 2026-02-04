import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetDailyFeed } from '../hooks/useQueries';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, Lightbulb } from 'lucide-react';

export default function DiscernmentDetailPage() {
  const { index } = useParams({ from: '/discernment/$index' });
  const navigate = useNavigate();
  const { data, isLoading } = useGetDailyFeed();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const discernmentIndex = parseInt(index, 10);
  const discernment = data?.discernments[discernmentIndex];

  if (!discernment) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/feed' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </Button>
        <p className="text-muted-foreground">Discernment reflection not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate({ to: '/feed' })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Feed
      </Button>

      <Card className="border-l-4 border-l-accent/60">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-accent-foreground" />
            <Badge variant="outline">Discernment Guidance</Badge>
          </div>
          <CardTitle className="text-2xl font-serif">
            {discernment.labels.length > 0 ? discernment.labels[0] : 'Spiritual Reflection'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {discernment.content}
            </p>
          </div>

          {discernment.references.length > 0 && (
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Scripture Foundation
              </h3>
              <div className="space-y-2">
                {discernment.references.map((ref, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground italic">
                    {ref}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground italic">
            This reflection is offered as guidance for spiritual discernment, anchored in Scripture.
            Seek the Holy Spirit's confirmation in your own walk with God.
          </div>

          {discernment.labels.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {discernment.labels.slice(1).map((label, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
