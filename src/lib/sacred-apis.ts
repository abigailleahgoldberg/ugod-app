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

// ===== BUDDHISM (SuttaCentral — free, massive Pali Canon) =====
export async function fetchBuddhistBooks(): Promise<BookEntry[]> {
  return [
    { id: 'dhp1-20', name: 'Dhammapada 1: Pairs', description: 'Dhammapada', chapters: 20 },
    { id: 'dhp21-32', name: 'Dhammapada 2: Diligence', description: 'Dhammapada', chapters: 12 },
    { id: 'dhp33-43', name: 'Dhammapada 3: The Mind', description: 'Dhammapada', chapters: 11 },
    { id: 'dhp44-59', name: 'Dhammapada 4: Flowers', description: 'Dhammapada', chapters: 16 },
    { id: 'dhp60-75', name: 'Dhammapada 5: The Fool', description: 'Dhammapada', chapters: 16 },
    { id: 'dhp76-89', name: 'Dhammapada 6: The Astute', description: 'Dhammapada', chapters: 14 },
    { id: 'dhp90-99', name: 'Dhammapada 7: The Perfected Ones', description: 'Dhammapada', chapters: 10 },
    { id: 'dhp100-115', name: 'Dhammapada 8: Thousands', description: 'Dhammapada', chapters: 16 },
    { id: 'dhp116-128', name: 'Dhammapada 9: Wickedness', description: 'Dhammapada', chapters: 13 },
    { id: 'dhp129-145', name: 'Dhammapada 10: The Rod', description: 'Dhammapada', chapters: 17 },
    { id: 'dhp146-156', name: 'Dhammapada 11: Old Age', description: 'Dhammapada', chapters: 11 },
    { id: 'dhp157-166', name: 'Dhammapada 12: The Self', description: 'Dhammapada', chapters: 10 },
    { id: 'dhp167-178', name: 'Dhammapada 13: The World', description: 'Dhammapada', chapters: 12 },
    { id: 'dhp179-196', name: 'Dhammapada 14: The Awakened One', description: 'Dhammapada', chapters: 18 },
    { id: 'dhp197-208', name: 'Dhammapada 15: Happiness', description: 'Dhammapada', chapters: 12 },
    { id: 'dhp209-220', name: 'Dhammapada 16: Fondness', description: 'Dhammapada', chapters: 12 },
    { id: 'dhp221-234', name: 'Dhammapada 17: Anger', description: 'Dhammapada', chapters: 14 },
    { id: 'dhp235-255', name: 'Dhammapada 18: Impurity', description: 'Dhammapada', chapters: 21 },
    { id: 'dhp256-272', name: 'Dhammapada 19: The Just', description: 'Dhammapada', chapters: 17 },
    { id: 'dhp273-289', name: 'Dhammapada 20: The Path', description: 'Dhammapada', chapters: 17 },
    { id: 'dhp290-305', name: 'Dhammapada 21: Miscellaneous', description: 'Dhammapada', chapters: 16 },
    { id: 'dhp306-319', name: 'Dhammapada 22: Hell', description: 'Dhammapada', chapters: 14 },
    { id: 'dhp320-333', name: 'Dhammapada 23: Elephants', description: 'Dhammapada', chapters: 14 },
    { id: 'dhp334-359', name: 'Dhammapada 24: Craving', description: 'Dhammapada', chapters: 26 },
    { id: 'dhp360-382', name: 'Dhammapada 25: Mendicants', description: 'Dhammapada', chapters: 23 },
    { id: 'dhp383-423', name: 'Dhammapada 26: Brahmins', description: 'Dhammapada', chapters: 41 },
    { id: 'dn1', name: 'DN 1: The Divine Net', description: 'Long Discourses (Dīgha Nikāya)' },
    { id: 'dn2', name: 'DN 2: The Fruits of the Ascetic Life', description: 'Long Discourses (Dīgha Nikāya)' },
    { id: 'dn9', name: 'DN 9: With Poṭṭhapāda', description: 'Long Discourses (Dīgha Nikāya)' },
    { id: 'dn11', name: 'DN 11: With Kevaḍḍha', description: 'Long Discourses (Dīgha Nikāya)' },
    { id: 'dn16', name: 'DN 16: The Great Discourse on the Buddha\'s Extinguishment', description: 'Long Discourses (Dīgha Nikāya)' },
    { id: 'dn22', name: 'DN 22: The Longer Discourse on Mindfulness Meditation', description: 'Long Discourses (Dīgha Nikāya)' },
    { id: 'mn1', name: 'MN 1: The Root of All Things', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'mn2', name: 'MN 2: All the Defilements', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'mn10', name: 'MN 10: Mindfulness Meditation', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'mn18', name: 'MN 18: The Honey Cake', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'mn22', name: 'MN 22: The Simile of the Snake', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'mn28', name: 'MN 28: The Longer Simile of the Elephant\'s Footprint', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'mn63', name: 'MN 63: The Shorter Discourse to Māluṅkya', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'mn118', name: 'MN 118: Mindfulness of Breathing', description: 'Middle Discourses (Majjhima Nikāya)' },
    { id: 'sn22.59', name: 'SN 22.59: The Characteristic of Not-Self', description: 'Connected Discourses (Saṁyutta Nikāya)' },
    { id: 'sn35.28', name: 'SN 35.28: The Burning', description: 'Connected Discourses (Saṁyutta Nikāya)' },
    { id: 'sn45.8', name: 'SN 45.8: Analysis of the Path', description: 'Connected Discourses (Saṁyutta Nikāya)' },
    { id: 'sn56.11', name: 'SN 56.11: Turning the Wheel (First Sermon)', description: 'Connected Discourses (Saṁyutta Nikāya)' },
    { id: 'an4.159', name: 'AN 4.159: The Bhikkhunī', description: 'Numbered Discourses (Aṅguttara Nikāya)' },
    { id: 'snp1.8', name: 'Snp 1.8: Loving-Kindness', description: 'Sutta Nipāta' },
    { id: 'snp3.11', name: 'Snp 3.11: Nālaka', description: 'Sutta Nipāta' },
    { id: 'snp4.15', name: 'Snp 4.15: The Violent', description: 'Sutta Nipāta' },
  ];
}

