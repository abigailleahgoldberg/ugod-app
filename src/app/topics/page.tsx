import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Browse Sacred Texts by Topic — U-God',
  description: 'Browse sacred texts by topic across 25+ world religions. Find what Judaism, Christianity, Islam, Buddhism, Hinduism, and more say about love, death, prayer, and wisdom.',
  alternates: { canonical: 'https://u-god.com/topics' },
};

const topics = [
  { label: 'Love', emoji: '❤️', query: 'love beloved devotion' },
  { label: 'Death', emoji: '🕯️', query: 'death dying afterlife' },
  { label: 'Prayer', emoji: '🙏', query: 'prayer worship praise' },
  { label: 'Forgiveness', emoji: '🕊️', query: 'forgiveness mercy pardon' },
  { label: 'Wisdom', emoji: '🦉', query: 'wisdom knowledge truth' },
  { label: 'Creation', emoji: '🌌', query: 'creation origin beginning' },
  { label: 'Faith', emoji: '✨', query: 'faith belief trust God' },
  { label: 'Justice', emoji: '⚖️', query: 'justice righteousness equity' },
  { label: 'Suffering', emoji: '🌧️', query: 'suffering pain grief sorrow' },
  { label: 'Peace', emoji: '☮️', query: 'peace stillness tranquility' },
  { label: 'Light', emoji: '💡', query: 'light darkness illumination' },
  { label: 'Soul', emoji: '🌀', query: 'soul spirit breath divine' },
  { label: 'Gratitude', emoji: '🌸', query: 'gratitude thankfulness blessing' },
  { label: 'Nature', emoji: '🌿', query: 'nature earth sky river sacred land' },
  { label: 'Silence', emoji: '🤫', query: 'silence stillness meditation' },
  { label: 'Humility', emoji: '🏔️', query: 'humility pride servant lowly' },
  { label: 'Compassion', emoji: '🤲', query: 'compassion kindness mercy care' },
  { label: 'Hope', emoji: '🌅', query: 'hope future promise redemption' },
  { label: 'Sin & Redemption', emoji: '🔥', query: 'sin redemption repentance atonement' },
  { label: 'Sacred Law', emoji: '📖', query: 'law commandment covenant precept' },
  { label: 'Meditation', emoji: '🧘', query: 'meditation contemplation mindfulness' },
  { label: 'God & the Divine', emoji: '∞', query: 'God divine the one infinite' },
  { label: 'Community', emoji: '👥', query: 'community brotherhood unity together' },
  { label: 'The Prophet', emoji: '🌙', query: 'prophet messenger revelation word' },
];

export default function TopicsPage() {
  return (
    <div className="min-h-screen">
      <section className="hero-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Topics</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every major theme in sacred literature — see how 25+ traditions approach the questions that define human existence.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {topics.map(topic => (
            <Link
              key={topic.label}
              href={`/search?q=${encodeURIComponent(topic.query)}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[var(--gold)]/40 hover:shadow-sm transition-all group"
            >
              <span className="text-xl">{topic.emoji}</span>
              <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">{topic.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
