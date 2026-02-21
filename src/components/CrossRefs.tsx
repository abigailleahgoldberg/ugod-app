'use client';
import { useMemo } from 'react';
import { findCrossRefs } from '@/lib/cross-refs';

interface Props {
  traditionKey: string;
  texts: string[];
}

export function CrossRefs({ traditionKey, texts }: Props) {
  const refs = useMemo(() => {
    const combined = texts.join(' ');
    return findCrossRefs(traditionKey, combined);
  }, [traditionKey, texts]);

  if (refs.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-[var(--gold)]/10">
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-4">
        ✦ Connected Across Traditions
      </p>
      {refs.map(cr => (
        <div key={cr.theme} className="mb-6">
          <p className="text-xs font-semibold text-[var(--text-primary)] mb-3">{cr.theme}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cr.passages.slice(0, 4).map(p => (
              <a
                key={p.reference}
                href={p.url}
                className="flex gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:border-[var(--gold)]/30 transition-colors group"
              >
                <span className="text-lg shrink-0">{p.emoji}</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-wider uppercase text-[var(--text-muted)] mb-0.5">{p.reference}</p>
                  <p className="font-sacred text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    &ldquo;{p.snippet}&rdquo;
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
