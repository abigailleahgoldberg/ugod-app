// Sacred Text API integrations — all free, no keys required

export interface TextEntry {
  id: string;
  title: string;
  text: string;
  reference: string;
  chapter?: number;
  verse?: number;
  book?: string;
}

export interface BookEntry {
  id: string;
  name: string;
  chapters?: number;
  description?: string;
}

// ===== BIBLE (bible-api.com — free, no key) =====
export async function fetchBibleBooks(): Promise<BookEntry[]> {
  const books = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
    '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther',
    'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
    'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
    'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum',
    'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
    'Matthew', 'Mark', 'Luke', 'John', 'Acts',
    'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
    'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
    '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
    'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
    'Jude', 'Revelation',
  ];
  return books.map((name, i) => ({ id: name.toLowerCase().replace(/\s+/g, ''), name, description: i < 39 ? 'Old Testament' : 'New Testament' }));
}

export async function fetchBibleChapter(book: string, chapter: number): Promise<TextEntry[]> {
  try {
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(book)}+${chapter}?translation=kjv`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.verses) return [];
    return data.verses.map((v: any) => ({
      id: `bible-${book}-${chapter}-${v.verse}`,
      title: `${book} ${chapter}:${v.verse}`,
      text: v.text?.trim() || '',
      reference: `${book} ${chapter}:${v.verse}`,
      chapter,
      verse: v.verse,
      book,
    }));
  } catch { return []; }
}

// ===== QURAN (alquran.cloud — free) =====
export async function fetchQuranSurahs(): Promise<BookEntry[]> {
  try {
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).map((s: any) => ({
      id: `surah-${s.number}`,
      name: `${s.number}. ${s.englishName} (${s.name})`,
      chapters: s.numberOfAyahs,
      description: `${s.englishNameTranslation} — ${s.revelationType}`,
    }));
  } catch { return []; }
}

export async function fetchQuranSurah(number: number): Promise<TextEntry[]> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/en.asad`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data?.ayahs || []).map((a: any) => ({
      id: `quran-${number}-${a.numberInSurah}`,
      title: `Ayah ${a.numberInSurah}`,
      text: a.text?.trim() || '',
      reference: `Surah ${data.data.englishName} ${number}:${a.numberInSurah}`,
      chapter: number,
      verse: a.numberInSurah,
      book: data.data.englishName,
    }));
  } catch { return []; }
}

// ===== TORAH/JEWISH (Sefaria — free, massive) =====
export async function fetchSefariaBooks(): Promise<BookEntry[]> {
  // Major categories from Sefaria
  const books = [
    { id: 'Genesis', name: 'Genesis (Bereishit)', description: 'Torah' },
    { id: 'Exodus', name: 'Exodus (Shemot)', description: 'Torah' },
    { id: 'Leviticus', name: 'Leviticus (Vayikra)', description: 'Torah' },
    { id: 'Numbers', name: 'Numbers (Bamidbar)', description: 'Torah' },
    { id: 'Deuteronomy', name: 'Deuteronomy (Devarim)', description: 'Torah' },
    { id: 'Psalms', name: 'Psalms (Tehillim)', description: 'Writings' },
    { id: 'Proverbs', name: 'Proverbs (Mishlei)', description: 'Writings' },
    { id: 'Ecclesiastes', name: 'Ecclesiastes (Kohelet)', description: 'Writings' },
    { id: 'Song_of_Songs', name: 'Song of Songs (Shir HaShirim)', description: 'Writings' },
    { id: 'Isaiah', name: 'Isaiah (Yeshayahu)', description: 'Prophets' },
    { id: 'Jeremiah', name: 'Jeremiah (Yirmeyahu)', description: 'Prophets' },
    { id: 'Pirkei_Avot', name: 'Pirkei Avot (Ethics of the Fathers)', description: 'Mishnah' },
    { id: 'Zohar', name: 'Zohar', description: 'Kabbalah' },
  ];
  return books;
}

