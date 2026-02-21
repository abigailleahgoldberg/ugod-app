'use client';

export interface Bookmark {
  id: string;
  text: string;
  reference: string;
  tradition: string;
  traditionKey: string;
  emoji: string;
  url: string;
  savedAt: number;
}

export interface ReadingProgress {
  traditionKey: string;
  bookId: string;
  chapter: number;
  verse: number;
  lastRead: number;
  label: string;
}

const BOOKMARKS_KEY = 'ugod-bookmarks';
const PROGRESS_KEY = 'ugod-reading-progress';

export function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
  } catch { return []; }
}

export function addBookmark(bookmark: Bookmark): void {
  const bookmarks = getBookmarks().filter(b => b.id !== bookmark.id);
  bookmarks.unshift(bookmark);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks.slice(0, 200)));
}

export function removeBookmark(id: string): void {
  const bookmarks = getBookmarks().filter(b => b.id !== id);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some(b => b.id === id);
}

export function getProgress(): ReadingProgress[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
  } catch { return []; }
}

export function saveProgress(progress: ReadingProgress): void {
  const all = getProgress().filter(p => !(p.traditionKey === progress.traditionKey && p.bookId === progress.bookId));
  all.unshift(progress);
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all.slice(0, 50)));
}

export function getLastRead(traditionKey: string, bookId: string): ReadingProgress | undefined {
  return getProgress().find(p => p.traditionKey === traditionKey && p.bookId === bookId);
}