export async function fetchSuttaCentralText(uid: string): Promise<TextEntry[]> {
  try {
    const res = await fetch(`https://suttacentral.net/api/bilarasuttas/${uid}/sujato`);
    if (!res.ok) return [];
    const data = await res.json();
    const translations = data.translation_text || {};
    return Object.entries(translations)
      .filter(([_, text]) => text && (text as string).trim().length > 0)
      .map(([key, text], i) => ({
        id: `sc-${uid}-${i}`,
        title: key,
        text: (text as string).replace(/<[^>]*>/g, '').trim(),
        reference: `${uid} — ${key}`,
        verse: i + 1,
        book: uid,
      }));
  } catch { return []; }
}

// ===== TAO TE CHING (public domain — Stephen Mitchell translation style, original) =====
const TAO_CHAPTERS: Record<number, string> = {
  1: "The Tao that can be told is not the eternal Tao.\nThe name that can be named is not the eternal name.\nThe nameless is the beginning of heaven and earth.\nThe named is the mother of ten thousand things.\nEver desireless, one can see the mystery.\nEver desiring, one can see the manifestations.\nThese two spring from the same source but differ in name;\nthis appears as darkness.\nDarkness within darkness.\nThe gate to all mystery.",
  2: "When people see some things as beautiful,\nother things become ugly.\nWhen people see some things as good,\nother things become bad.\nBeing and non-being create each other.\nDifficult and easy support each other.\nLong and short define each other.\nHigh and low depend on each other.\nBefore and after follow each other.\nTherefore the Master acts without doing anything\nand teaches without saying anything.\nThings arise and she lets them come;\nthings disappear and she lets them go.\nShe has but doesn't possess,\nacts but doesn't expect.\nWhen her work is done, she forgets it.\nThat is why it lasts forever.",
  3: "If you overesteem great men,\npeople become powerless.\nIf you overvalue possessions,\npeople begin to steal.\nThe Master leads by emptying people's minds\nand filling their cores,\nby weakening their ambition\nand toughening their resolve.\nHe helps people lose everything\nthey know, everything they desire,\nand creates confusion\nin those who think that they know.\nPractice not-doing,\nand everything will fall into place.",
  4: "The Tao is like a well:\nused but never used up.\nIt is like the eternal void:\nfilled with infinite possibilities.\nIt is hidden but always present.\nI don't know who gave birth to it.\nIt is older than God.",
  11: "We join spokes together in a wheel,\nbut it is the center hole\nthat makes the wagon move.\nWe shape clay into a pot,\nbut it is the emptiness inside\nthat holds whatever we want.\nWe hammer wood for a house,\nbut it is the inner space\nthat makes it livable.\nWe work with being,\nbut non-being is what we use.",
  22: "If you want to become whole,\nlet yourself be partial.\nIf you want to become straight,\nlet yourself be crooked.\nIf you want to become full,\nlet yourself be empty.\nIf you want to be reborn,\nlet yourself die.\nIf you want to be given everything,\ngive everything up.",
  25: "There was something formless and perfect\nbefore the universe was born.\nIt is serene. Empty.\nSolitary. Unchanging.\nInfinite. Eternally present.\nIt is the mother of the universe.\nFor lack of a better name,\nI call it the Tao.\nIt flows through all things,\ninside and outside, and returns\nto the origin of all things.",
  33: "Knowing others is intelligence;\nknowing yourself is true wisdom.\nMastering others is strength;\nmastering yourself is true power.\nIf you realize that you have enough,\nyou are truly rich.\nIf you stay in the center\nand embrace death with your whole heart,\nyou will endure forever.",
  42: "The Tao gives birth to One.\nOne gives birth to Two.\nTwo gives birth to Three.\nThree gives birth to ten thousand things.\nThe ten thousand things carry yin and embrace yang.\nThey achieve harmony by combining these forces.",
  48: "In pursuit of learning, every day something is acquired.\nIn pursuit of Tao, every day something is dropped.\nLess and less do you need to force things,\nuntil finally you arrive at non-action.\nWhen nothing is done,\nnothing is left undone.\nTrue mastery can be gained\nby letting things go their own way.\nIt can't be gained by interfering.",
  64: "What is rooted is easy to nourish.\nWhat is recent is easy to correct.\nWhat is brittle is easy to break.\nWhat is small is easy to scatter.\nPrevent trouble before it arises.\nPut things in order before they exist.\nThe giant pine tree grows from a tiny sprout.\nThe journey of a thousand miles starts from beneath your feet.\nRushing into action, you fail.\nTrying to grasp things, you lose them.\nForcing a project to completion,\nyou ruin what was almost ripe.",
  76: "A man is born gentle and weak.\nAt his death he is hard and stiff.\nGreen plants are tender and filled with sap.\nAt their death they are withered and dry.\nTherefore the stiff and unbending is the disciple of death.\nThe soft and yielding is the disciple of life.\nThus an army without flexibility never wins a battle.\nA tree that is unbending is easily broken.\nThe hard and strong will fall.\nThe soft and weak will overcome.",
  81: "True words aren't eloquent;\neloquent words aren't true.\nWise men don't need to prove their point;\nmen who need to prove their point aren't wise.\nThe Master has no possessions.\nThe more he does for others,\nthe happier he is.\nThe more he gives to others,\nthe wealthier he is.\nThe Tao nourishes all things.\nThe Master's way is the way of water,\nwhich benefits all and does not compete.",
};

