import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  id: string;
  text: string;
  reference: string;
  tradition: string;
  traditionKey: string;
  emoji: string;
  color: string;
  book?: string;
  url: string;
}

// Bible search via bible-api.com
async function searchBible(query: string): Promise<SearchResult[]> {
  // Search key passages by keyword in well-known books
  const searchBooks = [
    'Genesis 1', 'Exodus 20', 'Psalms 23', 'Psalms 1', 'Psalms 91', 'Psalms 119',
    'Proverbs 3', 'Proverbs 4', 'Proverbs 31', 'Ecclesiastes 3',
    'Isaiah 40', 'Isaiah 53', 'Jeremiah 29',
    'Matthew 5', 'Matthew 6', 'Matthew 7', 'Matthew 22',
    'John 1', 'John 3', 'John 14', 'John 15',
    'Romans 8', 'Romans 12', '1 Corinthians 13',
    'Galatians 5', 'Ephesians 6', 'Philippians 4',
    'James 1', '1 Peter 5', 'Revelation 21',
  ];

  const results: SearchResult[] = [];
  const q = query.toLowerCase();

  // Fetch a few key chapters in parallel
  const fetches = searchBooks.slice(0, 8).map(async (ref) => {
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=kjv`, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.verses || [])
        .filter((v: any) => v.text?.toLowerCase().includes(q))
        .slice(0, 3)
        .map((v: any) => ({
          id: `bible-${ref}-${v.verse}`,
          text: v.text?.trim(),
          reference: `${v.book_name} ${v.chapter}:${v.verse}`,
          tradition: 'Christianity',
          traditionKey: 'christianity',
          emoji: '✝️',
          color: '#8b2332',
          book: v.book_name,
          url: `/library/christianity/${v.book_name?.toLowerCase().replace(/\s+/g, '')}?chapter=${v.chapter}`,
        }));
    } catch { return []; }
  });

  const allResults = await Promise.all(fetches);
  allResults.forEach(r => results.push(...r));
  return results.slice(0, 10);
}

// Quran search via alquran.cloud
async function searchQuran(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en.asad`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data?.matches || []).slice(0, 10).map((m: any) => ({
      id: `quran-${m.surah.number}-${m.numberInSurah}`,
      text: m.text?.trim(),
      reference: `Surah ${m.surah.englishName} ${m.surah.number}:${m.numberInSurah}`,
      tradition: 'Islam',
      traditionKey: 'islam',
      emoji: '☪️',
      color: '#1a7a4c',
      book: m.surah.englishName,
      url: `/library/islam/surah-${m.surah.number}`,
    }));
  } catch { return []; }
}

// Sefaria search (Jewish texts)
async function searchSefaria(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(`https://www.sefaria.org/api/search-wrapper/text/${encodeURIComponent(query)}?size=10&applied_filters=[]`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.hits?.hits || []).slice(0, 10).map((hit: any) => {
      const src = hit._source || {};
      const ref = src.ref || '';
      const text = (src.exact || src.naive_lemmatizer || '').replace(/<[^>]*>/g, '').trim();
      return {
        id: `sefaria-${ref}`,
        text: text.slice(0, 400),
        reference: ref,
        tradition: 'Judaism',
        traditionKey: 'judaism',
        emoji: '✡️',
        color: '#2a5db0',
        book: ref.split(' ')[0],
        url: `/library/judaism/${encodeURIComponent(ref.split(' ')[0])}`,
      };
    }).filter((r: SearchResult) => r.text.length > 0);
  } catch { return []; }
}

// Bhagavad Gita search (keyword match against cached verses)
async function searchGita(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const q = query.toLowerCase();
  // Fetch a few key chapters
  const chapters = [2, 3, 4, 9, 12, 18];
  const fetches = chapters.map(async (ch) => {
    try {
      const res = await fetch(`https://bhagavadgitaapi.in/slok/${ch}/1`, { next: { revalidate: 86400 } });
      // This API is per-verse, so let's check a few verses per chapter
      const verseFetches = Array.from({ length: 10 }, (_, i) =>
        fetch(`https://bhagavadgitaapi.in/slok/${ch}/${i + 1}`, { next: { revalidate: 86400 } })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null)
      );
      const verses = await Promise.all(verseFetches);
      return verses
        .filter((v: any) => v && (v.tej?.et || v.spidr?.et || '').toLowerCase().includes(q))
        .slice(0, 3)
        .map((v: any) => ({
          id: `gita-${v._id}`,
          text: (v.tej?.et || v.spidr?.et || v.transliteration || '').trim(),
          reference: `Bhagavad Gita ${v.chapter}:${v.verse}`,
          tradition: 'Hinduism',
          traditionKey: 'hinduism',
          emoji: '🕉️',
          color: '#d45c00',
          book: 'Bhagavad Gita',
          url: `/library/hinduism/gita-${v.chapter}?chapter=${v.chapter}`,
        }));
    } catch { return []; }
  });
  const allResults = await Promise.all(fetches);
  allResults.forEach(r => results.push(...r));
  return results.slice(0, 6);
}

// Buddhist search via SuttaCentral (search key Dhammapada chapters)
async function searchBuddhist(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const q = query.toLowerCase();
  const dhpChapters = ['dhp1-20', 'dhp21-32', 'dhp33-43', 'dhp44-59', 'dhp60-75', 'dhp76-89', 'dhp179-196', 'dhp273-289'];

  const fetches = dhpChapters.slice(0, 4).map(async (uid) => {
    try {
      const res = await fetch(`https://suttacentral.net/api/bilarasuttas/${uid}/sujato`, { next: { revalidate: 86400 } });
      if (!res.ok) return [];
      const data = await res.json();
      const texts = data.translation_text || {};
      return Object.entries(texts)
        .filter(([_, text]) => text && (text as string).toLowerCase().includes(q))
        .slice(0, 3)
        .map(([key, text]) => ({
          id: `sc-${uid}-${key}`,
          text: (text as string).replace(/<[^>]*>/g, '').trim(),
          reference: `Dhammapada — ${key}`,
          tradition: 'Buddhism',
          traditionKey: 'buddhism',
          emoji: '☸️',
          color: '#d4832f',
          book: 'Dhammapada',
          url: `/library/buddhism/${uid}`,
        }));
    } catch { return []; }
  });

  const allResults = await Promise.all(fetches);
  allResults.forEach(r => results.push(...r));
  return results.slice(0, 8);
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q');
  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [], query: q });
  }

  const query = q.trim();

  // Run all searches in parallel
  const [bibleResults, quranResults, sefariaResults, gitaResults, buddhistResults] = await Promise.all([
    searchBible(query).catch(() => []),
    searchQuran(query).catch(() => []),
    searchSefaria(query).catch(() => []),
    searchGita(query).catch(() => []),
    searchBuddhist(query).catch(() => []),
  ]);

  // Interleave results from different traditions for variety
  const all = [...quranResults, ...sefariaResults, ...bibleResults, ...gitaResults, ...buddhistResults];

  // Dedupe and limit
  const seen = new Set<string>();
  const unique = all.filter(r => {
    const key = r.text.slice(0, 100);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 25);

  return NextResponse.json({
    results: unique,
    query,
    traditions: {
      christianity: bibleResults.length,
      islam: quranResults.length,
      judaism: sefariaResults.length,
      hinduism: gitaResults.length,
      buddhism: buddhistResults.length,
    },
    total: unique.length,
  });
}
