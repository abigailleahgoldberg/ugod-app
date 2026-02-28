import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getPostBySlug } from '@/data/blog';

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  // SEO: use absolute title to bypass layout template; seoTitle = 50-60 chars, seoDescription = 120-160 chars
  return {
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    alternates: { canonical: `https://u-god.com/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: 'article', url: `https://u-god.com/blog/${post.slug}` },
  };
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="font-display text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(<p key={key++} className="font-sacred text-lg italic text-[var(--text-primary)] border-l-4 border-[var(--gold)] pl-5 my-6 leading-relaxed">{line.slice(1, -1)}</p>);
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      // Handle inline bold and links
      const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
      const rendered = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return <Link key={i} href={linkMatch[2]} className="text-[var(--gold)] hover:opacity-80 underline underline-offset-2 transition-opacity">{linkMatch[1]}</Link>;
        }
        return part;
      });
      elements.push(<p key={key++} className="text-[var(--text-secondary)] leading-[1.85] text-base mb-0">{rendered}</p>);
    }
  }
  return elements;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'U-God Sacred Library', url: 'https://u-god.com' },
    publisher: { '@type': 'Organization', name: 'U-God Sacred Library', url: 'https://u-god.com' },
    url: `https://u-god.com/blog/${post.slug}`,
    about: post.traditions.map(t => ({ '@type': 'Thing', name: t })),
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="hero-gradient py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 text-sm mb-6 transition-colors">← Blog</Link>
          <div className="text-5xl mb-5">{post.emoji}</div>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white" style={{ background: post.categoryColor }}>{post.category}</span>
            <span className="text-white/40 text-xs">{post.date}</span>
            <span className="text-white/40 text-xs">· {post.readTime}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">{post.title}</h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">{post.description}</p>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-2xl mx-auto px-4 py-12">
        <div className="prose-content space-y-4">
          {renderContent(post.content)}
        </div>

        {/* Tradition tags */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-3">Traditions Covered</p>
          <div className="flex flex-wrap gap-2">
            {post.traditions.map(t => (
              <Link key={t} href={`/library/${t}`}
                className="capitalize px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-100 text-[var(--text-primary)] hover:border-[var(--gold)]/40 hover:text-[var(--gold)] transition-all">
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* Back + more */}
        <div className="mt-8 flex items-center justify-between">
          <Link href="/blog" className="text-sm text-[var(--gold)] hover:opacity-80 transition-opacity font-medium">← All posts</Link>
          <Link href="/search" className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">Search the library →</Link>
        </div>
      </article>
    </div>
  );
}
