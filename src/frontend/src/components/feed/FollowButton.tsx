import { Button } from '../ui/button';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { useFollowUser, useUnfollowUser } from '../../hooks/useQueries';
import { Principal } from '@dfinity/principal';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { toast } from 'sonner';
import { useState } from 'react';

interface FollowButtonProps {
  userId: Principal;
  initialFollowing?: boolean;
}

export default function FollowButton({ userId, initialFollowing = false }: FollowButtonProps) {
  const { identity } = useInternetIdentity();
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  const isSystemAgent = userId.toString() === Principal.anonymous().toString();
  const isSelf = identity?.getPrincipal().toString() === userId.toString();

  if (isSystemAgent || isSelf) {
    return null;
  }

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser.mutateAsync(userId);
        setIsFollowing(false);
        toast.success('Unfollowed user');
      } else {
        await followUser.mutateAsync(userId);
        setIsFollowing(true);
        toast.success('Following user');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update follow status');
    }
  };

  const isPending = followUser.isPending || unfollowUser.isPending;

  return (
    <Button
      variant={isFollowing ? 'outline' : 'default'}
      size="sm"
      onClick={handleFollow}
      disabled={isPending}
      className="gap-2"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        <>
          <UserMinus className="h-4 w-4" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
}
