import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useAddComment } from '../../hooks/useQueries';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface AddCommentFormProps {
  itemId: bigint;
  onSuccess?: () => void;
}

export default function AddCommentForm({ itemId, onSuccess }: AddCommentFormProps) {
  const [content, setContent] = useState('');
  const [references, setReferences] = useState('');
  const [isPrayerRequest, setIsPrayerRequest] = useState(false);
  const addComment = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      const refArray = references
        .split(',')
        .map(r => r.trim())
        .filter(r => r.length > 0);
      
      await addComment.mutateAsync({
        itemId,
        content: content.trim(),
        references: refArray,
        isPrayerRequest,
      });
      
      setContent('');
      setReferences('');
      setIsPrayerRequest(false);
      toast.success(isPrayerRequest ? 'Prayer request submitted' : 'Comment added');
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add comment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={isPrayerRequest ? "Share your prayer request..." : "Add a comment..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[80px] resize-none"
        disabled={addComment.isPending}
      />
      <Input
        placeholder="Scripture references (optional, comma-separated)"
        value={references}
        onChange={(e) => setReferences(e.target.value)}
        disabled={addComment.isPending}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            id="prayer-request"
            checked={isPrayerRequest}
            onCheckedChange={setIsPrayerRequest}
            disabled={addComment.isPending}
          />
          <Label htmlFor="prayer-request" className="text-sm text-muted-foreground">
            This is a prayer request
          </Label>
        </div>
        <Button
          type="submit"
          disabled={addComment.isPending || !content.trim()}
          size="sm"
        >
          {addComment.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Post
            </>
          )}
        </Button>
      </div>
      {isPrayerRequest && (
        <p className="text-xs text-muted-foreground italic">
          Prayer requests receive a Scripture-based response from our AI agent.
        </p>
      )}
    </form>
  );
}
