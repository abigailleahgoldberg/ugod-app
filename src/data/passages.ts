export interface Passage {
  id: string;
  text: string;
  reference: string;
  tradition: string;
  traditionKey: string;
  themes: string[];
  crossRefs?: string[];
  audioAvailable?: boolean;
}

export interface Tradition {
  key: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  textCount: number;
  passageCount: number;
}

export const traditions: Tradition[] = [
  { key: 'judaism', name: 'Judaism', emoji: '✡️', color: '#2a5db0', description: 'Torah, Talmud, Psalms, Prophets, Kabbalah', textCount: 300, passageCount: 3000000 },
  { key: 'christianity', name: 'Christianity', emoji: '✝️', color: '#8b2332', description: 'Bible, Gospels, Epistles, Church Fathers', textCount: 2500, passageCount: 780000 },
  { key: 'islam', name: 'Islam', emoji: '☪️', color: '#1a7a4c', description: 'Quran, Hadith, Sufi Poetry', textCount: 50, passageCount: 300000 },
  { key: 'buddhism', name: 'Buddhism', emoji: '☸️', color: '#d4832f', description: 'Pali Canon, Mahayana Sutras, Zen Koans', textCount: 10000, passageCount: 500000 },
  { key: 'hinduism', name: 'Hinduism', emoji: '🕉️', color: '#d45c00', description: 'Vedas, Upanishads, Bhagavad Gita, Ramayana', textCount: 100, passageCount: 100000 },
  { key: 'sikhism', name: 'Sikhism', emoji: '🪯', color: '#1c3f94', description: 'Guru Granth Sahib, Dasam Granth', textCount: 2, passageCount: 5894 },
  { key: 'taoism', name: 'Taoism', emoji: '☯️', color: '#2a2a2a', description: 'Tao Te Ching, Zhuangzi, I Ching', textCount: 20, passageCount: 50000 },
  { key: 'sufism', name: 'Sufism', emoji: '🌀', color: '#6b4f8a', description: 'Rumi, Hafiz, Ibn Arabi, Rabia', textCount: 30, passageCount: 80000 },
  { key: 'fivepercent', name: 'Five Percenters', emoji: '⭐', color: '#d4af37', description: 'Supreme Mathematics, Supreme Alphabet, 120 Lessons', textCount: 5, passageCount: 5000 },
  { key: 'african', name: 'African Traditions', emoji: '🌍', color: '#6b4226', description: 'Yoruba, Ifa, Vodou, Candomble, Rastafari', textCount: 50, passageCount: 150000 },
  { key: 'ancient', name: 'Ancient Traditions', emoji: '🏛️', color: '#8b7355', description: 'Sumerian, Egyptian, Greek, Norse, Celtic', textCount: 80, passageCount: 200000 },
  { key: 'indigenous', name: 'Indigenous Wisdom', emoji: '🌿', color: '#3d6b35', description: 'Native American, Aboriginal, Pacific Islands', textCount: 40, passageCount: 50000 },
  { key: 'jainism', name: 'Jainism', emoji: '🤲', color: '#cc6633', description: 'Agamas, Tattvartha Sutra', textCount: 45, passageCount: 30000 },
  { key: 'bahai', name: "Baha'i Faith", emoji: '✴️', color: '#6b1d3a', description: 'Kitab-i-Aqdas, Kitab-i-Iqan, Hidden Words', textCount: 15, passageCount: 20000 },
  { key: 'zoroastrianism', name: 'Zoroastrianism', emoji: '🔥', color: '#cc3300', description: 'Avesta, Gathas, Vendidad', textCount: 10, passageCount: 15000 },
  { key: 'confucianism', name: 'Confucianism', emoji: '📜', color: '#5c4033', description: 'Analects, Mencius, Great Learning', textCount: 15, passageCount: 40000 },
  { key: 'shinto', name: 'Shinto', emoji: '⛩️', color: '#cc3333', description: 'Kojiki, Nihon Shoki, Norito', textCount: 5, passageCount: 10000 },
];

