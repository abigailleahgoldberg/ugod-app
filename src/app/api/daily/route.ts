import { NextResponse } from 'next/server';

interface DailyVerse {
  text: string;
  reference: string;
  tradition: string;
  traditionKey: string;
  emoji: string;
  color: string;
  url: string;
}

// Rotate through traditions based on day of year
const TRADITION_CYCLE = [
  'bible', 'quran', 'sefaria', 'suttacentral', 'gita', 'sikh', 'tao', 'analects',
];

async function getDailyFromBible(): Promise<DailyVerse | null> {
  const refs = ['Psalms 23', 'Psalms 91', 'Psalms 1', 'Proverbs 3', 'Isaiah 40', 'Matthew 5', 'John 1', 'Romans 8', '1 Corinthians 13', 'Philippians 4'];
  const day = new Date().getDate();
  const ref = refs[day % refs.length];
  try {
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}:1-3?translation=kjv`);
    if (!res.ok) return null;
    const data = await res.json();
    const text = (data.verses || []).map((v: any) => v.text?.trim()).join(' ');
    return { text, reference: `${ref}:1-3 (KJV)`, tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', color: '#8b2332', url: '/library/christianity' };
  } catch { return null; }
}

async function getDailyFromQuran(): Promise<DailyVerse | null> {
  const day = new Date().getDate();
  const surah = [1, 2, 36, 55, 67, 93, 94, 112, 113, 114][day % 10];
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surah}/en.asad`);
    if (!res.ok) return null;
    const data = await res.json();
    const ayahs = data.data?.ayahs || [];
    const ayah = ayahs[day % ayahs.length];
    return { text: ayah?.text?.trim() || '', reference: `Surah ${data.data.englishName} ${surah}:${ayah?.numberInSurah}`, tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', color: '#1a7a4c', url: `/library/islam/surah-${surah}` };
  } catch { return null; }
}

async function getDailyFromSefaria(): Promise<DailyVerse | null> {
  const refs = ['Psalms.1', 'Psalms.23', 'Proverbs.3', 'Ecclesiastes.3', 'Pirkei_Avot.1', 'Pirkei_Avot.2'];
  const day = new Date().getDate();
  const ref = refs[day % refs.length];
  try {
    const res = await fetch(`https://www.sefaria.org/api/texts/${ref}?context=0`);
    if (!res.ok) return null;
    const data = await res.json();
    const texts: string[] = Array.isArray(data.text) ? data.text.flat(3) : [data.text];
    const verse = texts.filter(Boolean)[day % texts.length] || texts[0];
    const clean = (verse || '').replace(/<[^>]*>/g, '').trim();
    return { text: clean, reference: ref.replace(/_/g, ' '), tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', color: '#2a5db0', url: `/library/judaism/${ref.split('.')[0]}` };
  } catch { return null; }
}

async function getDailyFromBuddhism(): Promise<DailyVerse | null> {
  const chapters = ['dhp1-20', 'dhp21-32', 'dhp33-43', 'dhp44-59', 'dhp76-89', 'dhp179-196', 'dhp273-289'];
  const day = new Date().getDate();
  const uid = chapters[day % chapters.length];
  try {
    const res = await fetch(`https://suttacentral.net/api/bilarasuttas/${uid}/sujato`);
    if (!res.ok) return null;
    const data = await res.json();
    const texts = Object.values(data.translation_text || {}).filter((t: any) => t && t.trim().length > 20) as string[];
    const verse = texts[day % texts.length] || texts[0];
    return { text: verse?.trim() || '', reference: `Dhammapada — ${uid}`, tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', color: '#d4832f', url: `/library/buddhism/${uid}` };
  } catch { return null; }
}

async function getDailyFromSikh(): Promise<DailyVerse | null> {
  const day = new Date().getDate();
  const ang = (day * 17) % 1430 + 1; // Pseudo-random page
  try {
    const res = await fetch(`https://api.gurbaninow.com/v2/ang/${ang}`);
    if (!res.ok) return null;
    const data = await res.json();
    const lines = data.page || [];
    const line = lines[day % lines.length];
    const text = line?.line?.translation?.english?.default || '';
    return { text, reference: `Sri Guru Granth Sahib, Ang ${ang}`, tradition: 'Sikhism', traditionKey: 'sikhism', emoji: '🪯', color: '#1c3f94', url: `/library/sikhism/ang-${ang}` };
  } catch { return null; }
}

const fetchers = [getDailyFromBible, getDailyFromQuran, getDailyFromSefaria, getDailyFromBuddhism, getDailyFromSikh];

export async function GET() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const idx = dayOfYear % fetchers.length;

  // Try the tradition for today, fallback to others
  for (let i = 0; i < fetchers.length; i++) {
    const fetcher = fetchers[(idx + i) % fetchers.length];
    try {
      const verse = await fetcher();
      if (verse && verse.text.length > 10) {
        return NextResponse.json(verse);
      }
    } catch {}
  }

  // Ultimate fallback
  return NextResponse.json({
    text: 'The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.',
    reference: 'Tao Te Ching, Chapter 1',
    tradition: 'Taoism',
    traditionKey: 'taoism',
    emoji: '☯️',
    color: '#2a2a2a',
    url: '/library/taoism/tao-1',
  });
}
