import { Button } from '../ui/button';
import { Repeat2, Loader2 } from 'lucide-react';
import { useRepostItem } from '../../hooks/useQueries';
import { toast } from 'sonner';

interface RepostButtonProps {
  itemId: bigint;
  repostCount: number;
}

export default function RepostButton({ itemId, repostCount }: RepostButtonProps) {
  const repost = useRepostItem();

  const handleRepost = async () => {
    try {
      await repost.mutateAsync(itemId);
      toast.success('Post shared to your feed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to repost');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleRepost}
      disabled={repost.isPending}
      className="gap-2"
    >
      {repost.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Repeat2 className="h-4 w-4" />
      )}
      <span className="text-sm">{Number(repostCount)}</span>
    </Button>
  );
}
