import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'World Religions Map — Where Faith Lives | U-God',
  description: 'Interactive world map showing the geographic spread of 25+ religious traditions. Explore where Christianity, Islam, Hinduism, Buddhism, Judaism, and more are practiced worldwide.',
  alternates: { canonical: 'https://u-god.com/world-religions' },
};

const WorldReligionsMap = dynamic(() => import('@/components/WorldReligionsMap'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-full text-white/30 text-sm">Loading map...</div>
)});

export default function WorldReligionsPage() {
  return (
    <div className="min-h-screen">
      <section className="hero-gradient py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🌍</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">World Religions Map</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every country colored by its dominant spiritual tradition. Hover to explore. Click to read the texts.
          </p>
          <p className="text-white/30 text-sm mt-2">Scroll and zoom to explore regions · Click any country to visit that tradition&apos;s library</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="w-full rounded-2xl overflow-hidden" style={{ height: '65vh', minHeight: 400, background: '#0a0a1a', border: '1px solid #c9a84c', boxShadow: '0 0 0 1px rgba(201,168,76,0.15), 0 12px 48px rgba(201,168,76,0.10)' }}>
          <WorldReligionsMap />
        </div>
        <p className="text-center text-xs text-[var(--text-muted)] mt-4">
          Colors represent dominant tradition by country. Many countries are religiously diverse — explore each tradition&apos;s library for the full picture.
        </p>
      </section>
    </div>
  );
}
