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

// ─── Per-tradition result cap ───────────────────────────────────────────────
const MAX_PER_TRADITION = 4;

// ─── Static fallback passages for common spiritual themes ───────────────────
// Ensures cross-tradition results even when live APIs return nothing
const STATIC_PASSAGES: Record<string, SearchResult[]> = {
  forgiveness: [
    { id: 'static-forgive-islam', text: 'And let them pardon and overlook. Would you not like that Allah should forgive you? Allah is Forgiving and Merciful.', reference: 'Surah An-Nur 24:22', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-forgive-christianity', text: 'For if you forgive other people when they sin against you, your heavenly Father will also forgive you.', reference: 'Matthew 6:14', tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', book: 'Matthew', url: '/library/christianity' },
    { id: 'static-forgive-judaism', text: 'Who is a God like you, who pardons sin and forgives the transgression of the remnant of his inheritance?', reference: 'Micah 7:18', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Micah', url: '/library/judaism' },
    { id: 'static-forgive-buddhism', text: 'In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.', reference: 'Buddhist Proverb', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Dhammapada', url: '/library/buddhism' },
    { id: 'static-forgive-hinduism', text: 'Forgiveness is the virtue of the weak and the ornament of the strong. Forgiveness subdues all in this world.', reference: 'Mahabharata 3.29', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Mahabharata', url: '/library/hinduism' },
    { id: 'static-forgive-sikhism', text: 'Forgive the faults of others as a matter of duty, and know that ego makes us say what should not be said.', reference: 'Guru Granth Sahib, Ang 281', tradition: 'Sikhism', traditionKey: 'sikhism', emoji: '☬', color: '#1a6b3c', book: 'Guru Granth Sahib', url: '/library/sikhism' },
  ],
  love: [
    { id: 'static-love-christianity', text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking.', reference: '1 Corinthians 13:4-5', tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', book: '1 Corinthians', url: '/library/christianity' },
    { id: 'static-love-islam', text: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.', reference: 'Surah Ar-Rum 30:21', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-love-judaism', text: 'Love your neighbor as yourself. I am the LORD.', reference: 'Leviticus 19:18', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Leviticus', url: '/library/judaism' },
    { id: 'static-love-buddhism', text: 'Radiate boundless love towards the entire world — above, below, and across — unhindered, without ill will, without enmity.', reference: 'Karaniya Metta Sutta', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Sutta Nipata', url: '/library/buddhism' },
    { id: 'static-love-hinduism', text: 'Where the heart is full of love, there God is fully manifest.', reference: 'Narada Bhakti Sutra 82', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Bhakti Sutra', url: '/library/hinduism' },
    { id: 'static-love-taoism', text: 'Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love.', reference: 'Tao Te Ching, Chapter 8', tradition: 'Taoism', traditionKey: 'taoism', emoji: '☯️', color: '#2c6e49', book: 'Tao Te Ching', url: '/library/taoism' },
  ],
  peace: [
    { id: 'static-peace-islam', text: 'O you who have believed, enter into peace, all of you, and do not follow the footsteps of Satan. Indeed, he is to you a clear enemy.', reference: 'Surah Al-Baqarah 2:208', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-peace-christianity', text: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.', reference: 'John 14:27', tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', book: 'John', url: '/library/christianity' },
    { id: 'static-peace-judaism', text: 'Seek peace and pursue it.', reference: 'Psalms 34:14', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Psalms', url: '/library/judaism' },
    { id: 'static-peace-buddhism', text: 'Peace comes from within. Do not seek it without.', reference: 'Dhammapada, attributed', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Dhammapada', url: '/library/buddhism' },
    { id: 'static-peace-hinduism', text: 'Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality. Om peace, peace, peace.', reference: 'Brihadaranyaka Upanishad 1.3.28', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Upanishads', url: '/library/hinduism' },
    { id: 'static-peace-sikhism', text: 'One who is at peace within is peaceful everywhere.', reference: 'Guru Granth Sahib, Ang 750', tradition: 'Sikhism', traditionKey: 'sikhism', emoji: '☬', color: '#1a6b3c', book: 'Guru Granth Sahib', url: '/library/sikhism' },
  ],
  death: [
    { id: 'static-death-christianity', text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.', reference: 'Psalms 23:4', tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', book: 'Psalms', url: '/library/christianity' },
    { id: 'static-death-islam', text: 'Every soul shall taste death. And only on the Day of Resurrection shall you be paid your wages in full.', reference: 'Surah Al-Imran 3:185', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-death-hinduism', text: 'The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval.', reference: 'Bhagavad Gita 2:20', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Bhagavad Gita', url: '/library/hinduism' },
    { id: 'static-death-buddhism', text: 'All conditioned things are impermanent. Work out your salvation with diligence.', reference: 'Last words of the Buddha, Digha Nikaya', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Digha Nikaya', url: '/library/buddhism' },
    { id: 'static-death-judaism', text: 'The dust returns to the ground it came from, and the spirit returns to God who gave it.', reference: 'Ecclesiastes 12:7', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Ecclesiastes', url: '/library/judaism' },
    { id: 'static-death-taoism', text: 'Life is the companion of death, and death is the beginning of life. Who understands their workings?', reference: 'Zhuangzi, Chapter 22', tradition: 'Taoism', traditionKey: 'taoism', emoji: '☯️', color: '#2c6e49', book: 'Zhuangzi', url: '/library/taoism' },
  ],
  wisdom: [
    { id: 'static-wisdom-judaism', text: 'The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.', reference: 'Proverbs 9:10', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Proverbs', url: '/library/judaism' },
    { id: 'static-wisdom-buddhism', text: 'Do not believe anything simply because you have heard it. But after observation and analysis, when you find that anything agrees with reason and leads to good, accept it and live up to it.', reference: 'Kalama Sutta, Anguttara Nikaya', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Kalama Sutta', url: '/library/buddhism' },
    { id: 'static-wisdom-islam', text: 'Seeking knowledge is an obligation upon every Muslim.', reference: 'Hadith, Ibn Majah', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Hadith', url: '/library/islam' },
    { id: 'static-wisdom-hinduism', text: 'The wise grieve neither for the living nor for the dead. There was never a time when I did not exist, nor you, nor all these beings.', reference: 'Bhagavad Gita 2:11-12', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Bhagavad Gita', url: '/library/hinduism' },
    { id: 'static-wisdom-taoism', text: 'Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power.', reference: 'Tao Te Ching, Chapter 33', tradition: 'Taoism', traditionKey: 'taoism', emoji: '☯️', color: '#2c6e49', book: 'Tao Te Ching', url: '/library/taoism' },
    { id: 'static-wisdom-confucianism', text: 'When you know a thing, to hold that you know it; and when you do not know a thing, to allow that you do not know it — this is knowledge.', reference: 'Analects 2:17', tradition: 'Confucianism', traditionKey: 'confucianism', emoji: '📚', color: '#7b3f00', book: 'Analects', url: '/library/confucianism' },
  ],
  prayer: [
    { id: 'static-prayer-christianity', text: 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.', reference: 'Matthew 7:7', tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', book: 'Matthew', url: '/library/christianity' },
    { id: 'static-prayer-islam', text: 'And when My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.', reference: 'Surah Al-Baqarah 2:186', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-prayer-judaism', text: 'The LORD is near to all who call on him, to all who call on him in truth.', reference: 'Psalms 145:18', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Psalms', url: '/library/judaism' },
    { id: 'static-prayer-hinduism', text: 'Whatever you do, whatever you eat, whatever you offer or give away, whatever austerities you perform — do that as an offering to Me.', reference: 'Bhagavad Gita 9:27', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Bhagavad Gita', url: '/library/hinduism' },
    { id: 'static-prayer-sikhism', text: 'One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred. Image Of The Undying, Beyond Birth, Self-Existent.', reference: 'Japji Sahib, Mool Mantar', tradition: 'Sikhism', traditionKey: 'sikhism', emoji: '☬', color: '#1a6b3c', book: 'Guru Granth Sahib', url: '/library/sikhism' },
  ],
  suffering: [
    { id: 'static-suf-buddhism', text: 'Life is suffering. Suffering arises from attachment. The cessation of suffering is attainable. The path to cessation is the Noble Eightfold Path.', reference: 'Four Noble Truths, Dhammacakkappavattana Sutta', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Samyutta Nikaya', url: '/library/buddhism' },
    { id: 'static-suf-christianity', text: 'We also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.', reference: 'Romans 5:3-4', tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', book: 'Romans', url: '/library/christianity' },
    { id: 'static-suf-islam', text: 'Indeed, with hardship will be ease.', reference: 'Surah Ash-Sharh 94:5', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-suf-judaism', text: 'Though he slay me, yet will I hope in him.', reference: 'Job 13:15', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Job', url: '/library/judaism' },
    { id: 'static-suf-hinduism', text: 'You grieve for those who should not be grieved for, yet you speak words of wisdom. The wise grieve neither for the living nor for the dead.', reference: 'Bhagavad Gita 2:11', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Bhagavad Gita', url: '/library/hinduism' },
  ],
  gratitude: [
    { id: 'static-grat-islam', text: 'If you are grateful, I will surely increase you in favor. But if you deny, indeed, My punishment is severe.', reference: 'Surah Ibrahim 14:7', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-grat-judaism', text: 'Give thanks to the LORD, for he is good; his love endures forever.', reference: 'Psalms 107:1', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Psalms', url: '/library/judaism' },
    { id: 'static-grat-christianity', text: 'Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.', reference: '1 Thessalonians 5:18', tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', book: '1 Thessalonians', url: '/library/christianity' },
    { id: 'static-grat-buddhism', text: 'Let us rise up and be thankful, for if we didn\'t learn a lot today, at least we learned a little.', reference: 'Buddhist Teaching, attributed', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Teaching', url: '/library/buddhism' },
    { id: 'static-grat-hinduism', text: 'Contentment is the highest gain, good company the highest course, inquiry the highest wisdom, and peace the highest enjoyment.', reference: 'Yoga Vasistha', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Yoga Vasistha', url: '/library/hinduism' },
  ],
  hope: [
    { id: 'static-hope-christianity', text: 'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.', reference: 'Jeremiah 29:11', tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', book: 'Jeremiah', url: '/library/judaism' },
    { id: 'static-hope-islam', text: 'Do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.', reference: 'Surah Az-Zumar 39:53', tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', book: 'Quran', url: '/library/islam' },
    { id: 'static-hope-buddhism', text: 'Even the darkest night will end and the sun will rise.', reference: 'Buddhist Proverb', tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', book: 'Teaching', url: '/library/buddhism' },
    { id: 'static-hope-hinduism', text: 'You came here empty-handed, and you will leave empty-handed. What is yours today, belonged to someone else yesterday, and will belong to someone else the day after.', reference: 'Bhagavad Gita 2:27', tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', color: '#d45c00', book: 'Bhagavad Gita', url: '/library/hinduism' },
  ],
};

// ─── Round-robin interleaver ────────────────────────────────────────────────
function interleave(groups: SearchResult[][]): SearchResult[] {
  const result: SearchResult[] = [];
  const queues = groups.map(g => [...g]);
  let active = queues.filter(q => q.length > 0);
  while (active.length > 0) {
    for (const q of active) {
      if (q.length > 0) result.push(q.shift()!);
    }
    active = queues.filter(q => q.length > 0);
  }
  return result;
}

// ─── Get static fallback passages for a query ──────────────────────────────
function getStaticFallbacks(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  // Direct keyword match
  for (const [key, passages] of Object.entries(STATIC_PASSAGES)) {
    if (q.includes(key) || key.includes(q)) return passages;
  }
  // Partial match
  for (const [key, passages] of Object.entries(STATIC_PASSAGES)) {
    const words = q.split(/\s+/);
    if (words.some(w => w.length > 3 && key.includes(w))) return passages;
  }
  return [];
}

// ─── Bible search ───────────────────────────────────────────────────────────
async function searchBible(query: string): Promise<SearchResult[]> {
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
  const fetches = searchBooks.slice(0, 8).map(async (ref) => {
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=kjv`, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.verses || [])
        .filter((v: any) => v.text?.toLowerCase().includes(q))
        .slice(0, 2)
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
  const all = await Promise.all(fetches);
  all.forEach(r => results.push(...r));
  return results.slice(0, MAX_PER_TRADITION);
}

// ─── Quran search ───────────────────────────────────────────────────────────
async function searchQuran(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en.asad`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data?.matches || []).slice(0, MAX_PER_TRADITION).map((m: any) => ({
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

// ─── Sefaria search ─────────────────────────────────────────────────────────
async function searchSefaria(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(`https://www.sefaria.org/api/search-wrapper/text/${encodeURIComponent(query)}?size=10&applied_filters=[]`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.hits?.hits || []).slice(0, MAX_PER_TRADITION).map((hit: any) => {
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

// ─── Bhagavad Gita search ───────────────────────────────────────────────────
async function searchGita(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const q = query.toLowerCase();
  const chapters = [2, 3, 4, 9, 12, 18];
  const fetches = chapters.map(async (ch) => {
    try {
      const verseFetches = Array.from({ length: 10 }, (_, i) =>
        fetch(`https://bhagavadgitaapi.in/slok/${ch}/${i + 1}`, { next: { revalidate: 86400 } })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null)
      );
      const verses = await Promise.all(verseFetches);
      return verses
        .filter((v: any) => v && (v.tej?.et || v.spidr?.et || '').toLowerCase().includes(q))
        .slice(0, 2)
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
  const all = await Promise.all(fetches);
  all.forEach(r => results.push(...r));
  return results.slice(0, MAX_PER_TRADITION);
}

// ─── Buddhist search ─────────────────────────────────────────────────────────
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
        .slice(0, 2)
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
  const all = await Promise.all(fetches);
  all.forEach(r => results.push(...r));
  return results.slice(0, MAX_PER_TRADITION);
}

// ─── Main handler ────────────────────────────────────────────────────────────
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

  // Round-robin interleave — guaranteed cross-tradition diversity
  const interleaved = interleave([
    quranResults,
    sefariaResults,
    bibleResults,
    gitaResults,
    buddhistResults,
  ]);

  // Dedupe
  const seen = new Set<string>();
  const liveResults = interleaved.filter(r => {
    const key = r.text.slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Count distinct traditions in live results
  const liveTraditions = new Set(liveResults.map(r => r.traditionKey)).size;

  // If fewer than 3 traditions represented, supplement with static fallbacks
  let finalResults = liveResults;
  if (liveTraditions < 3) {
    const fallbacks = getStaticFallbacks(query);
    const liveKeys = new Set(liveResults.map(r => r.traditionKey));
    // Add fallbacks from traditions not already represented
    const supplements = fallbacks.filter(f => !liveKeys.has(f.traditionKey));
    // Interleave supplements into live results
    finalResults = interleave([liveResults, supplements]);
  }

  // Final dedup pass
  const finalSeen = new Set<string>();
  const unique = finalResults.filter(r => {
    const key = r.text.slice(0, 80);
    if (finalSeen.has(key)) return false;
    finalSeen.add(key);
    return true;
  }).slice(0, 25);

  const traditionCounts: Record<string, number> = {};
  unique.forEach(r => {
    traditionCounts[r.traditionKey] = (traditionCounts[r.traditionKey] || 0) + 1;
  });

  return NextResponse.json({
    results: unique,
    query,
    traditions: traditionCounts,
    total: unique.length,
    traditionCount: Object.keys(traditionCounts).length,
  });
}