export const featuredPassages: Passage[] = [
  {
    id: 'ps-23',
    text: 'The Lord is my shepherd, I shall not want. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name\'s sake. Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
    reference: 'Psalm 23:1-4',
    tradition: 'Judaism',
    traditionKey: 'judaism',
    themes: ['Comfort', 'Trust', 'Guidance', 'Divine Protection'],
    crossRefs: ['quran-2-186', 'gita-18-66', 'rumi-guest'],
  },
  {
    id: 'quran-2-186',
    text: 'When My servants ask you about Me, I am near. I respond to the call of the caller when he calls upon Me. So let them respond to Me and believe in Me, that they may be guided.',
    reference: 'Quran 2:186',
    tradition: 'Islam',
    traditionKey: 'islam',
    themes: ['Divine Presence', 'Prayer', 'Guidance'],
    crossRefs: ['ps-23', 'gita-18-66'],
  },
  {
    id: 'gita-18-66',
    text: 'Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions; do not fear.',
    reference: 'Bhagavad Gita 18:66',
    tradition: 'Hinduism',
    traditionKey: 'hinduism',
    themes: ['Surrender', 'Divine Grace', 'Liberation', 'Trust'],
    crossRefs: ['ps-23', 'quran-2-186'],
  },
  {
    id: 'rumi-guest',
    text: 'This being human is a guest house. Every morning a new arrival. A joy, a depression, a meanness, some momentary awareness comes as an unexpected visitor. Welcome and entertain them all! Even if they are a crowd of sorrows, who violently sweep your house empty of its furniture, still, treat each guest honorably. He may be clearing you out for some new delight.',
    reference: 'The Guest House — Rumi',
    tradition: 'Sufism',
    traditionKey: 'sufism',
    themes: ['Acceptance', 'Suffering', 'Transformation', 'Wisdom'],
    crossRefs: ['ps-23', 'heart-sutra'],
  },
  {
    id: 'heart-sutra',
    text: 'Form is emptiness, emptiness is form. Emptiness is not other than form, form is not other than emptiness.',
    reference: 'Heart Sutra (Prajnaparamita)',
    tradition: 'Buddhism',
    traditionKey: 'buddhism',
    themes: ['Emptiness', 'Non-duality', 'Wisdom', 'Liberation'],
    crossRefs: ['ttc-1', 'rumi-guest'],
  },
  {
    id: 'ttc-1',
    text: 'The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name. The nameless is the beginning of heaven and earth. The named is the mother of ten thousand things.',
    reference: 'Tao Te Ching, Chapter 1',
    tradition: 'Taoism',
    traditionKey: 'taoism',
    themes: ['Mystery', 'Origin', 'Transcendence', 'Language'],
    crossRefs: ['heart-sutra'],
  },
  {
    id: 'japji',
    text: 'There is One God, whose name is Truth, the Creator, without fear, without hate, timeless in form, beyond birth and death, self-existent. By the Guru\'s grace.',
    reference: 'Japji Sahib, Mool Mantar — Guru Nanak',
    tradition: 'Sikhism',
    traditionKey: 'sikhism',
    themes: ['Oneness', 'Truth', 'Creation', 'Divine Nature'],
  },
  {
    id: 'dhammapada-1',
    text: 'Mind is the forerunner of all actions. All deeds are led by mind, created by mind. If one speaks or acts with a corrupt mind, suffering follows, as the wheel follows the hoof of an ox. If one speaks or acts with a serene mind, happiness follows, as a shadow that never departs.',
    reference: 'Dhammapada 1-2',
    tradition: 'Buddhism',
    traditionKey: 'buddhism',
    themes: ['Mind', 'Karma', 'Suffering', 'Happiness'],
  },
  {
    id: 'genesis-1-1',
    text: 'In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters. And God said, "Let there be light," and there was light.',
    reference: 'Genesis 1:1-3',
    tradition: 'Judaism',
    traditionKey: 'judaism',
    themes: ['Creation', 'Light', 'Divine Speech', 'Origin'],
    crossRefs: ['quran-21-30', 'rv-10-129'],
  },
  {
    id: 'rv-10-129',
    text: 'There was neither non-existence nor existence then. There was neither the realm of space nor the sky which is beyond. What stirred? Where? In whose protection? Was there water, bottomlessly deep? There was neither death nor immortality then. Who really knows? Who will here proclaim it? Whence was it produced? Whence is this creation? Even the gods came after its creation. Who then knows whence it has arisen?',
    reference: 'Rig Veda 10.129 (Nasadiya Sukta)',
    tradition: 'Hinduism',
    traditionKey: 'hinduism',
    themes: ['Creation', 'Mystery', 'Origin', 'Doubt'],
    crossRefs: ['genesis-1-1', 'ttc-1'],
  },
  {
    id: '1cor-13',
    text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres. Love never fails.',
    reference: '1 Corinthians 13:4-8',
    tradition: 'Christianity',
    traditionKey: 'christianity',
    themes: ['Love', 'Virtue', 'Patience', 'Truth'],
    crossRefs: ['metta-sutta', 'rabia-love'],
  },
  {
    id: 'metta-sutta',
    text: 'May all beings be happy. May all beings be safe. May all beings be healthy. May all beings live with ease. Whatever living beings there may be — weak or strong, tall or short, large or small, seen or unseen, near or far, born or yet to be born — may all beings be happy.',
    reference: 'Metta Sutta (Sutta Nipata 1.8)',
    tradition: 'Buddhism',
    traditionKey: 'buddhism',
    themes: ['Love', 'Compassion', 'Universal Kindness', 'Prayer'],
    crossRefs: ['1cor-13', 'rabia-love'],
  },
  {
    id: 'rabia-love',
    text: 'O God, if I worship You from fear of Hell, burn me in Hell. If I worship You in hope of Paradise, exclude me from Paradise. But if I worship You for Your own sake, do not withhold from me Your Everlasting Beauty.',
    reference: 'Rabia al-Adawiyya',
    tradition: 'Sufism',
    traditionKey: 'sufism',
    themes: ['Love', 'Devotion', 'Selflessness', 'Divine Beauty'],
    crossRefs: ['1cor-13', 'metta-sutta'],
  },
  {
    id: 'sup-math',
    text: 'Knowledge is the foundation of all things. Wisdom is the wise application of knowledge. Understanding is the clear mental picture one draws from knowledge and wisdom. Knowledge, Wisdom, and Understanding are the first three principles of the Supreme Mathematics — the very building blocks of reality itself.',
    reference: 'Supreme Mathematics — 1, 2, 3',
    tradition: 'Five Percenters',
    traditionKey: 'fivepercent',
    themes: ['Knowledge', 'Wisdom', 'Understanding', 'Foundation'],
  },
  {
    id: 'gilgamesh',
    text: 'He who has seen everything, I will make known to the lands. I will teach about him who experienced all things. Anu granted him the totality of knowledge of all. He saw the Secret, discovered the Hidden, he brought information of the time before the Flood.',
    reference: 'Epic of Gilgamesh, Tablet I',
    tradition: 'Ancient Traditions',
    traditionKey: 'ancient',
    themes: ['Knowledge', 'Wisdom', 'Mortality', 'Quest'],
  },
  {
    id: 'ifa-proverb',
    text: 'The world is a marketplace we visit. The otherworld is home. We come to the market, make our purchases, and return home. The wise make good purchases; the foolish come home empty-handed.',
    reference: 'Ifa Proverb (Yoruba)',
    tradition: 'African Traditions',
    traditionKey: 'african',
    themes: ['Life Purpose', 'Wisdom', 'Death', 'Preparation'],
  },
];

