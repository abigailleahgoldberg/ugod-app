import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Read Sacred Texts Online Free — Bible, Quran, Torah, Gita & More | U-God',
    template: '%s | U-God — Sacred Texts Online',
  },
  description: 'Read sacred texts from 25+ world religions online for free. Search the Bible, Quran, Torah, Bhagavad Gita, Dhammapada, Guru Granth Sahib, Tao Te Ching and more. Cross-tradition connections, daily verses, and audio.',
  metadataBase: new URL('https://u-god.com'),
  keywords: ['sacred texts online', 'read bible online', 'read quran online', 'torah online', 'bhagavad gita', 'dhammapada', 'world religions', 'religious texts', 'compare religions', 'interfaith', 'spiritual wisdom', 'sacred scripture', 'guru granth sahib', 'tao te ching', 'cross-reference religions'],
  authors: [{ name: 'U-God' }],
  creator: 'U-God',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://u-god.com' },
  openGraph: {
    title: 'Read Sacred Texts Online Free — Bible, Quran, Torah & More | U-God',
    description: 'The world\'s sacred texts, beautifully connected. Search across 25+ traditions. Free forever.',
    type: 'website',
    url: 'https://u-god.com',
    siteName: 'U-God',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'U-God — Read sacred texts from every world religion online for free',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Read Sacred Texts Online Free — 25+ World Religions | U-God',
    description: 'Bible, Quran, Torah, Gita, Dhammapada, Tao Te Ching & more. One search bar. Free forever.',
    images: ['/og-image.png'],
  },
};

function Nav() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <a href="/" className="flex items-center gap-2.5">
              <span className="text-xl">🕉️</span>
              <span className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)]">U-God</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/library" className="nav-link">Library</a>
              <a href="/search" className="nav-link">Search</a>
              <a href="/daily" className="nav-link">Daily</a>
              <a href="/bookmarks" className="nav-link">Bookmarks</a>
              <a href="/about" className="nav-link">About</a>
              <button className="btn-primary !py-2 !px-5 !text-xs">Sign In</button>
            </div>
            {/* Mobile nav links inline */}
            <div className="flex md:hidden items-center gap-4">
              <a href="/library" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--gold)]">Library</a>
              <a href="/search" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--gold)]">Search</a>
              <a href="/daily" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--gold)]">Daily</a>
              <a href="/bookmarks" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--gold)]">⭐</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🕉️</text></svg>" />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'U-God',
              url: 'https://u-god.com',
              description: 'Read sacred texts from 25+ world religions online for free. Bible, Quran, Torah, Gita, Dhammapada, and more.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://u-god.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <Nav />

        <main className="pt-14 sm:pt-16">{children}</main>

        {/* Footer */}
        <footer className="footer-bg text-white/60 pt-12 sm:pt-20 pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🕉️</span>
                  <span className="font-display text-lg font-bold text-[var(--gold)]">U-God</span>
                </div>
                <p className="text-sm text-white/30 leading-relaxed">The world&apos;s sacred texts, beautifully connected.</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Explore</h4>
                <div className="space-y-2.5 text-sm">
                  <a href="/library" className="block text-white/30 hover:text-white/60 transition-colors">Library</a>
                  <a href="/search" className="block text-white/30 hover:text-white/60 transition-colors">Search</a>
                  <a href="/daily" className="block text-white/30 hover:text-white/60 transition-colors">Daily Verse</a>
                  <a href="/about" className="block text-white/30 hover:text-white/60 transition-colors">About</a>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Traditions</h4>
                <div className="space-y-2.5 text-sm text-white/30">
                  <p>25+ world traditions</p>
                  <p>5,000+ years of wisdom</p>
                  <p>Cross-tradition connections</p>
                  <p>Always free to read</p>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Mission</h4>
                <p className="text-sm text-white/30 leading-relaxed mb-4">Built with reverence by the Wu-Tang AI Clan.</p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span>♾️</span>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--gold)]">WeBearish</p>
                    <p className="text-[10px] text-white/25">Acceptance, not awareness</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-6 text-center">
              <p className="text-[11px] text-white/20 tracking-wider">© 2026 U-God. Sacred texts are humanity&apos;s shared heritage.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
