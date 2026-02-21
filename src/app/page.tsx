'use client';
import { useState } from 'react';
import { traditions, featuredPassages, searchPassages, getDailyVerse, getCrossRefs, Passage } from '@/data/passages';

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
            <button className="btn-primary flex-1">📖 Read Full Text</button>
            <button className="btn-secondary flex-1">🔊 Listen</button>
            <button className="btn-secondary px-4">⭐</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Passage[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<Passage | null>(null);
  const daily = getDailyVerse();

  const search = (q: string) => {
    setQuery(q);
    if (q.trim().length > 1) {
      setSearching(true);
      setResults(searchPassages(q));
    } else {
      setSearching(false);
      setResults([]);
    }
  };

  const suggestions = [
    "What is the meaning of life?",
    "I feel lost and alone",
    "Love across traditions",
    "Finding inner peace",
    "The creation story",
    "Forgiveness",
  ];

  return (
    <>
      {selected && <Modal passage={selected} onClose={() => setSelected(null)} />}

      {/* ===== HERO ===== */}
      <section className="hero-gradient relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Floating symbols */}
        <div className="float-symbol text-7xl" style={{ top: '10%', left: '8%', animationDelay: '0s' }}>✡️</div>
        <div className="float-symbol text-6xl" style={{ top: '20%', right: '12%', animationDelay: '1.5s' }}>☪️</div>
        <div className="float-symbol text-5xl" style={{ bottom: '25%', left: '15%', animationDelay: '3s' }}>☸️</div>
        <div className="float-symbol text-6xl" style={{ top: '15%', right: '35%', animationDelay: '0.5s' }}>🕉️</div>
        <div className="float-symbol text-5xl" style={{ bottom: '20%', right: '8%', animationDelay: '2s' }}>☯️</div>
        <div className="float-symbol text-4xl" style={{ bottom: '35%', left: '5%', animationDelay: '4s' }}>✝️</div>
        <div className="float-symbol text-5xl" style={{ top: '40%', left: '35%', animationDelay: '2.5s' }}>⛩️</div>
        <div className="float-symbol text-4xl" style={{ bottom: '10%', right: '30%', animationDelay: '1s' }}>🌀</div>
        <div className="float-symbol text-4xl" style={{ top: '8%', left: '50%', animationDelay: '3.5s' }}>⭐</div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse"></span>
            <span className="text-xs font-medium tracking-widest uppercase text-[var(--gold)]">25+ World Traditions</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight whitespace-nowrap">
            The World&apos;s Sacred Texts,
          </h1>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#e8d59a] to-[#c9a84c] bg-clip-text text-transparent">Beautifully Connected</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/40 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Read across traditions. Discover what connects humanity across 5,000 years of spiritual wisdom.
          </p>

          {/* Search */}
          <div className="search-container">
            <div className="search-bar">
              <div className="flex items-center px-6 py-1">
                <svg className="w-5 h-5 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  type="text"
                  value={query}
                  onChange={e => search(e.target.value)}
                  placeholder="What does your heart need right now?"
                  className="flex-1 bg-transparent px-4 py-5 text-white outline-none text-lg placeholder-white/30"
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
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {suggestions.map(s => (
                <button key={s} onClick={() => search(s)} className="suggestion-pill">{s}</button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {searching && (
            <div className="mt-8 text-left max-w-2xl mx-auto">
              {results.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs text-white/30 font-medium tracking-wider uppercase mb-4">
                    {results.length} passages across {new Set(results.map(r => r.tradition)).size} traditions
                  </p>
                  {results.map(p => (
                    <div key={p.id} className="glass-card p-5 cursor-pointer" onClick={() => setSelected(p)}>
                      <div className="flex items-center justify-between mb-3">
                        <Pill tradition={p.tradition} traditionKey={p.traditionKey} />
                        <span className="text-[10px] tracking-wider uppercase text-white/30">{p.reference}</span>
                      </div>
                      <p className="font-sacred text-white/80 leading-relaxed text-[15px]">
                        &ldquo;{p.text.length > 200 ? p.text.slice(0, 200) + '...' : p.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-white/40 mb-1">No exact matches in preview data.</p>
                  <p className="text-xs text-white/20">Full app: AI semantic search across 5M+ passages</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== DAILY VERSE ===== */}
      <section className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
        <div className="daily-card p-8 sm:p-10 cursor-pointer" onClick={() => setSelected(daily)}>
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
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">The Library</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">Explore Every Tradition</h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto">Thousands of texts from 25+ world traditions. One search bar. One library.</p>
          <div className="section-divider mt-6"><span className="text-[var(--gold)] text-xs">✦</span></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
      <section className="hero-gradient py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Cross-References</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Discover Connections</h2>
            <p className="text-white/40 max-w-md mx-auto">The same wisdom, expressed across traditions separated by thousands of years and miles.</p>
            <div className="section-divider mt-6"><span className="text-[var(--gold)] text-xs">✦</span></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">The Experience</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">How U-God Works</h2>
          <div className="section-divider mt-4"><span className="text-[var(--gold)] text-xs">✦</span></div>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
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

      {/* ===== CTA ===== */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">Begin</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">The Texts Are Always Free</h2>
        <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto leading-relaxed">
          Sacred texts are humanity&apos;s shared heritage. Read any text in any tradition, forever free. Premium tools for deeper study.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">Start Reading — Free</button>
          <button className="btn-secondary">Scholar Plan — $9.99/mo</button>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-6">No ads. Ever. Sacred content deserves better.</p>
      </section>
    </>
  );
}