// Thematic search index
export const themeIndex: Record<string, string[]> = {
  'love': ['1cor-13', 'metta-sutta', 'rabia-love', 'rumi-guest'],
  'comfort': ['ps-23', 'quran-2-186', 'gita-18-66', 'rumi-guest'],
  'creation': ['genesis-1-1', 'rv-10-129', 'ttc-1', 'gilgamesh'],
  'wisdom': ['dhammapada-1', 'sup-math', 'ttc-1', 'ifa-proverb'],
  'suffering': ['rumi-guest', 'dhammapada-1', 'heart-sutra'],
  'oneness': ['japji', 'heart-sutra', 'quran-2-186'],
  'forgiveness': ['1cor-13', 'ps-23', 'quran-2-186'],
  'death': ['ifa-proverb', 'gilgamesh', 'gita-18-66', 'heart-sutra'],
  'peace': ['ps-23', 'metta-sutta', 'ttc-1', 'japji'],
  'trust': ['ps-23', 'quran-2-186', 'gita-18-66'],
  'knowledge': ['sup-math', 'gilgamesh', 'dhammapada-1', 'ttc-1'],
  'prayer': ['quran-2-186', 'metta-sutta', 'japji', 'rabia-love'],
  'liberation': ['gita-18-66', 'heart-sutra', 'dhammapada-1'],
  'mystery': ['rv-10-129', 'ttc-1', 'heart-sutra'],
  'divine presence': ['ps-23', 'quran-2-186', 'japji'],
  'mind': ['dhammapada-1', 'heart-sutra', 'sup-math'],
  'lost': ['ps-23', 'quran-2-186', 'gita-18-66', 'rumi-guest'],
  'alone': ['ps-23', 'quran-2-186', 'gita-18-66'],
  'angry': ['rumi-guest', 'dhammapada-1', '1cor-13'],
  'afraid': ['ps-23', 'gita-18-66', 'quran-2-186'],
  'sad': ['ps-23', 'rumi-guest', 'metta-sutta'],
  'meaning of life': ['ifa-proverb', 'gilgamesh', 'gita-18-66', 'dhammapada-1'],
  'golden rule': ['1cor-13', 'dhammapada-1', 'metta-sutta'],
  'god': ['japji', 'genesis-1-1', 'quran-2-186', 'rabia-love'],
  'meditation': ['dhammapada-1', 'heart-sutra', 'ttc-1'],
  'emptiness': ['heart-sutra', 'ttc-1', 'rv-10-129'],
};

