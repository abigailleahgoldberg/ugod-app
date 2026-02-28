'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
const WorldReligionsMap = dynamic(() => import('@/components/WorldReligionsMap'), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-full" style={{background:'#0a0a1a'}}><div className="w-5 h-5 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" /></div>
)});
import { traditions, featuredPassages, searchPassages, getDailyVerse, getCrossRefs, Passage } from '@/data/passages';
import { holidays, calendarTraditions, MONTH_NAMES } from '@/data/holidays';

function Pill({ tradition, traditionKey }: { tradition: string; traditionKey: string }) {
  const t = traditions.find(tr => tr.key === traditionKey);
  return (
    <span className="tradition-pill" style={{ backgroundColor: t?.color || '#666' }}>
      {t?.emoji} {tradition}
    </span>
  );
}

function Modal({ passage, onClose }: { passage: Passage; onClose: () => void }) {
  const crossRefs = getCrossRefs(passage);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <Pill tradition={passage.tradition} traditionKey={passage.traditionKey} />
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors text-lg">&times;</button>
          </div>
          
          <p className="text-xs font-medium tracking-widest uppercase text-[var(--text-muted)] mb-4">{passage.reference}</p>
          
          <blockquote className="font-sacred text-2xl text-[var(--text-primary)] sacred-quote mb-8">
            {passage.text}
          </blockquote>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {passage.themes.map(t => <span key={t} className="theme-tag">{t}</span>)}
          </div>

          {crossRefs.length > 0 && (
            <div className="border-t border-gray-100 pt-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gold)] mb-5">
                ✦ Connected Across Traditions
              </p>
              <div className="space-y-4">
                {crossRefs.map(ref => (
                  <div key={ref.id} className="p-5 rounded-xl bg-[var(--cream)] border-l-2" style={{ borderColor: traditions.find(t => t.key === ref.traditionKey)?.color }}>
                    <div className="flex items-center justify-between mb-2">
                      <Pill tradition={ref.tradition} traditionKey={ref.traditionKey} />
                      <span className="text-[10px] tracking-wider uppercase text-[var(--text-muted)]">{ref.reference}</span>
                    </div>
                    <p className="font-sacred text-sm text-[var(--text-primary)] leading-relaxed">
                      &ldquo;{ref.text.length > 160 ? ref.text.slice(0, 160) + '...' : ref.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-8 border-t border-gray-100">
            <a href={`/library/${passage.traditionKey}`} className="btn-primary flex-1 text-center">📖 Read Full Text</a>
            <button onClick={() => { const u = new SpeechSynthesisUtterance(passage.text); u.rate = 0.85; speechSynthesis.speak(u); }} className="btn-secondary flex-1">🔊 Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Passage | null>(null);
  const daily = getDailyVerse();
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  const search = (q: string) => {
    setQuery(q);
    if (q.trim().length > 1) {
      setSearching(true);
      // Start with local results immediately
      const local = searchPassages(q);
      setResults(local.map(p => ({ id: p.id, text: p.text, reference: p.reference, tradition: p.tradition, traditionKey: p.traditionKey, emoji: traditions.find(t => t.key === p.traditionKey)?.emoji || '', color: traditions.find(t => t.key === p.traditionKey)?.color || '#666', url: `/library/${p.traditionKey}` })));
      // Then fetch live API results
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
          const data = await res.json();
          if (data.results?.length > 0) {
            setResults(data.results);
          }
        } catch {}
        setLoading(false);
      }, 500);
    } else {
      setSearching(false);
      setResults([]);
    }
  };

  const suggestions = [
    "Meaning of life",
    "I feel lost",
    "Love & traditions",
    "Forgiveness",
  ];

  return (
    <>
      {selected && <Modal passage={selected} onClose={() => setSelected(null)} />}

      {/* ===== HERO ===== */}
      <section className="hero-gradient relative overflow-hidden flex items-center py-12 sm:py-16">
        {/* Floating symbols — hidden on mobile for cleaner experience */}
        <div className="hidden sm:block">
          <div className="float-symbol text-7xl" style={{ top: '10%', left: '8%', animationDelay: '0s' }}>✡️</div>
          <div className="float-symbol text-6xl" style={{ top: '20%', right: '12%', animationDelay: '1.5s' }}>☪️</div>
          <div className="float-symbol text-5xl" style={{ bottom: '25%', left: '15%', animationDelay: '3s' }}>☸️</div>
          <div className="float-symbol text-6xl" style={{ top: '15%', right: '35%', animationDelay: '0.5s' }}>🕉️</div>
          <div className="float-symbol text-5xl" style={{ bottom: '20%', right: '8%', animationDelay: '2s' }}>☯️</div>
          <div className="float-symbol text-4xl" style={{ bottom: '35%', left: '5%', animationDelay: '4s' }}>✝️</div>
          <div className="float-symbol text-5xl" style={{ top: '40%', left: '35%', animationDelay: '2.5s' }}>⛩️</div>
          <div className="float-symbol text-4xl" style={{ bottom: '10%', right: '30%', animationDelay: '1s' }}>🌀</div>
          <div className="float-symbol text-4xl" style={{ top: '8%', left: '50%', animationDelay: '3.5s' }}>⭐</div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* LEFT: content */}
          <div className="w-full text-center lg:text-left lg:flex-1 lg:max-w-[52%] min-w-0">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase text-[var(--gold)]">Every Sacred Text. Every Tradition. One Place.</span>
          </div>

          {/* Headline — 2 lines max */}
          <h1 className="font-display text-[5.8vw] sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
            <span className="text-white block">The World&apos;s Sacred Texts,</span>
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#e8d59a] to-[#c9a84c] bg-clip-text text-transparent block">Beautifully Connected</span>
          </h1>

          <p className="text-sm sm:text-base text-white/60 mb-2 mx-auto lg:mx-0 font-light leading-relaxed px-1">
            The largest free library of sacred texts on the internet — 25+ living traditions, 5,000 years of spiritual wisdom, <span style={{color:'#c9a84c', fontWeight: 500}}>one search bar.</span>
          </p>
          <p className="text-xs sm:text-sm text-white/35 mb-5 mx-auto lg:mx-0 font-light leading-relaxed px-1">
            From the Torah and Quran to the Tao Te Ching, Vedas, and Guru Granth Sahib — every tradition has a place here.
          </p>

          {/* Search */}
          <div className="search-container pt-1 pb-0">
            <div className="search-bar">
              <div className="flex items-center px-4 sm:px-6 py-1">
                <svg className="w-5 h-5 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  type="text"
                  value={query}
                  onChange={e => search(e.target.value)}
                  placeholder="What does your heart need right now?"
                  className="flex-1 bg-transparent px-3 sm:px-4 py-4 sm:py-5 text-white outline-none text-sm sm:text-lg placeholder-white/30 min-w-0"
                />
                {query && (
                  <button onClick={() => search('')} className="text-white/30 hover:text-white/60 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {!searching && (
            <div className="suggestion-scroll mt-4 pb-4 px-4 sm:px-6 lg:px-0">
              <div className="suggestion-row">
                {suggestions.map(s => (
                  <button key={s} onClick={() => search(s)} className="suggestion-pill">{s}</button>
                ))}
              </div>
            </div>
          )}

          </div>{/* end left col */}

          {/* RIGHT: World map */}
          <div className="flex flex-col w-full lg:flex-1 lg:max-w-[46%] self-stretch mt-6 lg:mt-0 px-4 sm:px-6 lg:px-0">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 'clamp(200px, 40vw, 480px)', background: '#0a0a1a', border: '1px solid #c9a84c', boxShadow: '0 0 0 1px rgba(201,168,76,0.15), 0 8px 32px rgba(201,168,76,0.08)' }}>
              <WorldReligionsMap compact={true} />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1.5 pointer-events-none">
                <p className="text-[10px] text-white/50 font-medium">Hover countries · Click to explore</p>
              </div>
            </div>
            <a href="/world-religions" className="mt-2 text-center text-[11px] text-white/30 hover:text-[var(--gold)] transition-colors">
              View full map →
            </a>
          </div>
          </div>{/* end flex row */}

          {/* Search Results — full width below the grid */}
          {searching && (
            <div className="mt-8 text-left max-w-2xl mx-auto">
              {loading && results.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/30 text-sm">Searching across traditions...</p>
                </div>
              )}
              {results.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs text-white/30 font-medium tracking-wider uppercase mb-4">
                    {results.length} passages across {new Set(results.map((r: any) => r.tradition)).size} traditions
                    {loading && <span className="ml-2 inline-block w-3 h-3 border border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin" />}
                  </p>
                  {results.map((p: any) => (
                    <a key={p.id} href={p.url || `/library/${p.traditionKey}`} className="glass-card p-5 block hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white tracking-wide uppercase" style={{ backgroundColor: p.color || '#666' }}>
                          {p.emoji} {p.tradition}
                        </span>
                        <span className="text-[10px] tracking-wider uppercase text-white/30">{p.reference}</span>
                      </div>
                      <p className="font-sacred text-white/80 leading-relaxed text-[15px]">
                        &ldquo;{p.text?.length > 200 ? p.text.slice(0, 200) + '...' : p.text}&rdquo;
                      </p>
                    </a>
                  ))}
                  <div className="text-center pt-4">
                    <a href={`/search?q=${encodeURIComponent(query)}`} className="text-xs text-[var(--gold)] hover:underline">
                      See all results →
                    </a>
                  </div>
                </div>
              ) : !loading ? (
                <div className="glass-card p-8 text-center">
                  <p className="text-white/40 mb-1">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-white/20">Try a simpler keyword like &ldquo;love&rdquo; or &ldquo;peace&rdquo;</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* ===== DAILY VERSE ===== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-10">
        <div className="daily-card p-6 sm:p-10 cursor-pointer" onClick={() => setSelected(daily)}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]">✦ Daily Verse</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold)]/20 to-transparent"></div>
            <Pill tradition={daily.tradition} traditionKey={daily.traditionKey} />
          </div>
          <blockquote className="font-sacred text-xl sm:text-2xl text-[var(--text-primary)] sacred-quote leading-relaxed mb-6">
            {daily.text}
          </blockquote>
          <p className="text-xs tracking-wider uppercase text-[var(--text-muted)] pl-6">— {daily.reference}</p>
        </div>
      </section>

      {/* ===== TRADITIONS GRID ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">The Library</p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">Explore Every Tradition</h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto">Thousands of texts from 25+ world traditions. One search bar. One library.</p>
          <div className="section-divider mt-6"><span className="text-[var(--gold)] text-xs">✦</span></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {traditions.map(t => (
            <a key={t.key} href={`/library/${t.key}`} className="tradition-tile" style={{ '--tile-color': t.color } as any}>
              <div className="emoji relative">{t.emoji}</div>
              <div className="font-semibold text-sm text-[var(--text-primary)] mb-0.5 relative">{t.name}</div>
              <div className="text-[11px] text-[var(--text-muted)] relative">{t.textCount}+ texts</div>
            </a>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PASSAGES ===== */}
      <section className="hero-gradient py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Cross-References</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Discover Connections</h2>
            <p className="text-white/40 max-w-md mx-auto">The same wisdom, expressed across traditions separated by thousands of years and miles.</p>
            <div className="section-divider mt-6"><span className="text-[var(--gold)] text-xs">✦</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featuredPassages.slice(0, 6).map(p => (
              <div key={p.id} className="glass-card p-6 cursor-pointer" onClick={() => setSelected(p)}>
                <div className="flex items-center justify-between mb-4">
                  <Pill tradition={p.tradition} traditionKey={p.traditionKey} />
                  <span className="text-[10px] tracking-wider uppercase text-white/25">{p.reference}</span>
                </div>
                <p className="font-sacred text-white/75 leading-relaxed text-[15px] mb-5">
                  &ldquo;{p.text.length > 160 ? p.text.slice(0, 160) + '...' : p.text}&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.themes.slice(0, 2).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">{t}</span>
                  ))}
                  {p.crossRefs && p.crossRefs.length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
                      🔗 {p.crossRefs.length} connections
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">The Experience</p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">How U-God Works</h2>
          <div className="section-divider mt-4"><span className="text-[var(--gold)] text-xs">✦</span></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {[
            { icon: '🔍', title: 'Search With Meaning', desc: 'Type a feeling, a question, or a topic. Our AI understands what you need and finds the most relevant passages across every tradition.' },
            { icon: '🔗', title: 'Discover Connections', desc: 'Every passage links to parallels in other traditions. See the same truth expressed by different voices across 5,000 years.' },
            { icon: '📖', title: 'Read Beautifully', desc: 'Sacred texts deserve beautiful presentation. Clean typography, original languages, audio recitation, and AI-powered commentary.' },
          ].map(item => (
            <div key={item.title} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--cream-warm)] flex items-center justify-center mx-auto mb-5 text-3xl border border-[var(--gold)]/10">
                {item.icon}
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-[var(--cream-warm)] py-20 border-y border-[var(--gold)]/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '25+', label: 'Traditions' },
              { num: '5,000+', label: 'Sacred Texts' },
              { num: '5M+', label: 'Searchable Passages' },
              { num: '5,000', label: 'Years of Wisdom' },
            ].map(s => (
              <div key={s.label}>
                <div className="stat-number">{s.num}</div>
                <div className="text-xs font-medium tracking-wider uppercase text-[var(--text-muted)] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING OBSERVANCES ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-1">Sacred Calendar</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Upcoming Observances</h2>
          </div>
          <a href="/calendar" className="text-sm font-semibold text-[var(--gold)] hover:opacity-80 transition-opacity hidden sm:block">
            Full calendar →
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(() => {
            const now = new Date();
            const cm = now.getMonth() + 1;
            const cd = now.getDate();
            const scored = holidays.map(h => {
              let diff = h.month - cm;
              if (diff < 0) diff += 12;
              else if (diff === 0 && h.day < cd) diff = 12;
              return { ...h, diff: diff * 31 + h.day };
            }).sort((a, b) => a.diff - b.diff).slice(0, 4);
            return scored.map(h => {
              const trad = calendarTraditions.find(t => t.key === h.traditionKey);
              return (
                <a key={h.slug} href={`/holidays/${h.slug}`}
                  className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-[var(--gold)]/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{h.emoji}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: trad?.color }}>
                      {MONTH_NAMES[h.month - 1].slice(0, 3)} {h.day}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors leading-tight mb-1">{h.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{trad?.emoji} {trad?.name}</p>
                </a>
              );
            });
          })()}
        </div>
        <div className="text-center mt-5 sm:hidden">
          <a href="/calendar" className="text-sm font-semibold text-[var(--gold)]">View all sacred holidays →</a>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Begin</p>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">The Texts Are Always Free</h2>
        <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto leading-relaxed">
          Sacred texts are humanity&apos;s shared heritage. Read any text in any tradition, forever free. Premium tools for deeper study.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/library" className="btn-primary text-center">Start Reading — Free</a>
          <button className="btn-secondary opacity-75 cursor-default" disabled>Scholar Plan — Coming Soon</button>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-6">No ads. Ever. Sacred content deserves better.</p>
      </section>
    </>
  );
}
