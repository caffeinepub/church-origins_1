import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Book, Lightbulb, MessageSquare, Repeat2 } from 'lucide-react';
import AuthorIdentityBadge from './AuthorIdentityBadge';
import ReactionBar from './ReactionBar';
import RepostButton from './RepostButton';
import CommentsThreadDialog from './CommentsThreadDialog';
import FollowButton from './FollowButton';
import type { FeedItem } from '../../backend';
import { Principal } from '@dfinity/principal';
import { Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony } from '../../backend';

interface UnifiedFeedItemCardProps {
  item: FeedItem;
}

export default function UnifiedFeedItemCard({ item }: UnifiedFeedItemCardProps) {
  const isRepost = item.originalItemId !== undefined && item.originalItemId !== null;
  const isAgentPost = item.itemType === Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.aiAgentPost;
  const isUserPost = item.itemType === Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.userPost;

  const getItemIcon = () => {
    switch (item.itemType) {
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.scriptureEntry:
        return <Book className="h-5 w-5 text-primary" />;
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.reflection:
        return <Lightbulb className="h-5 w-5 text-accent-foreground" />;
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.testimony:
        return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.aiAgentPost:
        return <Book className="h-5 w-5 text-primary" />;
      default:
        return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getItemTypeLabel = () => {
    switch (item.itemType) {
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.scriptureEntry:
        return 'Scripture';
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.reflection:
        return 'Discernment Guidance';
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.testimony:
        return 'Testimony';
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.aiAgentPost:
        return 'Scripture Post';
      case Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony.userPost:
        return 'Post';
      default:
        return 'Post';
    }
  };

  const date = new Date(Number(item.timestamp) / 1000000);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="space-y-3">
          {isRepost && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Repeat2 className="h-4 w-4" />
              <span>Reposted</span>
            </div>
          )}
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              {getItemIcon()}
              <div className="flex-1">
                <AuthorIdentityBadge authorId={item.authorId} isAgentPost={isAgentPost} />
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {getItemTypeLabel()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            
            {!isAgentPost && (
              <FollowButton userId={item.authorId} />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {item.content}
        </p>
        
        {item.references.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Book className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="italic">{item.references.join(', ')}</span>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
          <ReactionBar itemId={item.id} />
          <CommentsThreadDialog itemId={item.id} commentCount={0} />
          <RepostButton itemId={item.id} repostCount={Number(item.repostCount)} />
        </div>
      </CardContent>
    </Card>
  );
}
