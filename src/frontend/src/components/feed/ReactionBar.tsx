import { useState } from 'react';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { useAddReaction, useRemoveReaction } from '../../hooks/useQueries';
import { toast } from 'sonner';

interface ReactionBarProps {
  itemId: bigint;
  reactionCount?: number;
  userHasReacted?: boolean;
}

export default function ReactionBar({ itemId, reactionCount = 0, userHasReacted = false }: ReactionBarProps) {
  const [hasReacted, setHasReacted] = useState(userHasReacted);
  const addReaction = useAddReaction();
  const removeReaction = useRemoveReaction();

  const handleReaction = async () => {
    try {
      if (hasReacted) {
        await removeReaction.mutateAsync(itemId);
        setHasReacted(false);
      } else {
        await addReaction.mutateAsync({ itemId, emoji: '❤️' });
        setHasReacted(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update reaction');
    }
  };

  const isPending = addReaction.isPending || removeReaction.isPending;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={hasReacted ? 'default' : 'ghost'}
        size="sm"
        onClick={handleReaction}
        disabled={isPending}
        className="gap-2"
      >
        <Heart className={`h-4 w-4 ${hasReacted ? 'fill-current' : ''}`} />
        <span className="text-sm">{reactionCount}</span>
      </Button>
    </div>
  );
}
