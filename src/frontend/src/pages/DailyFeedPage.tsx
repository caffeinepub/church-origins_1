import { useGetDailyFeed, useGetUnifiedFeed } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import FeedItemCard from '../components/feed/FeedItemCard';
import UnifiedFeedItemCard from '../components/feed/UnifiedFeedItemCard';
import CreatePostComposer from '../components/feed/CreatePostComposer';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import type { ScriptureEntry, DiscernmentReflection, Testimony } from '../backend';

type LegacyFeedItem =
  | { type: 'scripture'; data: ScriptureEntry; index: number }
  | { type: 'discernment'; data: DiscernmentReflection; index: number }
  | { type: 'testimony'; data: Testimony; index: number };

export default function DailyFeedPage() {
  const { identity } = useInternetIdentity();
  const { data: legacyData, isLoading: legacyLoading, error: legacyError } = useGetDailyFeed();
  const { data: unifiedFeed, isLoading: unifiedLoading, error: unifiedError } = useGetUnifiedFeed(50, 0);

  const isAuthenticated = !!identity;

  if (legacyLoading || unifiedLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (legacyError || unifiedError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load feed. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!legacyData || !unifiedFeed) {
    return null;
  }

  const { scriptures, discernments, testimonies } = legacyData;

  // Interleave legacy content types for the daily feed tab
  const interleavedFeed: LegacyFeedItem[] = [];
  const maxLength = Math.max(scriptures.length, discernments.length, testimonies.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < scriptures.length) {
      interleavedFeed.push({ type: 'scripture', data: scriptures[i], index: i });
    }
    if (i < discernments.length) {
      interleavedFeed.push({ type: 'discernment', data: discernments[i], index: i });
    }
    if (i < testimonies.length) {
      interleavedFeed.push({ type: 'testimony', data: testimonies[i], index: i });
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-serif font-semibold text-foreground">Community Feed</h1>
        <p className="text-muted-foreground leading-relaxed">
          Scripture, reflections, and community posts to encourage your spiritual journey.
        </p>
      </div>

      {isAuthenticated && (
        <CreatePostComposer />
      )}

      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="social">Social Feed</TabsTrigger>
          <TabsTrigger value="daily">Daily Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="social" className="space-y-6 mt-6">
          {unifiedFeed.length === 0 ? (
            <Alert>
              <AlertDescription>
                No posts yet. Be the first to share something with the community!
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              {unifiedFeed.map((item) => (
                <UnifiedFeedItemCard key={item.id.toString()} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="daily" className="space-y-6 mt-6">
          {interleavedFeed.length === 0 ? (
            <Alert>
              <AlertDescription>
                No content available yet. Check back soon for Scripture, reflections, and testimonies.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              {interleavedFeed.map((item, idx) => (
                <FeedItemCard key={`${item.type}-${item.index}-${idx}`} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
