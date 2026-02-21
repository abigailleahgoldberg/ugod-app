// Cross-reference map: thematic connections between traditions
// Each entry maps a theme to passages across traditions that express the same wisdom

export interface CrossRef {
  theme: string;
  passages: {
    tradition: string;
    traditionKey: string;
    emoji: string;
    reference: string;
    snippet: string;
    url: string;
  }[];
}

export const crossRefMap: CrossRef[] = [
  {
    theme: 'The Golden Rule',
    passages: [
      { tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', reference: 'Matthew 7:12', snippet: 'Do unto others as you would have them do unto you.', url: '/library/christianity/matthew?chapter=7' },
      { tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', reference: 'Hadith (An-Nawawi 13)', snippet: 'None of you truly believes until he wishes for his brother what he wishes for himself.', url: '/library/islam/surah-2' },
      { tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', reference: 'Leviticus 19:18', snippet: 'Love your neighbor as yourself.', url: '/library/judaism/Leviticus' },
      { tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', reference: 'Mahabharata 5.1517', snippet: 'One should never do to another what one regards as injurious to oneself.', url: '/library/hinduism/gita-2' },
      { tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', reference: 'Dhammapada 10:1', snippet: 'All tremble at violence; all fear death. Putting oneself in the place of another, one should not kill nor cause another to kill.', url: '/library/buddhism/dhp129-145' },
      { tradition: 'Confucianism', traditionKey: 'confucianism', emoji: '📜', reference: 'Analects 15:24', snippet: 'What you do not wish done to yourself, do not do to others.', url: '/library/confucianism/analects-15' },
      { tradition: 'Sikhism', traditionKey: 'sikhism', emoji: '🪯', reference: 'Guru Granth Sahib, Ang 1299', snippet: 'I am a stranger to no one; and no one is a stranger to me. Indeed, I am a friend to all.', url: '/library/sikhism/ang-1201' },
    ],
  },
  {
    theme: 'Divine Compassion & Mercy',
    passages: [
      { tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', reference: 'Quran 1:1', snippet: 'In the name of God, the Most Gracious, the Most Merciful.', url: '/library/islam/surah-1' },
      { tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', reference: 'Psalm 23:1', snippet: 'The Lord is my shepherd, I shall not want.', url: '/library/judaism/Psalms' },
      { tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', reference: 'Luke 6:36', snippet: 'Be merciful, just as your Father is merciful.', url: '/library/christianity/luke?chapter=6' },
      { tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', reference: 'Snp 1.8', snippet: 'As a mother would risk her life to protect her child, her only child, even so should one cultivate a limitless heart with regard to all beings.', url: '/library/buddhism/snp1.8' },
      { tradition: 'Sikhism', traditionKey: 'sikhism', emoji: '🪯', reference: 'Guru Granth Sahib, Ang 1', snippet: 'One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred.', url: '/library/sikhism/ang-1' },
    ],
  },
  {
    theme: 'Impermanence & Letting Go',
    passages: [
      { tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', reference: 'Dhammapada 20:277', snippet: 'All conditioned things are impermanent. When one sees this with wisdom, one turns away from suffering.', url: '/library/buddhism/dhp273-289' },
      { tradition: 'Taoism', traditionKey: 'taoism', emoji: '☯️', reference: 'Tao Te Ching 76', snippet: 'A man is born gentle and weak. At his death he is hard and stiff. The soft and yielding is the disciple of life.', url: '/library/taoism/tao-76?chapter=76' },
      { tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', reference: 'Ecclesiastes 3:1-2', snippet: 'To everything there is a season, and a time to every purpose under heaven.', url: '/library/christianity/ecclesiastes?chapter=3' },
      { tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', reference: 'Bhagavad Gita 2:22', snippet: 'As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.', url: '/library/hinduism/gita-2' },
      { tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', reference: 'Quran 55:26-27', snippet: 'Everyone upon the earth will perish, and there will remain the Face of your Lord, Owner of Majesty and Honor.', url: '/library/islam/surah-55' },
    ],
  },
  {
    theme: 'The Path to Wisdom',
    passages: [
      { tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', reference: 'Proverbs 4:7', snippet: 'Wisdom is the principal thing; therefore get wisdom. And in all your getting, get understanding.', url: '/library/judaism/Proverbs' },
      { tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', reference: 'Dhammapada 20:282', snippet: 'Wisdom springs from meditation; without meditation wisdom wanes.', url: '/library/buddhism/dhp273-289' },
      { tradition: 'Confucianism', traditionKey: 'confucianism', emoji: '📜', reference: 'Analects 2:11', snippet: 'If you study the past and use it to understand the present, you are worthy of being a teacher.', url: '/library/confucianism/analects-2' },
      { tradition: 'Taoism', traditionKey: 'taoism', emoji: '☯️', reference: 'Tao Te Ching 33', snippet: 'Knowing others is intelligence; knowing yourself is true wisdom.', url: '/library/taoism/tao-33?chapter=33' },
      { tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', reference: 'Quran 39:9', snippet: 'Are those who know equal to those who do not know?', url: '/library/islam/surah-39' },
      { tradition: 'Zoroastrianism', traditionKey: 'zoroastrianism', emoji: '🔥', reference: 'Yasna 30:2', snippet: 'Hear with your ears the best things; look upon them with clear-seeing thought, for decision between the two Beliefs.', url: '/library/zoroastrianism/gatha-30' },
    ],
  },
  {
    theme: 'Humility & Surrender',
    passages: [
      { tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', reference: 'Bhagavad Gita 18:66', snippet: 'Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions; do not fear.', url: '/library/hinduism/gita-18' },
      { tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', reference: 'Matthew 5:5', snippet: 'Blessed are the meek, for they shall inherit the earth.', url: '/library/christianity/matthew?chapter=5' },
      { tradition: 'Taoism', traditionKey: 'taoism', emoji: '☯️', reference: 'Tao Te Ching 22', snippet: 'If you want to become whole, let yourself be partial. If you want to become full, let yourself be empty.', url: '/library/taoism/tao-22?chapter=22' },
      { tradition: 'Islam', traditionKey: 'islam', emoji: '☪️', reference: 'Quran 2:45', snippet: 'Seek help through patience and prayer. It is indeed exacting, but not for those who are humble.', url: '/library/islam/surah-2' },
      { tradition: 'Sikhism', traditionKey: 'sikhism', emoji: '🪯', reference: 'Guru Granth Sahib', snippet: 'Through selfless service, eternal peace is obtained.', url: '/library/sikhism/ang-1' },
    ],
  },
  {
    theme: 'Good vs Evil / Light vs Darkness',
    passages: [
      { tradition: 'Zoroastrianism', traditionKey: 'zoroastrianism', emoji: '🔥', reference: 'Yasna 30:3', snippet: 'Now the two primal Spirits, who reveal themselves as Twins, are the Better and the Bad, in thought and word and action.', url: '/library/zoroastrianism/gatha-30' },
      { tradition: 'Christianity', traditionKey: 'christianity', emoji: '✝️', reference: 'John 1:5', snippet: 'The light shines in the darkness, and the darkness has not overcome it.', url: '/library/christianity/john?chapter=1' },
      { tradition: 'Buddhism', traditionKey: 'buddhism', emoji: '☸️', reference: 'Dhammapada 1:1-2', snippet: 'Mind is the forerunner of all actions. If one speaks or acts with a pure mind, happiness follows like a shadow.', url: '/library/buddhism/dhp1-20' },
      { tradition: 'Judaism', traditionKey: 'judaism', emoji: '✡️', reference: 'Genesis 1:3', snippet: 'And God said, Let there be light: and there was light.', url: '/library/judaism/Genesis' },
      { tradition: 'Hinduism', traditionKey: 'hinduism', emoji: '🕉️', reference: 'Bhagavad Gita 16:21', snippet: 'There are three gates to self-destructive hell: lust, anger, and greed. Therefore, one must learn to give these up.', url: '/library/hinduism/gita-16' },
    ],
  },
];

// Find cross-references for a given tradition and theme keywords
export function findCrossRefs(traditionKey: string, text: string): CrossRef[] {
  const words = text.toLowerCase();
  const themes: string[] = [];
  
  if (words.includes('love') || words.includes('neighbor') || words.includes('unto others')) themes.push('The Golden Rule');
  if (words.includes('mercy') || words.includes('compassion') || words.includes('shepherd') || words.includes('gracious')) themes.push('Divine Compassion & Mercy');
  if (words.includes('imperma') || words.includes('death') || words.includes('perish') || words.includes('season') || words.includes('passing')) themes.push('Impermanence & Letting Go');
  if (words.includes('wisdom') || words.includes('knowledge') || words.includes('understand') || words.includes('learn')) themes.push('The Path to Wisdom');
  if (words.includes('humble') || words.includes('surrender') || words.includes('meek') || words.includes('empty')) themes.push('Humility & Surrender');
  if (words.includes('light') || words.includes('dark') || words.includes('evil') || words.includes('good') || words.includes('pure')) themes.push('Good vs Evil / Light vs Darkness');

  return crossRefMap
    .filter(cr => themes.includes(cr.theme))
    .map(cr => ({
      ...cr,
      // Filter out passages from the same tradition
      passages: cr.passages.filter(p => p.traditionKey !== traditionKey),
    }));
}