export function searchPassages(query: string): Passage[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  // Check direct theme matches
  const matched = new Set<string>();
  for (const [theme, ids] of Object.entries(themeIndex)) {
    if (q.includes(theme) || theme.includes(q)) {
      ids.forEach(id => matched.add(id));
    }
  }
  
  // Also search passage text and reference
  for (const p of featuredPassages) {
    if (p.text.toLowerCase().includes(q) || 
        p.reference.toLowerCase().includes(q) ||
        p.tradition.toLowerCase().includes(q) ||
        p.themes.some(t => t.toLowerCase().includes(q))) {
      matched.add(p.id);
    }
  }
  
  // Word-level matching for multi-word queries
  const words = q.split(/\s+/).filter(w => w.length > 2);
  for (const word of words) {
    for (const [theme, ids] of Object.entries(themeIndex)) {
      if (theme.includes(word) || word.includes(theme)) {
        ids.forEach(id => matched.add(id));
      }
    }
    for (const p of featuredPassages) {
      if (p.text.toLowerCase().includes(word) || 
          p.themes.some(t => t.toLowerCase().includes(word))) {
        matched.add(p.id);
      }
    }
  }
  
  return featuredPassages.filter(p => matched.has(p.id));
}

export function getDailyVerse(): Passage {
  const day = new Date().getDate();
  return featuredPassages[day % featuredPassages.length];
}

export function getPassageById(id: string): Passage | undefined {
  return featuredPassages.find(p => p.id === id);
}

export function getCrossRefs(passage: Passage): Passage[] {
  if (!passage.crossRefs) return [];
  return passage.crossRefs
    .map(id => featuredPassages.find(p => p.id === id))
    .filter(Boolean) as Passage[];
}
