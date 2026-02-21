import { traditions } from '@/data/passages';
import { traditionConfigs, fetchBibleChapter, fetchQuranSurah, fetchSefariaText, type TextEntry } from '@/lib/sacred-apis';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{ tradition: string; book: string }>;
  searchParams: Promise<{ chapter?: string }>;
}

async function fetchTexts(traditionKey: string, bookId: string, chapter: number): Promise<TextEntry[]> {
  const config = traditionConfigs[traditionKey];
  if (!config) return [];

  switch (config.apiType) {
    case 'bible': {
      // bookId is like "genesis", need to titlecase
      const bookName = decodeURIComponent(bookId).replace(/([a-z])([A-Z])/g, '$1 $2');
      // Map common IDs back to names
      const nameMap: Record<string, string> = {
        '1samuel': '1 Samuel', '2samuel': '2 Samuel', '1kings': '1 Kings', '2kings': '2 Kings',
        '1chronicles': '1 Chronicles', '2chronicles': '2 Chronicles',
        '1corinthians': '1 Corinthians', '2corinthians': '2 Corinthians',
        '1thessalonians': '1 Thessalonians', '2thessalonians': '2 Thessalonians',
        '1timothy': '1 Timothy', '2timothy': '2 Timothy',
        '1peter': '1 Peter', '2peter': '2 Peter',
        '1john': '1 John', '2john': '2 John', '3john': '3 John',
        'songofsolomon': 'Song of Solomon',
      };
      const name = nameMap[bookId] || bookName.charAt(0).toUpperCase() + bookName.slice(1);
      return fetchBibleChapter(name, chapter);
    }
    case 'quran': {
      const surahNum = parseInt(bookId.replace('surah-', ''));
      return fetchQuranSurah(surahNum);
    }
    case 'sefaria': {
      const ref = `${decodeURIComponent(bookId)}.${chapter}`;
      return fetchSefariaText(ref);
    }
    default:
      return [];
  }
}

export default async function BookPage({ params, searchParams }: Props) {
  const { tradition: traditionKey, book: bookId } = await params;
  const { chapter: chapterParam } = await searchParams;
  const chapter = parseInt(chapterParam || '1');

  const tradition = traditions.find(t => t.key === traditionKey);
  if (!tradition) notFound();

  const config = traditionConfigs[traditionKey];
  if (!config) notFound();

  const texts = await fetchTexts(traditionKey, bookId, chapter);
  const bookName = decodeURIComponent(bookId).replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
  const displayName = bookName.charAt(0).toUpperCase() + bookName.slice(1);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Header */}
      <div className="border-b border-[var(--gold)]/10 bg-white/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href={`/library/${traditionKey}`} className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors flex items-center gap-1">
            ← {tradition.name}
          </Link>
          <div className="flex items-center gap-2">
            <span>{tradition.emoji}</span>
            <span className="font-display font-bold text-sm text-[var(--text-primary)]">{displayName}</span>
          </div>
          <div className="flex items-center gap-2">
            {chapter > 1 && (
              <Link href={`/library/${traditionKey}/${bookId}?chapter=${chapter - 1}`} className="px-2 py-1 text-xs rounded bg-[var(--cream-warm)] text-[var(--text-muted)] hover:text-[var(--gold)]">
                ← Prev
              </Link>
            )}
            <span className="text-xs text-[var(--text-muted)]">Ch. {chapter}</span>
            <Link href={`/library/${traditionKey}/${bookId}?chapter=${chapter + 1}`} className="px-2 py-1 text-xs rounded bg-[var(--cream-warm)] text-[var(--text-muted)] hover:text-[var(--gold)]">
              Next →
            </Link>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
          {displayName} {config.apiType !== 'quran' ? `— Chapter ${chapter}` : ''}
        </h1>
        <div className="section-divider mb-8 max-w-[100px]"><span className="text-[var(--gold)] text-xs">✦</span></div>

        {texts.length > 0 ? (
          <div className="space-y-4">
            {texts.map((entry) => (
              <div key={entry.id} className="group">
                <div className="flex gap-3">
                  <span className="text-xs font-bold text-[var(--gold)] mt-1 min-w-[2rem] text-right opacity-40 group-hover:opacity-100 transition-opacity">
                    {entry.verse || ''}
                  </span>
                  <p className="font-sacred text-lg text-[var(--text-primary)] leading-relaxed flex-1">
                    {entry.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)]">
              {config.apiType === 'bible' ? `Loading ${displayName} Chapter ${chapter}...` : 'No text available for this section.'}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Try a different chapter or check back soon.
            </p>
          </div>
        )}

        {/* Chapter navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
          {chapter > 1 ? (
            <Link href={`/library/${traditionKey}/${bookId}?chapter=${chapter - 1}`} className="btn-secondary !py-2 !px-4 !text-xs">
              ← Chapter {chapter - 1}
            </Link>
          ) : <div />}
          <Link href={`/library/${traditionKey}`} className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)]">
            All {tradition.name} texts
          </Link>
          <Link href={`/library/${traditionKey}/${bookId}?chapter=${chapter + 1}`} className="btn-secondary !py-2 !px-4 !text-xs">
            Chapter {chapter + 1} →
          </Link>
        </div>
      </div>
    </div>
  );
}
