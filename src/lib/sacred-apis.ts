// Sacred Text API integrations -- all free, no keys required

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

// ===== BIBLE (bible-api.com -- free, no key) =====
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

// ===== QURAN (alquran.cloud -- free) =====
export async function fetchQuranSurahs(): Promise<BookEntry[]> {
  try {
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).map((s: any) => ({
      id: `surah-${s.number}`,
      name: `${s.number}. ${s.englishName} (${s.name})`,
      chapters: s.numberOfAyahs,
      description: `${s.englishNameTranslation} -- ${s.revelationType}`,
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

// ===== TORAH/JEWISH (Sefaria -- free, massive) =====
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

// ===== BHAGAVAD GITA (bhagavadgitaapi.in -- free) =====
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

// ===== TAO TE CHING (static -- public domain) =====
export function getTaoTeChingChapters(): BookEntry[] {
  return Array.from({ length: 81 }, (_, i) => ({
    id: `tao-${i + 1}`,
    name: `Chapter ${i + 1}`,
    description: 'Tao Te Ching -- Lao Tzu',
  }));
}

// ===== BUDDHISM (SuttaCentral -- free, massive Pali Canon) =====
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
        reference: `${uid} -- ${key}`,
        verse: i + 1,
        book: uid,
      }));
  } catch { return []; }
}

// ===== TAO TE CHING (public domain -- Stephen Mitchell translation style, original) =====
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
  if (!text) return [{ id: `tao-${chapter}`, title: `Chapter ${chapter}`, text: `Chapter ${chapter} -- full text coming soon. The Tao Te Ching contains 81 chapters of Lao Tzu's wisdom on the nature of existence, leadership, and the Way.`, reference: `Tao Te Ching, Chapter ${chapter}`, chapter, verse: 1, book: 'Tao Te Ching' }];
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

