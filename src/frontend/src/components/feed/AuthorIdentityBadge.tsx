import { Badge } from '../ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { Principal } from '@dfinity/principal';
import { useGetUserProfile } from '../../hooks/useQueries';

interface AuthorIdentityBadgeProps {
  authorId: Principal;
  isAgentPost?: boolean;
}

export default function AuthorIdentityBadge({ authorId, isAgentPost }: AuthorIdentityBadgeProps) {
  const { data: profile } = useGetUserProfile(authorId);
  
  const isSystemAgent = authorId.toString() === Principal.anonymous().toString();

  if (isSystemAgent || isAgentPost) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">Scripture Agent</span>
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          <CheckCircle2 className="h-3 w-3" />
          Verified System
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-sm">{profile?.name || 'Community Member'}</span>
    </div>
  );
}
