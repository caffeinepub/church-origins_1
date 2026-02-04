import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { MessageSquare, Loader2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import AddCommentForm from './AddCommentForm';
import AgentReplyCard from './AgentReplyCard';
import { useState } from 'react';

interface Comment {
  authorId: string;
  content: string;
  timestamp: bigint;
  references: string[];
  isAgentReply: boolean;
}

interface CommentsThreadDialogProps {
  itemId: bigint;
  commentCount?: number;
  comments?: Comment[];
  isLoading?: boolean;
}

export default function CommentsThreadDialog({
  itemId,
  commentCount = 0,
  comments = [],
  isLoading = false,
}: CommentsThreadDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">{commentCount}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to share your thoughts.
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, idx) => (
                <div key={idx}>
                  {comment.isAgentReply ? (
                    <AgentReplyCard
                      content={comment.content}
                      references={comment.references}
                      timestamp={comment.timestamp}
                    />
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Community Member</p>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                      {comment.references.length > 0 && (
                        <p className="text-xs text-muted-foreground italic">
                          {comment.references.join(', ')}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(Number(comment.timestamp) / 1000000).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {idx < comments.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator className="my-4" />
        
        <div>
          <AddCommentForm itemId={itemId} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
