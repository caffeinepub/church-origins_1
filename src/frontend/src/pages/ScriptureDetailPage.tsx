import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetDailyFeed } from '../hooks/useQueries';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, Book } from 'lucide-react';

export default function ScriptureDetailPage() {
  const { index } = useParams({ from: '/scripture/$index' });
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

  const scriptureIndex = parseInt(index, 10);
  const scripture = data?.scriptures[scriptureIndex];

  if (!scripture) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/feed' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </Button>
        <p className="text-muted-foreground">Scripture entry not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => navigate({ to: '/feed' })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Feed
      </Button>

      <Card className="border-l-4 border-l-primary/60">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Book className="h-5 w-5 text-primary" />
            <Badge variant="secondary">Scripture</Badge>
          </div>
          <CardTitle className="text-3xl font-serif">
            {scripture.references.join(', ')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
              {scripture.text}
            </p>
          </div>

          {scripture.motivation && (
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Reflection
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {scripture.motivation}
              </p>
            </div>
          )}

          {scripture.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {scripture.labels.map((label, idx) => (
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
