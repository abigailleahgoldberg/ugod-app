import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  // SEO: absolute bypasses layout template | target 50-60 chars title, 120-160 chars desc
  title: { absolute: 'Sacred Texts & Religion Blog | U-God Sacred Library' },
  description: 'Deep dives into sacred texts and world religions. Cross-tradition comparisons, holiday guides, and philosophical explorations from 25+ traditions.',
  alternates: { canonical: 'https://u-god.com/blog' },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="hero-gradient py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">The Sacred Library Blog</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Deep dives into sacred texts, cross-tradition comparisons, and the wisdom hiding in plain sight across 5,000 years of human spirituality.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex gap-5 p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 hover:border-[var(--gold)]/40 hover:shadow-md transition-all"
            >
              <div className="text-4xl shrink-0 mt-1">{post.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                    style={{ background: post.categoryColor }}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{post.date}</span>
                  <span className="text-xs text-[var(--text-muted)]">· {post.readTime}</span>
                  {i === 0 && <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">Latest</span>}
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold)] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">{post.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.traditions.slice(0,4).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100 text-[var(--text-muted)] capitalize">{t}</span>
                  ))}
                </div>
              </div>
              <span className="text-[var(--gold)] text-lg shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
