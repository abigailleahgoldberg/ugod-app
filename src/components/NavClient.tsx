'use client';
import { useState, useEffect } from 'react';

const mainLinks = [
  { href: '/library', label: 'Library', emoji: '📚' },
  { href: '/search', label: 'Search', emoji: '🔍' },
  { href: '/daily', label: 'Daily Verse', emoji: '☀️' },
  { href: '/calendar', label: 'Sacred Calendar', emoji: '📅' },
  { href: '/bookmarks', label: 'Bookmarks', emoji: '⭐' },
];

const discoverLinks = [
  { href: '/explore', label: 'Explore', emoji: '🌍', badge: 'New' },
  { href: '/topics', label: 'Topics', emoji: '📊', badge: 'New' },
  { href: '/compare', label: 'Compare', emoji: '⚖️', badge: 'New' },
  { href: '/blog', label: 'Blog', emoji: '📝', badge: 'New' },
];

const moreLinks = [
  { href: '/about', label: 'About', emoji: '💡' },
  { href: '/terms', label: 'Terms', emoji: '📜' },
];

export default function NavClient() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on route change
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a')) setOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <span className="text-xl">🕉️</span>
              <span className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)]">U-God</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/library" className="nav-link">Library</a>
              <a href="/search" className="nav-link">Search</a>
              <a href="/daily" className="nav-link">Daily</a>
              <a href="/calendar" className="nav-link">Calendar</a>
              <a href="/explore" className="nav-link">Explore</a>
              <a href="/topics" className="nav-link">Topics</a>
              <a href="/compare" className="nav-link">Compare</a>
              <a href="/blog" className="nav-link">Blog</a>
              <a href="/resources" className="nav-link">Books</a>
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3">
              <a href="/bookmarks" className="nav-link">⭐</a>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                aria-label="Open menu"
              >
                <span className="text-white/70 text-sm">☰</span>
                <span className="text-xs text-white/60 font-medium">Menu</span>
              </button>
            </div>

            {/* Mobile: hamburger only */}
            {/* Mobile: calendar shortcut + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <a href="/calendar"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/8 border border-white/15 hover:bg-white/15 transition-all"
                aria-label="Sacred Calendar"
              >
                <span className="text-base">📅</span>
              </a>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
                style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)' }}
                aria-label="Open menu"
              >
                <span className="text-lg" style={{ color: '#c9a84c' }}>☰</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-out panel */}
      <div className={`fixed top-0 right-0 h-full w-[300px] z-[70] flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'linear-gradient(160deg, #0f0f23 0%, #1a1a3e 100%)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕉️</span>
            <span className="font-display text-base font-bold text-white">U-God</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Menu content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">

          {/* Main */}
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]/60 px-3 mb-2 mt-2">Library</p>
          {mainLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/6 transition-all group"
            >
              <span className="text-lg w-7 text-center">{link.emoji}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ))}

          <div className="h-px bg-white/8 my-3" />

          {/* Discover */}
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]/60 px-3 mb-2">Discover</p>
          {discoverLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/6 transition-all group"
            >
              <span className="text-lg w-7 text-center">{link.emoji}</span>
              <span className="text-sm font-medium flex-1">{link.label}</span>
              {link.badge && (
                <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">{link.badge}</span>
              )}
            </a>
          ))}

          <div className="h-px bg-white/8 my-3" />

          {/* More */}
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]/60 px-3 mb-2">More</p>
          {moreLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/6 transition-all"
            >
              <span className="text-lg w-7 text-center">{link.emoji}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Sign In CTA at bottom */}
        <div className="px-4 py-5 border-t border-white/8">
          <a href="/library" className="w-full btn-primary !py-3 !text-sm text-center block">
            Start Reading — Free
          </a>
          <p className="text-center text-[10px] text-white/25 mt-3">
            © {new Date().getFullYear()} U-God Sacred Library
          </p>
        </div>
      </div>
    </>
  );
}
