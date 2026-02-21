'use client';
import { useState, useEffect } from 'react';
import { getBookmarks, removeBookmark, getProgress, type Bookmark, type ReadingProgress } from '@/lib/bookmarks';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [progress, setProgress] = useState<ReadingProgress[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setProgress(getProgress());
  }, []);

  const handleRemove = (id: string) => {
    removeBookmark(id);
    setBookmarks(getBookmarks());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">Your Library</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8">Bookmarked verses and reading progress. Stored locally in your browser.</p>

      {/* Reading Progress */}
      {progress.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-4">📖 Continue Reading</h2>
          <div className="grid gap-2">
            {progress.slice(0, 5).map(p => (
              <a key={`${p.traditionKey}-${p.bookId}`} href={`/library/${p.traditionKey}/${p.bookId}?chapter=${p.chapter}`}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 hover:border-[var(--gold)]/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{p.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">Last read {new Date(p.lastRead).toLocaleDateString()}</p>
                </div>
                <span className="text-xs text-[var(--gold)]">Resume →</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Bookmarks */}
      <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-4">⭐ Bookmarked Verses ({bookmarks.length})</h2>
      {bookmarks.length > 0 ? (
        <div className="space-y-3">
          {bookmarks.map(b => (
            <div key={b.id} className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--text-muted)]">{b.emoji} {b.reference}</span>
                <button onClick={() => handleRemove(b.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
              </div>
              <a href={b.url}>
                <p className="font-sacred text-base text-[var(--text-primary)] leading-relaxed">
                  &ldquo;{b.text}&rdquo;
                </p>
              </a>
              <p className="text-[10px] text-[var(--text-muted)] mt-2">Saved {new Date(b.savedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-4xl mb-3">⭐</p>
          <p className="text-[var(--text-secondary)]">No bookmarks yet</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Hover over any verse and tap ☆ to save it</p>
          <a href="/library" className="inline-block mt-4 text-sm text-[var(--gold)] hover:underline">Browse the library →</a>
        </div>
      )}
    </div>
  );
}
