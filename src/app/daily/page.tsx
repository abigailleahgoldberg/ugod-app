'use client';
import { useState, useEffect } from 'react';

interface DailyVerse {
  text: string;
  reference: string;
  tradition: string;
  traditionKey: string;
  emoji: string;
  color: string;
  url: string;
}

export default function DailyPage() {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/daily')
      .then(r => r.json())
      .then(setVerse)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-2">✦ Daily Verse</p>
          <p className="text-sm text-[var(--text-muted)]">{today}</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[var(--text-muted)]">Finding today&apos;s verse...</p>
          </div>
        ) : verse ? (
          <div className="daily-card p-8 sm:p-12">
            <div className="flex items-center justify-between mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: verse.color }}>
                {verse.emoji} {verse.tradition}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[var(--text-muted)]">{verse.reference}</span>
            </div>

            <blockquote className="font-sacred text-xl sm:text-2xl lg:text-3xl text-[var(--text-primary)] sacred-quote leading-relaxed mb-8">
              {verse.text}
            </blockquote>

            <p className="text-xs tracking-wider uppercase text-[var(--text-muted)] pl-6 mb-8">— {verse.reference}</p>

            <div className="flex gap-3 pt-6 border-t border-gray-100">
              <a href={verse.url} className="btn-primary flex-1 text-center">📖 Read More</a>
              <button onClick={() => navigator.share?.({ title: 'Daily Verse from U-God', text: `"${verse.text}" — ${verse.reference}`, url: 'https://u-god.com/daily' }).catch(() => {})} className="btn-secondary px-4">
                📤
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)]">Could not load today&apos;s verse. Try refreshing.</p>
          </div>
        )}

        <p className="text-center text-xs text-[var(--text-muted)] mt-8">
          A new verse from a different tradition every day. Wisdom rotates through Christianity, Islam, Judaism, Buddhism, and Sikhism.
        </p>
      </div>
    </div>
  );
}
