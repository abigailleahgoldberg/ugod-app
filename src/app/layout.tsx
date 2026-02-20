import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "U-God — The World's Sacred Texts, Connected",
  description: 'Explore sacred texts from every tradition. Discover what connects humanity across 5,000 years of spiritual wisdom.',
  openGraph: {
    title: "U-God — The World's Sacred Texts, Connected",
    description: 'Read across traditions. Discover what connects humanity.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🕉️</text></svg>" />
      </head>
      <body className="min-h-screen font-ui antialiased">
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#f5f0e8]/80 border-b border-[#c9a84c]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">🕉️</span>
                <span className="text-xl font-bold tracking-tight" style={{color: '#1a1a3e'}}>
                  U-God
                </span>
                <span className="hidden sm:inline text-xs text-[#6b7280] ml-1 mt-1">Sacred Texts, Connected</span>
              </a>
              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/library" className="text-[#1a1a3e] hover:text-[#c9a84c] transition-colors">Library</a>
                <a href="/search" className="text-[#1a1a3e] hover:text-[#c9a84c] transition-colors">Search</a>
                <a href="/daily" className="text-[#1a1a3e] hover:text-[#c9a84c] transition-colors">Daily Verse</a>
                <a href="/about" className="text-[#1a1a3e] hover:text-[#c9a84c] transition-colors">About</a>
                <button className="px-4 py-2 bg-[#1a1a3e] text-[#c9a84c] rounded-lg text-sm hover:bg-[#2a2a5e] transition-colors">
                  Sign In
                </button>
              </div>
              <button className="md:hidden text-2xl">☰</button>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-[#1a1a3e] text-[#e8e4dc] py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🕉️</span>
                  <span className="text-xl font-bold text-[#c9a84c]">U-God</span>
                </div>
                <p className="text-sm text-[#9ca3af]">The world&apos;s sacred texts, beautifully connected. Read across traditions. Discover what connects humanity.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#c9a84c] mb-3">Explore</h4>
                <div className="space-y-2 text-sm text-[#9ca3af]">
                  <a href="/library" className="block hover:text-white">Library</a>
                  <a href="/search" className="block hover:text-white">Search</a>
                  <a href="/daily" className="block hover:text-white">Daily Verse</a>
                  <a href="/about" className="block hover:text-white">About</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-[#c9a84c] mb-3">Traditions</h4>
                <div className="space-y-2 text-sm text-[#9ca3af]">
                  <span className="block">25+ world traditions</span>
                  <span className="block">5,000+ years of wisdom</span>
                  <span className="block">Cross-tradition connections</span>
                  <span className="block">Always free to read</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-[#c9a84c] mb-3">Mission</h4>
                <p className="text-sm text-[#9ca3af]">Sacred texts are humanity&apos;s shared heritage. The texts are always free. Built with reverence by the Wu-Tang AI Clan.</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-[#2a2a5e] rounded text-[#c9a84c]">♾️ WeBearish</span>
                  <span className="text-xs text-[#9ca3af]">Acceptance, not awareness</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[#2a2a5e] mt-10 pt-6 text-center text-xs text-[#6b7280]">
              © 2026 U-God. Sacred texts are humanity&apos;s shared heritage.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
