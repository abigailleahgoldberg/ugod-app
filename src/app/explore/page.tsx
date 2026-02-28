import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Explore Sacred Texts — U-God',
  description: 'Discover sacred texts by theme. Browse creation stories, texts about love, grief, prayer, and wisdom across 25+ world traditions.',
  alternates: { canonical: 'https://u-god.com/explore' },
};

const collections = [
  { theme: 'Creation Stories', emoji: '🌌', query: 'in the beginning creation', desc: 'How every tradition explains the origin of the universe.' },
  { theme: 'Love & Devotion', emoji: '❤️', query: 'love devotion beloved', desc: 'Sacred poetry and scripture on love across all faiths.' },
  { theme: 'Death & Afterlife', emoji: '🕯️', query: 'death afterlife soul eternal', desc: 'What the world\'s religions say about what comes next.' },
  { theme: 'Grief & Suffering', emoji: '🌧️', query: 'grief suffering sorrow lament', desc: 'Passages of comfort for the darkest moments.' },
  { theme: 'Wisdom & Knowledge', emoji: '🦉', query: 'wisdom knowledge understanding truth', desc: 'The pursuit of wisdom from Proverbs to the Analects.' },
  { theme: 'Prayer & Worship', emoji: '🙏', query: 'prayer worship praise God', desc: 'How humanity speaks to the divine across traditions.' },
  { theme: 'Forgiveness & Mercy', emoji: '🕊️', query: 'forgiveness mercy compassion', desc: 'Sacred texts on forgiveness, grace, and letting go.' },
  { theme: 'Justice & Righteousness', emoji: '⚖️', query: 'justice righteousness law equity', desc: 'The moral and ethical foundations of world religion.' },
  { theme: 'Nature & the Sacred', emoji: '🌿', query: 'nature earth sacred land river', desc: 'Traditions that find the divine in the natural world.' },
  { theme: 'Inner Peace', emoji: '☮️', query: 'peace stillness calm mind liberation', desc: 'The path to stillness in Buddhism, Taoism, and beyond.' },
  { theme: 'The Soul', emoji: '✨', query: 'soul spirit breath divine within', desc: 'What is the self? Answers from across 5,000 years.' },
  { theme: 'Sacred Silence', emoji: '🤫', query: 'silence contemplation meditation quiet', desc: 'The mystical traditions of stillness and non-words.' },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <section className="hero-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🌍</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Explore</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Don&apos;t know what you&apos;re searching for yet? Browse sacred texts by theme — curated collections from across all 25+ traditions.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map(col => (
            <Link
              key={col.theme}
              href={`/search?q=${encodeURIComponent(col.query)}`}
              className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-[var(--gold)]/40 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-3">{col.emoji}</div>
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold)] transition-colors">{col.theme}</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{col.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