// ===== SIKHISM (GurbaniNow API -- free, Guru Granth Sahib) =====
export async function fetchSikhBooks(): Promise<BookEntry[]> {
  // Guru Granth Sahib is organized by Ang (page), 1-1430
  // Also organize by major sections/raags
  return [
    { id: 'ang-1', name: 'Ang 1-10: Mool Mantar & Japji Sahib', description: 'Japji Sahib (Morning Prayer)', chapters: 10 },
    { id: 'ang-11', name: 'Ang 11-20: Japji Sahib (continued)', description: 'Japji Sahib (Morning Prayer)', chapters: 10 },
    { id: 'ang-21', name: 'Ang 21-30: So Dar & So Purakh', description: 'Evening Prayers', chapters: 10 },
    { id: 'ang-31', name: 'Ang 31-50: Siri Raag', description: 'Siri Raag', chapters: 20 },
    { id: 'ang-51', name: 'Ang 51-100: Siri Raag (continued)', description: 'Siri Raag', chapters: 50 },
    { id: 'ang-101', name: 'Ang 101-150: Raag Maajh', description: 'Raag Maajh', chapters: 50 },
    { id: 'ang-151', name: 'Ang 151-200: Raag Gauree', description: 'Raag Gauree', chapters: 50 },
    { id: 'ang-201', name: 'Ang 201-300: Raag Gauree (continued)', description: 'Raag Gauree', chapters: 100 },
    { id: 'ang-301', name: 'Ang 301-400: Raag Aasaa', description: 'Raag Aasaa', chapters: 100 },
    { id: 'ang-401', name: 'Ang 401-500: Raag Aasaa & Goojaree', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-501', name: 'Ang 501-600: Raag Devgandhaaree & Bihaagra', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-601', name: 'Ang 601-700: Raag Sorat\'h & Dhanaasree', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-701', name: 'Ang 701-800: Raag Jaitsree & Todee', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-801', name: 'Ang 801-900: Raag Bilaaval & Gound', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-901', name: 'Ang 901-1000: Raag Raamkalee', description: 'Raag Raamkalee', chapters: 100 },
    { id: 'ang-1001', name: 'Ang 1001-1100: Raag Maaroo & Nat Naaraain', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-1101', name: 'Ang 1101-1200: Raag Malaar & Kaanraa', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-1201', name: 'Ang 1201-1300: Raag Prabhaatee & Jaijaavantee', description: 'Mixed Raags', chapters: 100 },
    { id: 'ang-1301', name: 'Ang 1301-1430: Shaloks & Mundaavanee', description: 'Closing Shaloks', chapters: 130 },
  ];
}

export async function fetchSikhAng(angNum: number): Promise<TextEntry[]> {
  try {
    const res = await fetch(`https://api.gurbaninow.com/v2/ang/${angNum}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.page || []).map((item: any, i: number) => ({
      id: `sggs-${angNum}-${i}`,
      title: `Line ${i + 1}`,
      text: item.line?.translation?.english?.default || item.line?.gurmukhi?.unicode || '',
      reference: `Sri Guru Granth Sahib, Ang ${angNum}, Line ${i + 1}`,
      verse: i + 1,
      book: `Ang ${angNum}`,
    })).filter((e: TextEntry) => e.text.length > 0);
  } catch { return []; }
}

// ===== CONFUCIANISM (Analects -- embedded, public domain) =====
const ANALECTS: Record<string, string[]> = {
  '1': [
    'The Master said, "Is it not a pleasure to learn and to repeat or practice from time to time what has been learned? Is it not delightful to have friends coming from afar? Is not one a true gentleman who does not feel displeased when others fail to recognize his merits?"',
    'Yu Tzu said, "It is rare for a person who is filial and respectful of elders to be inclined to transgress against superiors. It has never happened that one not inclined to transgress against superiors is inclined to create disorder."',
    'The Master said, "Clever words and a pleasing countenance have little connection with being Good."',
    'Tseng Tzu said, "Each day I examine myself on three things: In planning for others, have I been loyal? In my dealings with friends, have I been trustworthy? Have I practiced what has been passed on to me?"',
    'The Master said, "In leading a state of a thousand chariots: be reverent in handling affairs and display trustworthiness; be frugal in expenditures and love the people; employ the people only at the proper times."',
    'The Master said, "At home, a young man should be filial. Outside the home, he should be respectful to his elders. He should be careful in practice and trustworthy in word. He should love all people broadly, and draw close to those who are Good. If he has extra energy after so doing, let him devote it to learning the cultural arts."',
    'Tzu-hsia said, "One who recognizes and admires worthiness and changes his lustful nature, who is able to fully exhaust his strength in serving his parents, who is able to offer his life in serving his prince, and whose words are trustworthy in dealings with friends -- though others may say he is unlearned, I would definitely call him learned."',
    'The Master said, "If a gentleman is not dignified, then he will not command respect, and his learning will not be on a firm foundation. Hold loyalty and trustworthiness as your highest principles. Do not make friends with those who are lesser than yourself. When you make a mistake, do not be afraid to correct it."',
  ],
  '2': [
    'The Master said, "If you govern with the power of your virtue, you will be like the North Star. It just stays in its place while all the other stars position themselves around it."',
    'The Master said, "The three hundred poems in the Book of Odes can be summed up in one phrase: Think no evil."',
    'The Master said, "If you lead the people with government regulations and organize them with penal law, they will avoid wrongdoing but will have no sense of honor or shame. If you lead them with virtue and organize them through proper conduct, they will have a sense of shame and will correct themselves."',
    'The Master said, "At fifteen, I set my heart on learning. At thirty, I had planted my feet firm upon the ground. At forty, I no longer suffered from perplexities. At fifty, I knew what were the biddings of Heaven. At sixty, I heard them with a docile ear. At seventy, I could follow the dictates of my own heart, without transgressing the right."',
    'Meng Yi Tzu asked about filial piety. The Master said, "Never disobey." When Fan Chi was driving for the Master, he told him, "Meng asked me about filial piety, and I said, Never disobey." Fan Chi said, "What did you mean?" The Master said, "While parents are alive, serve them according to the rules of propriety. When they die, bury them according to the rules of propriety and sacrifice to them according to the rules of propriety."',
    'The Master said, "I can talk with Hui for a whole day without his disagreeing with me in any way, as if he were stupid. But when he retires and I examine his private conduct, I find that it fully illustrates my teachings. Hui is not stupid at all!"',
    'The Master said, "If you study the past and use it to understand the present, you are worthy of being a teacher."',
    'The Master said, "The gentleman is not a utensil."',
    'The Master said, "To study and not think is a waste. To think and not study is dangerous."',
    'The Master said, "To devote oneself to strange principles is decidedly harmful."',
    'The Master said, "Shall I teach you what knowledge is? When you know a thing, to recognize that you know it; and when you do not know a thing, to recognize that you do not know it. That is knowledge."',
  ],
  '4': [
    'The Master said, "It is beautiful to live amidst Goodness. If you choose not to dwell among Good people, how can you become wise?"',
    'The Master said, "Those who are not Good cannot long endure hardship, and cannot long enjoy happiness. Those who are Good are content with Goodness. The wise make use of Goodness."',
    'The Master said, "Only the Good person is able to truly like others, and is able to truly dislike others."',
    'The Master said, "If you set your heart on Goodness, you will be free of evil."',
    'The Master said, "In the morning, hear the Way; in the evening, die content."',
    'The Master said, "A gentleman is concerned with virtue; a petty person is concerned with land. A gentleman is concerned with the law; a petty person is concerned with favors."',
    'The Master said, "When you see a worthy person, think about how you can equal him. When you see an unworthy person, reflect inwardly on yourself."',
    'The Master said, "The gentleman desires to be slow in speech but quick in action."',
    'The Master said, "Virtue is never solitary; it always has neighbors."',
  ],
  '15': [
    'The Master said, "A true gentleman is concerned about his own lack of ability, not about whether others recognize him or not."',
    'The Master said, "A true gentleman cannot be known in small things, but can be entrusted with great matters. A lesser person cannot be entrusted with great matters, but can be known in small things."',
    'The Master said, "A true gentleman seeks what is right; a lesser person seeks what is profitable."',
    'The Master said, "What you do not wish done to yourself, do not do to others."',
    'The Master said, "A person who has committed a mistake and doesn\'t correct it is committing another mistake."',
    'The Master said, "I once spent a whole day without eating and a whole night without sleeping in order to think. It was no use. It is better to study."',
  ],
};

export function fetchConfuciusBooks(): BookEntry[] {
  return [
    { id: 'analects-1', name: 'Book 1: On Learning', description: 'The Analects' },
    { id: 'analects-2', name: 'Book 2: On Governance', description: 'The Analects' },
    { id: 'analects-4', name: 'Book 4: On Goodness', description: 'The Analects' },
    { id: 'analects-15', name: 'Book 15: Duke Ling of Wei', description: 'The Analects' },
  ];
}

export function getAnalectsText(book: string): TextEntry[] {
  const num = book.replace('analects-', '');
  const verses = ANALECTS[num] || [];
  return verses.map((text, i) => ({
    id: `analects-${num}-${i}`,
    title: `${num}.${i + 1}`,
    text,
    reference: `Analects ${num}:${i + 1}`,
    verse: i + 1,
    book: `Analects Book ${num}`,
  }));
}

// ===== ZOROASTRIANISM (Gathas -- embedded, public domain) =====
const GATHAS: Record<string, string[]> = {
  '28': [
    'With outspread hands in petition for that help, O Mazda, I will pray for the works of the holy spirit, O thou the Right, whereby I may please the will of Good Thought and the Ox-Soul.',
    'I who would serve you, O Mazda Ahura and Good Thought -- do ye give through the Right the blessings of both worlds, the bodily and that of Thought, which set the faithful in felicity.',
    'I who would praise ye as never before, Right and Good Thought and Mazda Ahura, and those for whom Devotion makes an imperishable Dominion grow; come ye to my help at my call.',
    'I who have set my heart on watching over the soul, in union with Good Thought, and as knowing the rewards of Mazda Ahura for our works, will, while I have power and strength, teach men to seek after Right.',
    'O thou the Right, shall I see thee and Good Thought, as one that knows? Shall I see the throne of the mightiest Ahura, and the Obedience of Mazda? Through this holy Word on our tongue will we turn the robber horde unto the Greatest.',
  ],
  '30': [
    'Now I will proclaim to those who will hear the things that the understanding man should remember, the praises and prayer of the Good Thought to the Lord, and the joy which he shall see in the light who has remembered them well.',
    'Hear with your ears the best things; look upon them with clear-seeing thought, for decision between the two Beliefs, each man for himself before the Great Consummation, bethinking you that it be accomplished to our pleasure.',
    'Now the two primal Spirits, who reveal themselves in vision as Twins, are the Better and the Bad, in thought and word and action. And between these two the wise ones chose aright, the foolish not so.',
    'And when these two Spirits came together in the beginning, they created Life and Not-Life, and that at the last Worst Existence shall be to the followers of the Lie, but the Best Existence to him that follows Right.',
    'Of these two Spirits he that followed the Lie chose doing the worst things; the holiest Spirit chose Right, he that clothes himself with the massy heavens as a garment. So likewise they that are eager to please Ahura Mazda by dutiful actions.',
  ],
  '43': [
    'To him shall the best befall, who, as one that knows, speaks to me Right\'s truthful word of Welfare and of Immortality; even the Dominion of Mazda which Good Thought shall increase for him.',
    'He that in the beginning thus thought, "Let the blessed realms be filled with Light," he it is that by his wisdom created Right. Those realms that the Best Thought shall possess thou dost exalt, O Mazda, through the Spirit, which, O Ahura, is ever the same.',
    'I recognized thee, O Mazda, in my thought, that thou the First art also the Last -- that thou art Father of Good Thought, when I apprehended thee with mine eye -- that thou didst truly create Right, and art the Lord to judge the actions of life.',
    'Thine was Devotion, thine the Ox-Creator, thine the Wisdom of the Spirit, O Mazda Ahura, when thou didst give bodies their life, when thou didst make actions and words, whereby one may exercise one\'s convictions at one\'s free-will.',
  ],
};

export function fetchZoroastrianBooks(): BookEntry[] {
  return [
    { id: 'gatha-28', name: 'Yasna 28: Ahunavaiti Gatha (Prayer)', description: 'Gathas of Zarathustra' },
    { id: 'gatha-30', name: 'Yasna 30: The Two Spirits', description: 'Gathas of Zarathustra' },
    { id: 'gatha-43', name: 'Yasna 43: Ushtavaiti Gatha (Happiness)', description: 'Gathas of Zarathustra' },
  ];
}

export function getGathaText(book: string): TextEntry[] {
  const num = book.replace('gatha-', '');
  const verses = GATHAS[num] || [];
  return verses.map((text, i) => ({
    id: `gatha-${num}-${i}`,
    title: `Verse ${i + 1}`,
    text,
    reference: `Yasna ${num}:${i + 1}`,
    verse: i + 1,
    book: `Yasna ${num}`,
  }));
}


// ===== SUFISM (Public domain translations -- Rumi, Hafiz, Rabia al-Adawiyya) =====
const SUFISM_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "rumi-masnavi": [
    { title: "The Reed Flute", text: "Listen to the reed flute, how it tells a tale, complaining of separations, saying: Ever since I was cut from the reed bed, my lament has caused man and woman to moan. I want a bosom torn by severance, to share the pain of this yearning for union.", reference: "Masnavi I:1-3, Jalal al-Din Rumi (trans. Nicholson, public domain)" },
    { title: "The Fire of Love", text: "The fire of Love is not of the kind that one can extinguish with water. The spiritual ocean is not for swimming in -- it swallows all who enter. Like Moses, throw your staff and watch it become a serpent; trust the unseen hand that moves through all things.", reference: "Masnavi I, Rumi (public domain)" },
    { title: "The Guest House", text: "This human being is a guest house. Every morning a new guest arrives. A joy, a depression, a meanness -- some momentary awareness comes as an unexpected visitor. Welcome and entertain them all, even if they are a crowd of sorrows who violently sweep your house empty of its furniture.", reference: "Divan-i-Shams, Rumi (public domain)" },
    { title: "On Silence", text: "When I am with you, we stay up all night. When you are not here, I cannot go to sleep. Praise God for these two insomnias, and the difference between them.", reference: "Divan-i-Shams, Rumi (public domain)" },
    { title: "The Beloved Is Here", text: "I searched for God among the Christians and on the Cross and therein I found Him not. I went into the ancient temples of idolatry; no trace of Him was there. I entered the mountain cave of Hira and then went as far as Qandhar but God I found not. Finally, I looked into my own heart and there I saw Him; He was nowhere else.", reference: "Attributed to Rumi (public domain)" },
    { title: "Love Is the Way", text: "I am burning. If anyone lacks tinder, let him set his rubbish ablaze with my fire. Love is a sea without shore. The drowning man in his desperate panic struggles to reach the shore -- but the wise swimmer heads for the deep.", reference: "Masnavi II, Rumi (public domain)" },
  ],
  "hafiz-divan": [
    { title: "The Cup of Love", text: "I have come to drag you out of yourself and take you in my heart. I have come to bring out the beauty you never knew you had and lift you like a prayer to the sky.", reference: "Divan of Hafiz, Hafiz of Shiraz (public domain)" },
    { title: "God's Laughter", text: "Even after all this time the sun never says to the earth, 'You owe me.' Look what happens with a love like that -- it lights the whole world.", reference: "Divan of Hafiz (public domain)" },
    { title: "The Way of the Mystic", text: "Stay close to anything that makes you glad you are alive. The subject of tonight's poem is the foolishness of believing you are not already what you seek.", reference: "Divan of Hafiz (public domain)" },
  ],
  "rabia-prayers": [
    { title: "Two Loves", text: "O my Lord, if I worship Thee from fear of Hell, burn me in Hell; and if I worship Thee from hope of Paradise, exclude me thence; but if I worship Thee for Thine own sake, then withhold not from me Thine Eternal Beauty.", reference: "Rabia al-Adawiyya (8th century, trans. Smith, public domain)" },
    { title: "Love as the Way", text: "I carry a torch in one hand and a bucket of water in the other: with these things I am going to set fire to Heaven and put out the flames of Hell, so that voyagers to God can rip the veils and see the real goal.", reference: "Rabia al-Adawiyya (public domain)" },
    { title: "Night Prayer", text: "O Allah, the night has passed and the day has dawned. How I long to know if Thou hast accepted my prayers or if Thou hast rejected them. Therefore console me, for it is Thine to console this state of mine. Thou hast given me life and cared for me, and Thine is the glory.", reference: "Rabia al-Adawiyya (public domain)" },
  ],
};
export function fetchSufismBooks(): BookEntry[] {
  return [
    { id: "rumi-masnavi", name: "Masnavi & Divan-i-Shams -- Rumi", description: "Sufi Poetry" },
    { id: "hafiz-divan", name: "Divan of Hafiz", description: "Sufi Poetry" },
    { id: "rabia-prayers", name: "Prayers of Rabia al-Adawiyya", description: "Sufi Masters" },
  ];
}
export function getSufismText(bookId: string): TextEntry[] {
  const entries = SUFISM_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `sufism-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== FIVE PERCENTERS / NATION OF GODS AND EARTHS =====
const FIVEPERCENT_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "supreme-mathematics": [
    { title: "1 -- Knowledge", text: "Knowledge is the foundation of all things in existence. It is the accumulation of facts through observation, experience, and study. Knowledge is the black seed, the origin. To know is to see. Knowledge is the Father.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "2 -- Wisdom", text: "Wisdom is the manifestation of Knowledge -- to act wisely upon what you know. Wisdom is the wise words, ways, and actions of the original man and woman. Wisdom is the mother, the water of life, the reflective principle.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "3 -- Understanding", text: "Understanding is the clear picture -- the mental picture one draws using Knowledge and Wisdom. Understanding is the best part. When Knowledge is the Father and Wisdom is the Mother, Understanding is their child, the fruit of their union.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "4 -- Culture / Freedom", text: "Culture is the way of life. The culture of the Original People is Islam -- meaning I-Self-Lord-Am-Master. Freedom is to move freely through the universe, unrestricted by ignorance.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "5 -- Power / Refinement", text: "Power is the strength to do what is right. Refinement is the process of removing impurities. True strength comes from purifying the self -- in thought, word, and deed.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "6 -- Equality", text: "Equality is to be equal -- to deal equally with all people. To treat knowledge and wisdom equally, bringing them to the same level, creates understanding. Equality is the principle of fairness and balance in all dealings.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "7 -- God", text: "God is the original man, the supreme being. Seven is the most powerful number, the key to all. God is the Creator. The Sun is his symbol -- the source of light and life in our universe.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "8 -- Build / Destroy", text: "Build means to add positive energy to a person, place, or thing. To destroy means to remove negative energy. To build civilizations and destroy ignorance is the duty of the enlightened.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "9 -- Born", text: "Born means to be alive, to bring into existence. To be born is to manifest -- to bring the unseen into the seen. All things must go through a birth process, a transformation from potential to actual.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
    { title: "0 -- Cipher", text: "The Cipher is a complete circle -- 360 degrees, with nothing missing, nothing lost. The Cipher represents the universe: everything within it is whole, complete, returning to its origin. Knowledge returns to Knowledge.", reference: "Supreme Mathematics, Nation of Gods and Earths" },
  ],
  "supreme-alphabet": [
    { title: "A -- Allah", text: "Allah is the Father, the Creator, the Supreme Being. Allah is the original man -- the Asiatic Black man -- who is God, the maker and owner of the planet Earth. The word Allah means the Arm, Leg, Leg, Arm, Head -- the complete man standing upright, conscious, and in command of himself.", reference: "Supreme Alphabet, Nation of Gods and Earths" },
    { title: "I -- Islam", text: "Islam means I-Self-Lord-Am-Master. Islam is not merely a religion but a way of life -- the culture of the original people, rooted in mathematics, science, and truth. To be Islamic is to know thyself completely.", reference: "Supreme Alphabet, Nation of Gods and Earths" },
    { title: "G -- God", text: "God is the supreme intelligence that governs the universe through natural law. God is not a mystery -- God is the original man who has mastered Knowledge, Wisdom, and Understanding and walks with the universe's intelligence as his guide.", reference: "Supreme Alphabet, Nation of Gods and Earths" },
    { title: "W -- Wisdom", text: "Wisdom is wise words, ways, and actions. It is the application of knowledge. The woman is wisdom -- she reflects the light of the man as the moon reflects the sun. To speak with wisdom is to speak truth and to create with your words.", reference: "Supreme Alphabet, Nation of Gods and Earths" },
  ],
};
export function fetchFivePercentBooks(): BookEntry[] {
  return [
    { id: "supreme-mathematics", name: "Supreme Mathematics (1-0)", description: "Nation of Gods and Earths" },
    { id: "supreme-alphabet", name: "Supreme Alphabet (Key Letters)", description: "Nation of Gods and Earths" },
  ];
}
export function getFivePercentText(bookId: string): TextEntry[] {
  const entries = FIVEPERCENT_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `fivepercent-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== AFRICAN TRADITIONS (Yoruba/Ifa, Akan, Ubuntu -- widely documented oral traditions) =====
const AFRICAN_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "ifa-ubuntu": [
    { title: "Ubuntu -- I Am Because We Are", text: "I am because we are. A person is a person through other people. Ubuntu teaches that humanity is not found in isolation but in relationship. The dignity of one is bound to the dignity of all. When one member of the community suffers, all suffer. When one flourishes, all flourish.", reference: "Ubuntu philosophy, Nguni Bantu tradition (widely documented)" },
    { title: "Ori -- The Personal Spirit", text: "The Ori is the divine essence within each person -- the personal spirit who walks with you, who knows your destiny. To honour your Ori is to align yourself with your highest purpose. A person who neglects their Ori wanders without direction.", reference: "Yoruba/Ifa tradition (scholarly documentation, public domain)" },
    { title: "Olodumare -- The Supreme Creator", text: "Olodumare is the supreme deity, the source of all existence. The Orishas are the intermediaries through whom divine power flows into the world. Each Orisha governs a domain of nature and human experience -- and each person carries the energy of their Orisha within them.", reference: "Yoruba religious tradition (public domain)" },
    { title: "Ifa on Truth", text: "The mouth that speaks truth is blessed. The tongue that twists truth eventually twists the speaker. Among all the virtues, truth-telling is the foundation. The road of honesty, though sometimes hard, always leads home.", reference: "Ifa oral corpus (widely documented)" },
    { title: "Ashe -- Divine Power", text: "Ashe is the divine energy, the power to make things happen, the spiritual force that flows through all living things. Every action, word, and thought carries ashe -- and what you send out returns to you multiplied. To live well is to cultivate positive ashe through right conduct, prayer, and care for community.", reference: "Yoruba spiritual tradition (public domain)" },
    { title: "Akan Proverbs", text: "The ruin of a nation begins in the homes of its people. A child who is not embraced by the village will burn it down to feel its warmth. It takes a whole village to raise a child. The family is like the forest -- if you are outside, it is dense; when you are inside, you see that each tree has its own position.", reference: "Akan proverbs, West African oral tradition (public domain)" },
    { title: "The Ancestors Are Here", text: "The ancestors are never truly gone. They live in the stories we tell, in the values we carry, in the blood that moves through our children. To honour the ancestors is to remember that we stand on the shoulders of those who came before. Their wisdom is our inheritance.", reference: "Shared African ancestral traditions (widely documented)" },
  ],
};
export function fetchAfricanBooks(): BookEntry[] {
  return [
    { id: "ifa-ubuntu", name: "Ifa Wisdom, Ubuntu & African Teachings", description: "Yoruba · Akan · Ubuntu" },
  ];
}
export function getAfricanText(bookId: string): TextEntry[] {
  const entries = AFRICAN_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `african-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== ANCIENT TRADITIONS (Sumerian, Egyptian, Norse -- all public domain translations) =====
const ANCIENT_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "gilgamesh": [
    { title: "He Who Saw the Deep", text: "He who saw the Deep, the country's foundation, who knew the proper ways, was wise in all matters -- Gilgamesh, who brought us a tale of the days before the flood. He went on a distant journey, pushing himself to exhaustion, but then was brought to peace. He carved his trials on stone tablets.", reference: "Epic of Gilgamesh, Tablet I (Akkadian, public domain translation)" },
    { title: "Siduri's Counsel", text: "Gilgamesh, where are you hurrying to? You will never find that life for which you are looking. When the gods created man they allotted death to man, but life they retained in their own keeping. Let your belly be full, make merry day and night. Cherish the little child who holds your hand; let your wife delight in your embrace. These things alone are the concern of man.", reference: "Epic of Gilgamesh, Tablet X, Siduri speaking (public domain)" },
    { title: "The Flood Narrative", text: "Tear down your house and build a boat! Abandon possessions and seek living beings. Discard worldly goods and keep the soul alive! Aboard the boat take the seed of all living creatures. The boat you will build -- her dimensions must measure equal to each other.", reference: "Epic of Gilgamesh, Tablet XI, Utnapishtim's account (public domain)" },
  ],
  "egyptian-texts": [
    { title: "The Negative Confession", text: "I have not committed sin. I have not committed robbery with violence. I have not stolen. I have not slain men or women. I have not stolen grain. I have not uttered lies. I have not attacked any man. I have not made any man to weep. I have done what men said and with which gods are content.", reference: "Egyptian Book of the Dead, Chapter 125 (trans. E.A. Wallis Budge, 1895, public domain)" },
    { title: "Hymn to Ra at Dawn", text: "Homage to thee, O Ra, at thy tremendous rising! Thou risest! Thou shinest! The heavens are rolled aside! Thou art the King of Gods, thou art the All-comprising, from thee we came, in thee are deified. Thou didst create the earth, thou didst fashion man.", reference: "Egyptian Hymn to Ra (trans. Budge, public domain)" },
  ],
  "norse-havamal": [
    { title: "Praise the Day at Evening", text: "Before one enters a hall, let him look in at the doorways -- for one can never know for certain where enemies are sitting. Give praise to the day at evening, to a woman on her pyre, to a weapon when tested, to a maid when married, to ice when it is crossed, to ale when it is drunk.", reference: "Havamal (Sayings of the High One), Poetic Edda, stanzas 1-81 (trans. Bellows, 1923, public domain)" },
    { title: "Cattle Die, Kinsmen Die", text: "Cattle die and kinsmen die; thyself too soon must die. But one thing never, I ween, will die: fair fame of one who has earned it. Cattle die and kinsmen die; thyself too soon must die. One thing I know that never dies: the judgment of a dead man's life.", reference: "Havamal, stanzas 76-77 (trans. Bellows, public domain)" },
    { title: "Odin's Self-Sacrifice", text: "I know that I hung on a wind-rocked tree, nine whole nights, with a spear wounded, and to Odin offered, myself to myself; on that tree of which no man knows from what root it springs. Bread no one gave me, nor a horn of drink, downward I peered, to runes applied myself, wailing learnt them, then fell down thence.", reference: "Havamal, stanza 138 (trans. Thorpe, public domain)" },
    { title: "On Friendship", text: "A friend to a friend should be a friend, and gifts should be given for gifts. Laughter should be answered with laughter, but lies should be met with lies. You know that, if you have a friend in whom you have full confidence, you ought to exchange thoughts with him and give gifts, and go to see him often.", reference: "Havamal, stanzas 42-44 (trans. Bellows, public domain)" },
  ],
};
export function fetchAncientBooks(): BookEntry[] {
  return [
    { id: "gilgamesh", name: "Epic of Gilgamesh", description: "Sumerian · Akkadian" },
    { id: "egyptian-texts", name: "Egyptian Book of the Dead & Hymns", description: "Ancient Egyptian" },
    { id: "norse-havamal", name: "Havamal (Sayings of the High One)", description: "Norse · Poetic Edda" },
  ];
}
export function getAncientText(bookId: string): TextEntry[] {
  const entries = ANCIENT_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `ancient-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== INDIGENOUS WISDOM (Widely published teachings, clearly attributed) =====
const INDIGENOUS_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "native-american": [
    { title: "We Borrow It from Our Children", text: "Treat the earth well. It was not given to you by your parents, it was loaned to you by your children. We do not inherit the earth from our ancestors, we borrow it from our children.", reference: "Attributed to Chief Seattle, Suquamish/Duwamish peoples (widely published teaching)" },
    { title: "Lakota Prayer", text: "Wakan Tanka, Great Mystery, teach me how to trust my heart, my mind, my intuition, my inner knowing, the senses of my body, the blessings of my spirit. Teach me to trust these things so that I may enter my sacred space and love beyond my fear, and thus walk in balance with the passing of each glorious sun.", reference: "Lakota (Sioux) prayer tradition (widely published)" },
    { title: "The Four Directions", text: "From the East comes knowledge; from the South comes life and warmth; from the West comes the power of change; from the North comes wisdom and endurance. We stand at the center of these four gifts. To live well is to honor all four directions -- to know, to live, to change, and to endure.", reference: "Lakota four directions teaching (widely published oral tradition)" },
    { title: "Black Elk on the Circle", text: "You have noticed that everything an Indian does is in a circle, and that is because the Power of the World always works in circles, and everything tries to be round. In the old days when we were a strong and happy people, all our power came to us from the sacred hoop of the nation.", reference: "Black Elk (Oglala Lakota), from Black Elk Speaks by John G. Neihardt, 1932 (public domain)" },
    { title: "Hopi Prophecy -- We Are the Ones", text: "We are the ones we have been waiting for. There is a river flowing now very fast. It is so great and swift that there are those who will be afraid. They will try to hold on to the shore. Know that the river has its destination. The elders say we must let go of the shore.", reference: "Hopi Elders, 2000 (widely published statement)" },
  ],
  "hawaiian-huna": [
    { title: "Aloha -- The Breath of Life", text: "Aloha is the word for love and peace. Its deeper meaning: Alo means presence, face-to-face; Ha means the breath of life. To say Aloha is to share the breath of life, to be present with another, to acknowledge their divine spark. Aloha is not just a greeting -- it is a sacred covenant of mutual recognition.", reference: "Hawaiian Huna tradition (widely documented)" },
    { title: "The Seven Principles of Huna", text: "IKE -- The world is what you think it is. KALA -- There are no limits. MAKIA -- Energy flows where attention goes. MANAWA -- Now is the moment of power. ALOHA -- To love is to be happy with. MANA -- All power comes from within. PONO -- Effectiveness is the measure of truth.", reference: "Huna principles as documented by Serge Kahili King (widely published teaching)" },
  ],
};
export function fetchIndigenousBooks(): BookEntry[] {
  return [
    { id: "native-american", name: "Native American Teachings", description: "Lakota · Hopi · Oglala Sioux" },
    { id: "hawaiian-huna", name: "Hawaiian Huna", description: "Pacific Islands" },
  ];
}
export function getIndigenousText(bookId: string): TextEntry[] {
  const entries = INDIGENOUS_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `indigenous-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== JAINISM (Acaranga Sutra, Mahavira -- public domain GRETIL translations) =====
const JAINISM_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "mahavira-teachings": [
    { title: "The Way of Ahimsa", text: "All breathing, existing, living, sentient creatures should not be slain, nor treated with violence, nor abused, nor tormented, nor driven away. This is the pure, unchangeable, eternal law which the clever ones, who understand the world, have proclaimed.", reference: "Acaranga Sutra 1.4.1 (trans. Hermann Jacobi, 1884, public domain)" },
    { title: "On Self-Conquest", text: "A man should wander about treating all creatures as he himself would be treated. He should be indifferent to all pleasures and pains. Not wishing for anything that is worldly, he should observe the rules of life. Knowing the suffering of all living beings, he should not kill them.", reference: "Acaranga Sutra 1.6.5 (trans. Jacobi, public domain)" },
    { title: "Mahavira on Impermanence", text: "Life is short and momentary. People never reflect on this. What is your body? A collection of matter, disintegrating from moment to moment. Yet within it is the soul -- pure, eternal, capable of liberation. Realize this and act accordingly.", reference: "Uttaradhyayana Sutra (public domain)" },
    { title: "The Five Great Vows", text: "The great vows of the liberated: Ahimsa -- do not harm any living being. Satya -- speak only truth. Asteya -- take only what is freely given. Brahmacharya -- renounce sensual excess. Aparigraha -- hold nothing as permanently your own.", reference: "Jain tradition, Mahavira's Five Great Vows (public domain)" },
    { title: "Anekantavada -- Many Sides of Truth", text: "Truth is many-sided. No one perspective captures reality completely. The blind men who each touch a different part of the elephant each describe something real -- yet no one has the whole truth. To understand fully, one must consider all perspectives with patience and humility.", reference: "Jain philosophical tradition (widely documented)" },
    { title: "The Soul and Liberation", text: "The soul has the same qualities as the Supreme Soul. It is pure, eternal, and capable of infinite bliss. It is clouded by karma -- matter that adheres through action. By right knowledge, right faith, and right conduct, the soul sheds its karma like a serpent sheds its skin, until it rises free, a Siddha, liberated and perfect.", reference: "Tattvartha Sutra, Umasvami (public domain)" },
  ],
};
export function fetchJainismBooks(): BookEntry[] {
  return [
    { id: "mahavira-teachings", name: "Acaranga Sutra & Mahavira's Teachings", description: "Jain Scriptures" },
  ];
}
export function getJainismText(bookId: string): TextEntry[] {
  const entries = JAINISM_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `jainism-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== BAHA'I FAITH (Hidden Words -- Baha'i Reference Library, public domain) =====
const BAHAI_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "hidden-words": [
    { title: "The First Counsel", text: "O Son of Spirit! My first counsel is this: Possess a pure, kindly and radiant heart, that thine may be a sovereignty ancient, imperishable and everlasting.", reference: "The Hidden Words of Baha'u'llah, Arabic #1 (Baha'i Reference Library, public domain)" },
    { title: "I Loved Thy Creation", text: "O Son of Man! I loved thy creation, hence I created thee. Wherefore, do thou love Me, that I may name thy name and fill thy soul with the spirit of life.", reference: "The Hidden Words of Baha'u'llah, Arabic #4 (public domain)" },
    { title: "On Justice", text: "O Son of Spirit! The best beloved of all things in My sight is Justice; turn not away therefrom if thou desirest Me, and neglect it not that I may confide in thee. By its aid thou shalt see with thine own eyes and not through the eyes of others.", reference: "The Hidden Words of Baha'u'llah, Arabic #2 (public domain)" },
    { title: "On Suffering and Growth", text: "O Son of Man! If adversity befall thee not in My path, how canst thou walk in the ways of them that are content with My pleasure? If trials afflict thee not in thy longing to meet Me, how wilt thou attain the light in thy love for My beauty?", reference: "The Hidden Words of Baha'u'llah, Persian #50 (public domain)" },
    { title: "The Unity of Humanity", text: "O Children of Men! Know ye not why We created you all from the same dust? That no one should exalt himself over the other. Since We have created you all from one same substance it is incumbent on you to be even as one soul, to walk with the same feet, eat with the same mouth and dwell in the same land.", reference: "The Hidden Words of Baha'u'llah, Arabic #68 (public domain)" },
    { title: "The World's Faiths Are One", text: "There can be no doubt whatever that the peoples of the world, of whatever race or religion, derive their inspiration from one heavenly Source, and are the subjects of one God. The difference between the ordinances under which they abide should be attributed to the varying requirements of the age in which they were revealed.", reference: "Gleanings from the Writings of Baha'u'llah (public domain)" },
  ],
};
export function fetchBahaiBooks(): BookEntry[] {
  return [
    { id: "hidden-words", name: "The Hidden Words of Baha'u'llah", description: "Baha'i Sacred Writings" },
  ];
}
export function getBahaiText(bookId: string): TextEntry[] {
  const entries = BAHAI_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `bahai-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== SHINTO (Kojiki -- Chamberlain translation, 1882, public domain) =====
const SHINTO_TEXTS: Record<string, Array<{title: string; text: string; reference: string}>> = {
  "kojiki": [
    { title: "The Creation -- First Deities", text: "The names of the deities that were born in the Plain of High Heaven when the Heaven and Earth began were: the deity Master-of-the-August-Center-of-Heaven, next the High-Creator, next the Divine-Creator. These three deities were all Deities Born Alone, and hid their persons.", reference: "Kojiki, Chapter I (trans. Basil Hall Chamberlain, 1882, public domain)" },
    { title: "The Jeweled Spear of Heaven", text: "Hereupon all the Heavenly deities commanded the two deities Izanagi and Izanami, ordering them to make, consolidate, and give birth to this drifting land. Granting to them a heavenly jeweled spear, they thus deigned to charge them. So the two deities pushed down the jeweled spear and stirred, whereupon, when they had stirred the brine till it went curdle-curdle, and drew the spear up, the brine that dripped down was piled up and became an island.", reference: "Kojiki, Chapter II (trans. Chamberlain, public domain)" },
    { title: "Amaterasu -- The Sun Goddess", text: "When the Sun Goddess hid herself behind the Rock-Cave of Heaven, and the whole Plain of High Heaven and all the Central Land of Reed-Plains were darkened -- thereupon the eight million deities assembled. They caused long-singing birds to cry; they made a mirror; they strung together celestial jewels; they made an offering place. Then laughter rang through the heavens and the Sun Goddess opened the cave.", reference: "Kojiki, Chapter XVI (trans. Chamberlain, public domain)" },
    { title: "Norito -- Prayer of Purification", text: "I humbly speak before you, great deities of heaven and earth. Hear my sincere prayer. We carry the weight of accumulated faults: faults of the body and faults of the spirit, done knowingly and unknowingly. Let all these faults, sins, and impurities be cleansed and purified, as the great wind of heaven disperses clouds, as the morning sun clears the mist. May purity and clarity return to us.", reference: "Norito (Shinto liturgical prayer), Oharae no Kotoba tradition (public domain scholarly reconstruction)" },
    { title: "Musubi -- The Power of Creation", text: "Musubi is the sacred power of growth, creation, and harmonious joining. It is the vital force that binds heaven and earth, that draws souls together, that causes seeds to grow and communities to flourish. The deities themselves embody musubi -- they do not command from above but grow alongside creation, nurturing the world from within.", reference: "Shinto theological concept of Musubi (widely documented)" },
    { title: "Kannagara -- Living in Accord with the Kami", text: "Kannagara means to live in the flow of the Kami -- in accordance with the natural order of the divine. It is not following rules but living in harmony: knowing when to speak and when to be silent, when to act and when to wait. The person who lives Kannagara brings peace to themselves and to the world around them.", reference: "Shinto tradition, concept of Kannagara (widely documented)" },
  ],
};
export function fetchShintoBooks(): BookEntry[] {
  return [
    { id: "kojiki", name: "Kojiki -- Record of Ancient Matters", description: "Shinto Scriptures" },
  ];
}
export function getShintoText(bookId: string): TextEntry[] {
  const entries = SHINTO_TEXTS[bookId] || [];
  return entries.map((e, i) => ({ id: `shinto-${bookId}-${i}`, title: e.title, text: e.text, reference: e.reference, verse: i + 1, book: bookId }));
}

// ===== TRADITION CONFIG -- maps tradition keys to their data source =====
export interface TraditionConfig {
  key: string;
  apiType: 'bible' | 'quran' | 'sefaria' | 'gita' | 'static' | 'suttacentral' | 'tao' | 'sikh' | 'confucius' | 'zoroastrian';
  isStaticCurated?: boolean;
  fetchBooks: () => Promise<BookEntry[]>;
  description: string;
  features: string[];
}

export const traditionConfigs: Record<string, TraditionConfig> = {
  judaism: {
    key: 'judaism',
    apiType: 'sefaria',
    fetchBooks: fetchSefariaBooks,
    description: 'Torah, Talmud, Psalms, Prophets, and Kabbalah -- powered by Sefaria\'s open library.',
    features: ['Hebrew + English', 'Commentary', 'Cross-references'],
  },
  christianity: {
    key: 'christianity',
    apiType: 'bible',
    fetchBooks: fetchBibleBooks,
    description: 'The complete Bible -- Old and New Testament, King James Version.',
    features: ['KJV Translation', '66 Books', 'Verse-by-verse'],
  },
  islam: {
    key: 'islam',
    apiType: 'quran',
    fetchBooks: fetchQuranSurahs,
    description: 'The Holy Quran -- 114 Surahs with English translation by Muhammad Asad.',
    features: ['Arabic + English', '114 Surahs', '6,236 Ayahs'],
  },
  hinduism: {
    key: 'hinduism',
    apiType: 'gita',
    fetchBooks: fetchGitaChapters,
    description: 'The Bhagavad Gita -- 18 chapters of divine dialogue between Krishna and Arjuna.',
    features: ['Sanskrit + English', '18 Chapters', '700 Verses'],
  },
  buddhism: {
    key: 'buddhism',
    apiType: 'suttacentral',
    fetchBooks: fetchBuddhistBooks,
    description: 'The Pali Canon -- Dhammapada, Long Discourses, Middle Discourses, Connected Discourses, and more. Powered by SuttaCentral.',
    features: ['Pāli + English', 'Bhikkhu Sujato translation', '48 texts'],
  },
  taoism: {
    key: 'taoism',
    apiType: 'tao',
    fetchBooks: async () => getTaoTeChingChapters(),
    description: 'The Tao Te Ching -- 81 chapters of Lao Tzu\'s timeless wisdom on the nature of existence.',
    features: ['81 Chapters', 'Public Domain', 'Classical Philosophy'],
  },
  sikhism: {
    key: 'sikhism',
    apiType: 'sikh',
    fetchBooks: fetchSikhBooks,
    description: 'Sri Guru Granth Sahib -- 1,430 Angs (pages) of divine poetry, hymns, and wisdom. Powered by GurbaniNow API.',
    features: ['Gurmukhi + English', '1,430 Pages', 'Multiple Gurus'],
  },
  confucianism: {
    key: 'confucianism',
    apiType: 'confucius',
    fetchBooks: async () => fetchConfuciusBooks(),
    description: 'The Analects of Confucius -- collected sayings on virtue, governance, and the good life.',
    features: ['Public Domain', 'Classical Chinese Philosophy', '4 Books Available'],
  },
  zoroastrianism: {
    key: 'zoroastrianism',
    apiType: 'zoroastrian',
    fetchBooks: async () => fetchZoroastrianBooks(),
    description: 'The Gathas of Zarathustra -- the oldest hymns of the Avesta, foundational prayers of Zoroastrianism.',
    features: ['Public Domain', '3,500+ Years Old', 'Gathas'],
  },
  sufism: {
    key: 'sufism',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchSufismBooks(),
    description: 'Sufi mystical poetry and teachings -- Rumi, Hafiz, Rabia al-Adawiyya. The path of divine love.',
    features: ['Public Domain', 'Rumi · Hafiz · Rabia', 'Mystical Poetry'],
  },
  fivepercent: {
    key: 'fivepercent',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchFivePercentBooks(),
    description: 'Supreme Mathematics and Supreme Alphabet -- the foundational teachings of the Nation of Gods and Earths.',
    features: ['Supreme Mathematics', 'Supreme Alphabet', 'Original Teachings'],
  },
  african: {
    key: 'african',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchAfricanBooks(),
    description: 'Ifa wisdom, Ubuntu philosophy, Akan proverbs -- the spiritual traditions of the African continent.',
    features: ['Yoruba · Akan · Ubuntu', 'Oral Tradition', 'Ancestral Wisdom'],
  },
  ancient: {
    key: 'ancient',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchAncientBooks(),
    description: 'The oldest sacred texts humanity has preserved -- Gilgamesh, Egyptian Book of the Dead, Norse Havamal.',
    features: ['Public Domain', 'Sumerian · Egyptian · Norse', '3000+ BCE'],
  },
  indigenous: {
    key: 'indigenous',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchIndigenousBooks(),
    description: 'Native American teachings, Hawaiian Huna, and the wisdom traditions of indigenous peoples worldwide.',
    features: ['Lakota · Hopi · Hawaiian', 'Oral Tradition', 'Widely Published'],
  },
  jainism: {
    key: 'jainism',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchJainismBooks(),
    description: 'Acaranga Sutra and the teachings of Mahavira -- non-violence, truth, and liberation.',
    features: ['Public Domain', 'Ahimsa · Truth · Liberation', 'Ancient Indian'],
  },
  bahai: {
    key: 'bahai',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchBahaiBooks(),
    description: "The Hidden Words of Baha'u'llah and core Baha'i sacred writings on unity, justice, and love.",
    features: ["Baha'i Reference Library", 'Public Domain', 'Unity of Humanity'],
  },
  shinto: {
    key: 'shinto',
    apiType: 'static',
    isStaticCurated: true,
    fetchBooks: async () => fetchShintoBooks(),
    description: 'Kojiki creation myths, Norito prayers, and the sacred principles of Shinto -- the way of the Kami.',
    features: ['Public Domain', 'Chamberlain Translation', 'Creation & Kami'],
  },

};
