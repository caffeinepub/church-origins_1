import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { queryKeys } from './queryKeys';
import type { LastBibleLocation } from '../backend';

export function useBibleLastLocation() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const { data: lastLocation, isLoading } = useQuery<LastBibleLocation | null>({
    queryKey: queryKeys.bibleLastLocation,
    queryFn: async () => {
      if (!actor || !isAuthenticated) return null;
      return actor.getLastBibleLocation();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    retry: 1,
  });

  const { mutate: saveLocationMutation } = useMutation({
    mutationFn: async (params: {
      translationId: bigint;
      bookId: bigint;
      chapterId: bigint;
      verseId: bigint | null;
    }) => {
      if (!actor || !isAuthenticated) return;
      return actor.setLastBibleLocation(
        params.translationId,
        params.bookId,
        params.chapterId,
        params.verseId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bibleLastLocation });
    },
  });

  const saveLocation = (
    translationId: bigint,
    bookId: bigint,
    chapterId: bigint,
    verseId: bigint | null
  ) => {
    if (isAuthenticated) {
      saveLocationMutation({ translationId, bookId, chapterId, verseId });
    }
  };

  return {
    lastLocation: isAuthenticated ? lastLocation : null,
    isLoading: isAuthenticated ? isLoading : false,
    saveLocation,
  };
}
