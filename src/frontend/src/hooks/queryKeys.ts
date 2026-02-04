// Centralized React Query keys for consistent cache management
export const queryKeys = {
  currentUserProfile: ['currentUserProfile'],
  dailyFeed: ['dailyFeed'],
  unifiedFeed: (limit: number, offset: number) => ['unifiedFeed', limit, offset],
  feedItemComments: (itemId: bigint) => ['feedItemComments', itemId.toString()],
  feedItemReactions: (itemId: bigint) => ['feedItemReactions', itemId.toString()],
  userFollowState: (userId: string) => ['userFollowState', userId],
  followersCount: (userId: string) => ['followersCount', userId],
  followingCount: (userId: string) => ['followingCount', userId],
  userProfile: (userId: string) => ['userProfile', userId],
} as const;
