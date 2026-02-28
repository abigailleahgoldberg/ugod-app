import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compare Sacred Texts Across Traditions — U-God',
  description: 'Compare how different world religions address the same questions. See side-by-side what Judaism, Christianity, Islam, Buddhism, Hinduism, and more say about life\'s deepest themes.',
  alternates: { canonical: 'https://u-god.com/compare' },
};

const comparisons = [
  { topic: 'What happens after death?', emoji: '🕯️', traditions: ['Judaism', 'Christianity', 'Islam', 'Buddhism', 'Hinduism'], query: 'death afterlife soul resurrection' },
  { topic: 'How should we treat our enemies?', emoji: '⚔️', traditions: ['Christianity', 'Islam', 'Buddhism', 'Judaism', 'Taoism'], query: 'enemy love forgive turn other cheek' },
  { topic: 'What is the nature of God?', emoji: '∞', traditions: ['Judaism', 'Christianity', 'Islam', 'Hinduism', 'Sikhism'], query: 'God divine nature one infinite' },
  { topic: 'How do we find inner peace?', emoji: '☮️', traditions: ['Buddhism', 'Taoism', 'Hinduism', 'Sufism', 'Christianity'], query: 'inner peace stillness liberation free' },
  { topic: 'What is the meaning of suffering?', emoji: '🌧️', traditions: ['Buddhism', 'Christianity', 'Islam', 'Hinduism', 'Judaism'], query: 'suffering pain why meaning purpose' },
  { topic: 'How were we created?', emoji: '🌌', traditions: ['Judaism', 'Christianity', 'Islam', 'Hinduism', 'Ancient'], query: 'creation origin first beginning' },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      <section className="hero-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">⚖️</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Compare</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-3">
            One question. Every tradition&apos;s answer.
          </p>
          <p className="text-white/30 text-sm max-w-md mx-auto">
            See how the world&apos;s sacred texts approach the same universal questions — side by side, without judgment.
          </p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {comparisons.map(comp => (
            <Link
              key={comp.topic}
              href={`/search?q=${encodeURIComponent(comp.query)}`}
              className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[var(--gold)]/40 hover:shadow-md transition-all group"
            >
              <span className="text-3xl shrink-0">{comp.emoji}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold)] transition-colors">{comp.topic}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {comp.traditions.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100 text-[var(--text-muted)]">{t}</span>
                  ))}
                </div>
              </div>
              <span className="text-[var(--gold)] text-lg shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-gray-100 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-3">More comparison tools coming soon — including side-by-side tradition views and passage matching.</p>
          <Link href="/search" className="text-sm font-semibold text-[var(--gold)] hover:opacity-80 transition-opacity">Search any theme across all traditions →</Link>
        </div>
      </section>
    </div>
  );
}
