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
  bibleTranslations: ['bibleTranslations'],
  bibleBooks: (translationId: bigint | null) => ['bibleBooks', translationId?.toString()],
  bibleChapters: (bookId: bigint | null) => ['bibleChapters', bookId?.toString()],
  bibleVerses: (translationId: bigint | null, bookId: bigint | null, chapterId: bigint | null) => [
    'bibleVerses',
    translationId?.toString(),
    bookId?.toString(),
    chapterId?.toString(),
  ],
  bibleLastLocation: ['bibleLastLocation'],
} as const;
