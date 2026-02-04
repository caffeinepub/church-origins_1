import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { queryKeys } from './queryKeys';
import type { UserProfile, ScriptureEntry, DiscernmentReflection, Testimony, FeedItem } from '../backend';
import { Principal } from '@dfinity/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: queryKeys.currentUserProfile,
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUserProfile });
    },
  });
}

export function useGetDailyFeed() {
  const { actor, isFetching } = useActor();

  return useQuery<{
    scriptures: ScriptureEntry[];
    discernments: DiscernmentReflection[];
    testimonies: Testimony[];
  }>({
    queryKey: queryKeys.dailyFeed,
    queryFn: async () => {
      if (!actor) return { scriptures: [], discernments: [], testimonies: [] };
      const [scriptures, discernments, testimonies] = await actor.getDailyFeed();
      return { scriptures, discernments, testimonies };
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUnifiedFeed(limit: number = 20, offset: number = 0) {
  const { actor, isFetching } = useActor();

  return useQuery<FeedItem[]>({
    queryKey: queryKeys.unifiedFeed(limit, offset),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeed(BigInt(limit), BigInt(offset));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { content: string; references: string[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPost(params.content, params.references);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unifiedFeed'] });
    },
  });
}

export function useAddReaction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { itemId: bigint; emoji: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReaction(params.itemId, params.emoji);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['unifiedFeed'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.feedItemReactions(variables.itemId) });
    },
  });
}

export function useRemoveReaction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeReaction(itemId);
    },
    onSuccess: (_, itemId) => {
      queryClient.invalidateQueries({ queryKey: ['unifiedFeed'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.feedItemReactions(itemId) });
    },
  });
}

export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      itemId: bigint;
      content: string;
      references: string[];
      isPrayerRequest?: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addComment(
        params.itemId,
        params.content,
        params.references,
        params.isPrayerRequest || false
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feedItemComments(variables.itemId) });
      queryClient.invalidateQueries({ queryKey: ['unifiedFeed'] });
    },
  });
}

export function useRepostItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.repostItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unifiedFeed'] });
    },
  });
}

export function useFollowUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userToFollow: Principal) => {
      if (!actor) throw new Error('Actor not available');
      return actor.followUser(userToFollow);
    },
    onSuccess: (_, userToFollow) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userFollowState(userToFollow.toString()) });
      queryClient.invalidateQueries({ queryKey: queryKeys.followersCount(userToFollow.toString()) });
    },
  });
}

export function useUnfollowUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userToUnfollow: Principal) => {
      if (!actor) throw new Error('Actor not available');
      return actor.unfollowUser(userToUnfollow);
    },
    onSuccess: (_, userToUnfollow) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userFollowState(userToUnfollow.toString()) });
      queryClient.invalidateQueries({ queryKey: queryKeys.followersCount(userToUnfollow.toString()) });
    },
  });
}

export function useGetFollowersCount(user: Principal) {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: queryKeys.followersCount(user.toString()),
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getFollowersCount(user);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile(user: Principal) {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: queryKeys.userProfile(user.toString()),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserProfile(user);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitTestimony() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      content: string;
      labels: string[];
      disclaimers: string[];
      scriptureReferences: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitTestimony(
        params.content,
        params.labels,
        params.disclaimers,
        params.scriptureReferences
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyFeed });
    },
  });
}
