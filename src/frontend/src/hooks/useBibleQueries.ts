import { useQuery, useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import { queryKeys } from './queryKeys';
import type { BibleTranslation, BibleBook, BibleChapter, BibleVerse } from '../backend';

export function useBibleTranslations() {
  const { actor, isFetching } = useActor();

  return useQuery<BibleTranslation[]>({
    queryKey: queryKeys.bibleTranslations,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableBibleTranslations();
    },
    enabled: !!actor && !isFetching,
    staleTime: Infinity,
    retry: 2,
  });
}

export function useBibleBooks(translationId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<BibleBook[]>({
    queryKey: queryKeys.bibleBooks(translationId),
    queryFn: async () => {
      if (!actor || !translationId) return [];
      return actor.getBooksForTranslation(translationId);
    },
    enabled: !!actor && !isFetching && translationId !== null,
    staleTime: Infinity,
    retry: 2,
  });
}

export function useBibleChapters(bookId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<BibleChapter[]>({
    queryKey: queryKeys.bibleChapters(bookId),
    queryFn: async () => {
      if (!actor || !bookId) return [];
      return actor.getChaptersForBook(bookId);
    },
    enabled: !!actor && !isFetching && bookId !== null,
    staleTime: Infinity,
    retry: 2,
  });
}

export function useBibleVerses(
  translationId: bigint | null,
  bookId: bigint | null,
  chapterId: bigint | null
) {
  const { actor, isFetching } = useActor();

  return useQuery<BibleVerse[]>({
    queryKey: queryKeys.bibleVerses(translationId, bookId, chapterId),
    queryFn: async () => {
      if (!actor || !translationId || !bookId || !chapterId) return [];
      return actor.getVersesForChapter(translationId, bookId, chapterId);
    },
    enabled: !!actor && !isFetching && translationId !== null && bookId !== null && chapterId !== null,
    retry: 2,
  });
}

export function useSearchVerse() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: {
      translationId: bigint;
      bookId: bigint;
      chapterId: bigint;
      verseNumber: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.searchVerse(
        params.translationId,
        params.bookId,
        params.chapterId,
        params.verseNumber
      );
    },
    retry: 1,
  });
}
