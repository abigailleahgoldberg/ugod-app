import { traditions } from '@/data/passages';
import { traditionConfigs, type BookEntry } from '@/lib/sacred-apis';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{ tradition: string }>;
}

export async function generateStaticParams() {
  return traditions.map(t => ({ tradition: t.key }));
}

export default async function TraditionPage({ params }: Props) {
  const { tradition: traditionKey } = await params;
  const tradition = traditions.find(t => t.key === traditionKey);
  if (!tradition) notFound();

  const config = traditionConfigs[traditionKey];
  let books: BookEntry[] = [];

  if (config) {
    try {
      books = await config.fetchBooks();
    } catch {
      books = [];
    }
  }

  const hasApi = !!config;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/library" className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 text-sm mb-6 transition-colors">
            ← Back to Library
          </Link>
          <div className="text-6xl sm:text-7xl mb-4">{tradition.emoji}</div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-3">{tradition.name}</h1>
          <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto mb-6">{tradition.description}</p>

          {config && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {config.features.map(f => (
                <span key={f} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60">{f}</span>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-6 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-[var(--gold)]">{books.length || tradition.textCount}+</p>
              <p className="text-white/30 text-xs mt-1">Texts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[var(--gold)]">{tradition.passageCount.toLocaleString()}</p>
              <p className="text-white/30 text-xs mt-1">Passages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {hasApi && books.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
                Browse {tradition.name} Texts
              </h2>
              <p className="text-[var(--text-secondary)] text-sm">
                {config.description}
              </p>
            </div>

            {/* Group by description (Testament, category, etc) */}
            {(() => {
              const groups: Record<string, BookEntry[]> = {};
              books.forEach(b => {
                const group = b.description || 'Texts';
                if (!groups[group]) groups[group] = [];
                groups[group].push(b);
              });
              return Object.entries(groups).map(([groupName, groupBooks]) => (
                <div key={groupName} className="mb-10">
                  <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: tradition.color }}>
                    {groupName}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {groupBooks.map(book => (
                      <Link
                        key={book.id}
                        href={`/library/${traditionKey}/${encodeURIComponent(book.id)}`}
                        className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-[var(--gold)]/30 hover:shadow-md transition-all"
                      >
                        <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{tradition.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[var(--text-primary)] truncate">{book.name}</p>
                          {book.chapters && (
                            <p className="text-xs text-[var(--text-muted)]">{book.chapters} {traditionKey === 'islam' ? 'ayahs' : 'chapters'}</p>
                          )}
                        </div>
                        <span className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </>
        ) : (
          /* Coming Soon state for traditions without API integration yet */
          <div className="text-center py-16">
            <div className="text-6xl mb-6">{tradition.emoji}</div>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
              {tradition.name} Library — Coming Soon
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
              We&apos;re building the {tradition.name} collection. {tradition.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--cream-warm)] border border-[var(--gold)]/10">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse"></span>
              <span className="text-xs font-medium text-[var(--text-muted)]">Actively importing texts</span>
            </div>

            {/* Show sample passages from this tradition */}
            <div className="mt-12 max-w-2xl mx-auto text-left">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-4">
                Preview Passages
              </p>
              <div className="space-y-4">
                {/* Import featured passages for this tradition */}
              </div>
            </div>
          </div>
        )}

        {/* Back to library */}
        <div className="text-center mt-12 pt-8 border-t border-gray-100">
          <Link href="/library" className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
            ← Back to all traditions
          </Link>
        </div>
      </section>
    </div>
  );
}
