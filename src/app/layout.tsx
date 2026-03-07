import type { Metadata } from 'next';
import NavClient from '@/components/NavClient';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Sacred Texts Online Free — Bible, Quran, Torah & More',
    template: '%s | U-God',
  },
  description: 'Read sacred texts from 25+ world religions free. Search the Bible, Quran, Torah, Bhagavad Gita, and Tao Te Ching. Daily verses and cross-tradition search.',
  metadataBase: new URL('https://u-god.com'),
  keywords: ['sacred texts online', 'read bible online', 'read quran online', 'torah online', 'bhagavad gita', 'dhammapada', 'world religions', 'religious texts', 'compare religions', 'interfaith', 'spiritual wisdom', 'sacred scripture', 'guru granth sahib', 'tao te ching', 'cross-reference religions'],
  authors: [{ name: 'U-God Sacred Library', url: 'https://u-god.com' }],
  creator: 'U-God Sacred Library',
  publisher: 'U-God Sacred Library',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://u-god.com' },
  openGraph: {
    title: 'Sacred Texts Online Free — Bible, Quran, Torah & More',
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
    title: 'Sacred Texts Online Free — 25+ World Religions | U-God',
    description: 'Bible, Quran, Torah, Gita, Dhammapada, Tao Te Ching & more. One search bar. Free forever.',
    images: ['/og-image.png'],
  },
};


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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'U-God',
              url: 'https://u-god.com',
              logo: 'https://u-god.com/og-image.png',
              description: 'A free sacred text platform connecting 25+ world religious traditions.',
              sameAs: ['https://u-god.com'],
            }),
          }}
        />
        <NavClient />

        <main className="pt-14 sm:pt-16">{children}</main>

        {/* Footer */}
        <footer className="footer-bg text-white/60 pt-12 sm:pt-20 pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🕉️</span>
                  <span className="font-display text-lg font-bold text-[var(--gold)]">U-God</span>
                </div>
                <p className="text-sm text-white/30 leading-relaxed mb-4">The world&apos;s sacred texts, beautifully connected.</p>
                <p className="text-xs text-white/20 leading-relaxed">A product of</p>
                <a href="https://thevoiceofcash.com" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[var(--gold)] hover:text-[var(--gold)]/80 transition-colors font-bold tracking-wide">
                  The Voice of Cash LLC
                </a>
              </div>

              {/* Explore */}
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Explore</h4>
                <div className="space-y-2.5 text-sm">
                  <a href="/library" className="block text-white/30 hover:text-white/60 transition-colors">Library</a>
                  <a href="/search" className="block text-white/30 hover:text-white/60 transition-colors">Search</a>
                  <a href="/daily" className="block text-white/30 hover:text-white/60 transition-colors">Daily Verse</a>
                  <a href="/calendar" className="block text-white/30 hover:text-white/60 transition-colors">Sacred Calendar</a>
                  <a href="/about" className="block text-white/30 hover:text-white/60 transition-colors">About</a>
                  <a href="/blog" className="block text-white/30 hover:text-white/60 transition-colors">Blog</a>
                </div>
              </div>

              {/* Traditions */}
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Traditions</h4>
                <div className="space-y-2.5 text-sm text-white/30">
                  <p>25+ world traditions</p>
                  <p>5,000+ years of wisdom</p>
                  <p>Cross-tradition connections</p>
                  <p>Always free to read</p>
                  <p>Sacred Calendar — proprietary</p>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-4">Legal</h4>
                <div className="space-y-2.5 text-sm">
                  <a href="/terms" className="block text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
                  <a href="/privacy" className="block text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
                  <a href="/copyright" className="block text-white/30 hover:text-white/60 transition-colors">Copyright Notice</a>
                  <a href="/ip-notice" className="block text-white/30 hover:text-white/60 transition-colors">IP Notice</a>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-[10px] text-white/20 leading-relaxed">Sacred Calendar feature is proprietary IP of The Voice of Cash LLC. All original content, design &amp; curation reserved.</p>
                </div>
              </div>

            </div>

            {/* Our Network */}
            <div className="border-t border-white/5 pt-6 mb-6">
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--gold)]/40 mb-3">Our Network</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[["The Voice of Cash","https://www.thevoiceofcash.com"],["WeBearish","https://www.webearish.com"],["JewSA","https://www.jewsa.com"],["AI Skills Agents","https://aiskillsagents.com"]].map(([label,href]) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/30 hover:text-white/60 font-semibold no-underline transition-colors">{label}</a>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-[11px] text-white/20 tracking-wider">
                  &copy; {new Date().getFullYear()} U-God Sacred Library. A product of{' '}
                  <a href="https://thevoiceofcash.com" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)]/60 hover:text-[var(--gold)] transition-colors">The Voice of Cash LLC</a>
                  . Las Vegas, Nevada. All original content &amp; features reserved.
                </p>
                <p className="text-[11px] text-white/15">Sacred texts are humanity&apos;s shared heritage. Original works are ours.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
