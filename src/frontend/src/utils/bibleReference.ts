import type { BibleBook, BibleChapter } from '../backend';

export interface ReferenceValidation {
  isValid: boolean;
  error?: string;
}

export interface CompactReferenceValidation extends ReferenceValidation {
  book?: BibleBook;
  chapter?: BibleChapter;
}

export function parseReference(verseNumber: string): ReferenceValidation {
  const trimmed = verseNumber.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Verse number cannot be empty.' };
  }

  // Check if it's a valid number
  const num = parseInt(trimmed, 10);
  if (isNaN(num) || num < 1) {
    return { isValid: false, error: 'Verse number must be a positive number.' };
  }

  // Check if the string contains only digits
  if (!/^\d+$/.test(trimmed)) {
    return { isValid: false, error: 'Verse number must contain only digits.' };
  }

  return { isValid: true };
}

export function parseCompactReference(
  reference: string,
  books: BibleBook[],
  chapters: BibleChapter[]
): CompactReferenceValidation {
  const trimmed = reference.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Reference cannot be empty.' };
  }

  // Match patterns like "John 2", "Matthew 5", "Mark 1", "1 John 3"
  const match = trimmed.match(/^(\d?\s*[a-zA-Z]+)\s+(\d+)$/i);
  
  if (!match) {
    return { 
      isValid: false, 
      error: 'Invalid format. Use "Book Chapter" (e.g., "John 2" or "Matthew 5").' 
    };
  }

  const bookName = match[1].trim();
  const chapterNum = match[2].trim();

  // Find matching book (case-insensitive, partial match)
  const normalizedBookName = bookName.toLowerCase();
  const matchingBook = books.find(
    (b) =>
      b.name.toLowerCase() === normalizedBookName ||
      b.abbreviation.toLowerCase() === normalizedBookName ||
      b.name.toLowerCase().startsWith(normalizedBookName)
  );

  if (!matchingBook) {
    return { 
      isValid: false, 
      error: `Book "${bookName}" not found. Check spelling or try the full name.` 
    };
  }

  // Find matching chapter
  const matchingChapter = chapters.find(
    (c) => c.bookId === matchingBook.id && c.number === chapterNum
  );

  if (!matchingChapter) {
    return { 
      isValid: false, 
      error: `Chapter ${chapterNum} not found in ${matchingBook.name}.` 
    };
  }

  return { 
    isValid: true, 
    book: matchingBook, 
    chapter: matchingChapter 
  };
}

export function normalizeBookName(bookName: string): string {
  return bookName.trim().toLowerCase();
}