export async function fetchSefariaText(ref: string): Promise<TextEntry[]> {
  try {
    const res = await fetch(`https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0`);
    if (!res.ok) return [];
    const data = await res.json();
    const texts: string[] = Array.isArray(data.text) ? data.text.flat(3) : [data.text];
    return texts.filter(Boolean).map((t: string, i: number) => ({
      id: `sefaria-${ref}-${i}`,
      title: `${ref.replace(/_/g, ' ')} ${i + 1}`,
      text: t.replace(/<[^>]*>/g, '').trim(),
      reference: `${ref.replace(/_/g, ' ')} ${i + 1}`,
      verse: i + 1,
      book: ref.split('.')[0]?.replace(/_/g, ' '),
    }));
  } catch { return []; }
}

// ===== BHAGAVAD GITA (bhagavadgitaapi.in — free) =====
export async function fetchGitaChapters(): Promise<BookEntry[]> {
  return Array.from({ length: 18 }, (_, i) => ({
    id: `gita-${i + 1}`,
    name: `Chapter ${i + 1}`,
    description: [
      'Arjuna\'s Dilemma', 'Sankhya Yoga', 'Karma Yoga', 'Jnana Yoga',
      'Karma Sanyasa Yoga', 'Dhyana Yoga', 'Jnana Vijnana Yoga', 'Aksara Brahma Yoga',
      'Raja Vidya Raja Guhya Yoga', 'Vibhuti Yoga', 'Vishvarupa Darshana Yoga', 'Bhakti Yoga',
      'Ksetra Ksetrajna Vibhaga Yoga', 'Gunatraya Vibhaga Yoga', 'Purushottama Yoga',
      'Daivasura Sampad Vibhaga Yoga', 'Sraddhatraya Vibhaga Yoga', 'Moksha Sanyasa Yoga',
    ][i],
  }));
}

// ===== TAO TE CHING (static — public domain) =====
export function getTaoTeChingChapters(): BookEntry[] {
  return Array.from({ length: 81 }, (_, i) => ({
    id: `tao-${i + 1}`,
    name: `Chapter ${i + 1}`,
    description: 'Tao Te Ching — Lao Tzu',
  }));
}

// ===== TRADITION CONFIG — maps tradition keys to their data source =====
export interface TraditionConfig {
  key: string;
  apiType: 'bible' | 'quran' | 'sefaria' | 'gita' | 'static';
  fetchBooks: () => Promise<BookEntry[]>;
  description: string;
  features: string[];
}

export const traditionConfigs: Record<string, TraditionConfig> = {
  judaism: {
    key: 'judaism',
    apiType: 'sefaria',
    fetchBooks: fetchSefariaBooks,
    description: 'Torah, Talmud, Psalms, Prophets, and Kabbalah — powered by Sefaria\'s open library.',
    features: ['Hebrew + English', 'Commentary', 'Cross-references'],
  },
  christianity: {
    key: 'christianity',
    apiType: 'bible',
    fetchBooks: fetchBibleBooks,
    description: 'The complete Bible — Old and New Testament, King James Version.',
    features: ['KJV Translation', '66 Books', 'Verse-by-verse'],
  },
  islam: {
    key: 'islam',
    apiType: 'quran',
    fetchBooks: fetchQuranSurahs,
    description: 'The Holy Quran — 114 Surahs with English translation by Muhammad Asad.',
    features: ['Arabic + English', '114 Surahs', '6,236 Ayahs'],
  },
  hinduism: {
    key: 'hinduism',
    apiType: 'gita',
    fetchBooks: fetchGitaChapters,
    description: 'The Bhagavad Gita — 18 chapters of divine dialogue between Krishna and Arjuna.',
    features: ['Sanskrit + English', '18 Chapters', '700 Verses'],
  },
  taoism: {
    key: 'taoism',
    apiType: 'static',
    fetchBooks: async () => getTaoTeChingChapters(),
    description: 'The Tao Te Ching — 81 chapters of Lao Tzu\'s timeless wisdom.',
    features: ['81 Chapters', 'Multiple translations', 'Commentary'],
  },
};