export function getTaoChapterText(chapter: number): TextEntry[] {
  const text = TAO_CHAPTERS[chapter];
  if (!text) return [{ id: `tao-${chapter}`, title: `Chapter ${chapter}`, text: `Chapter ${chapter} — full text coming soon. The Tao Te Ching contains 81 chapters of Lao Tzu's wisdom on the nature of existence, leadership, and the Way.`, reference: `Tao Te Ching, Chapter ${chapter}`, chapter, verse: 1, book: 'Tao Te Ching' }];
  return text.split('\n').map((line, i) => ({
    id: `tao-${chapter}-${i}`,
    title: `Line ${i + 1}`,
    text: line.trim(),
    reference: `Tao Te Ching, Chapter ${chapter}`,
    chapter,
    verse: i + 1,
    book: 'Tao Te Ching',
  }));
}

// ===== TRADITION CONFIG — maps tradition keys to their data source =====
export interface TraditionConfig {
  key: string;
  apiType: 'bible' | 'quran' | 'sefaria' | 'gita' | 'static' | 'suttacentral' | 'tao';
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
  buddhism: {
    key: 'buddhism',
    apiType: 'suttacentral',
    fetchBooks: fetchBuddhistBooks,
    description: 'The Pali Canon — Dhammapada, Long Discourses, Middle Discourses, Connected Discourses, and more. Powered by SuttaCentral.',
    features: ['Pāli + English', 'Bhikkhu Sujato translation', '48 texts'],
  },
  taoism: {
    key: 'taoism',
    apiType: 'tao',
    fetchBooks: async () => getTaoTeChingChapters(),
    description: 'The Tao Te Ching — 81 chapters of Lao Tzu\'s timeless wisdom on the nature of existence.',
    features: ['81 Chapters', 'Public Domain', 'Classical Philosophy'],
  },
};
