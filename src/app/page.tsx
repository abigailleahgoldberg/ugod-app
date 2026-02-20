'use client';
import { useState } from 'react';
import { traditions, featuredPassages, searchPassages, getDailyVerse, getCrossRefs, Passage } from '@/data/passages';

function TraditionBadge({ tradition, traditionKey }: { tradition: string; traditionKey: string }) {
  const t = traditions.find(tr => tr.key === traditionKey);
  return (
    <span 
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: t?.color || '#666' }}
    >
      {t?.emoji} {tradition}
    </span>
  );
}

function PassageCard({ passage, onSelect }: { passage: Passage; onSelect: (p: Passage) => void }) {
  return (
    <div 
      className={`passage-card bg-white rounded-xl p-6 cursor-pointer border border-[#e8e0d0] tradition-${passage.traditionKey}`}
      onClick={() => onSelect(passage)}
    >
      <div className="flex items-start justify-between mb-3">
        <TraditionBadge tradition={passage.tradition} traditionKey={passage.traditionKey} />
        <span className="text-xs text-[#6b7280]">{passage.reference}</span>
      </div>
      <p className="font-sacred text-[#1a1a2e] text-base leading-relaxed mb-4">
        &ldquo;{passage.text.length > 200 ? passage.text.slice(0, 200) + '...' : passage.text}&rdquo;
      </p>
      <div className="flex flex-wrap gap-1.5">
        {passage.themes.slice(0, 3).map(theme => (
          <span key={theme} className="text-xs px-2 py-0.5 bg-[#f5f0e8] text-[#6b7280] rounded-full">{theme}</span>
        ))}
        {passage.crossRefs && passage.crossRefs.length > 0 && (
          <span className="text-xs px-2 py-0.5 bg-[#c9a84c]/10 text-[#c9a84c] rounded-full">
            🔗 {passage.crossRefs.length} cross-refs
          </span>
        )}
      </div>
    </div>
  );
}

function PassageModal({ passage, onClose }: { passage: Passage; onClose: () => void }) {
  const crossRefs = getCrossRefs(passage);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <TraditionBadge tradition={passage.tradition} traditionKey={passage.traditionKey} />
            <button onClick={onClose} className="text-2xl text-[#6b7280] hover:text-[#1a1a2e]">&times;</button>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a3e] mb-4">{passage.reference}</h2>
          <blockquote className="font-sacred text-xl leading-relaxed text-[#1a1a2e] border-l-4 border-[#c9a84c] pl-6 mb-6">
            {passage.text}
          </blockquote>
          <div className="flex flex-wrap gap-2 mb-6">
            {passage.themes.map(theme => (
              <span key={theme} className="text-sm px-3 py-1 bg-[#f5f0e8] text-[#6b7280] rounded-full">{theme}</span>
            ))}
          </div>
          {crossRefs.length > 0 && (
            <div className="border-t border-[#e8e0d0] pt-6">
              <h3 className="text-sm font-bold text-[#c9a84c] mb-4">✨ Connected across traditions</h3>
              <div className="space-y-4">
                {crossRefs.map(ref => (
                  <div key={ref.id} className={`p-4 bg-[#fafaf7] rounded-lg border border-[#e8e0d0] tradition-${ref.traditionKey}`}>
                    <div className="flex items-center justify-between mb-2">
                      <TraditionBadge tradition={ref.tradition} traditionKey={ref.traditionKey} />
                      <span className="text-xs text-[#6b7280]">{ref.reference}</span>
                    </div>
                    <p className="font-sacred text-sm text-[#1a1a2e] leading-relaxed">
                      &ldquo;{ref.text.length > 150 ? ref.text.slice(0, 150) + '...' : ref.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3 mt-6 pt-6 border-t border-[#e8e0d0]">
            <button className="flex-1 py-2.5 bg-[#1a1a3e] text-[#c9a84c] rounded-lg text-sm font-medium hover:bg-[#2a2a5e] transition-colors">
              📖 Read Full Text
            </button>
            <button className="flex-1 py-2.5 bg-[#f5f0e8] text-[#1a1a3e] rounded-lg text-sm font-medium hover:bg-[#e8e0d0] transition-colors">
              🔊 Listen
            </button>
            <button className="flex-1 py-2.5 bg-[#f5f0e8] text-[#1a1a3e] rounded-lg text-sm font-medium hover:bg-[#e8e0d0] transition-colors">
              ⭐ Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Passage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const daily = getDailyVerse();

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 1) {
      setIsSearching(true);
      setSearchResults(searchPassages(q));
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const suggestions = [
    "What is the meaning of life?",
    "I feel lost and alone",
    "Love poems from every tradition",
    "How to find inner peace",
    "The creation story",
    "Forgiveness",
  ];

  return (
    <>
      {selectedPassage && <PassageModal passage={selectedPassage} onClose={() => setSelectedPassage(null)} />}
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1a3e] to-[#2a2a5e] text-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-8xl">✡️</div>
          <div className="absolute top-40 right-20 text-7xl">☪️</div>
          <div className="absolute bottom-20 left-1/4 text-6xl">☸️</div>
          <div className="absolute top-10 right-1/3 text-5xl">🕉️</div>
          <div className="absolute bottom-40 right-10 text-7xl">☯️</div>
          <div className="absolute bottom-10 left-10 text-5xl">✝️</div>
          <div className="absolute top-1/2 left-1/2 text-6xl">⛩️</div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            The World&apos;s Sacred Texts,<br/>
            <span className="text-[#c9a84c]">Beautifully Connected</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9ca3af] mb-10 max-w-2xl mx-auto">
            Read across 25+ traditions. Discover what connects humanity across 5,000 years of spiritual wisdom.
          </p>
          
          {/* Search Bar */}
          <div className="search-glow max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-[#c9a84c]/30 p-1.5 transition-all">
            <div className="flex items-center">
              <span className="pl-4 text-xl">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder="What does your heart need right now?"
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-[#9ca3af] outline-none text-lg"
              />
              {searchQuery && (
                <button onClick={() => handleSearch('')} className="pr-4 text-[#9ca3af] hover:text-white">✕</button>
              )}
            </div>
          </div>

          {/* Suggestions */}
          {!isSearching && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSearch(s)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-[#e8e4dc] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {isSearching && (
            <div className="mt-8 max-w-2xl mx-auto text-left">
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-[#9ca3af] mb-2">Found {searchResults.length} passages across traditions</p>
                  {searchResults.map(p => (
                    <div
                      key={p.id}
                      className="bg-white/10 backdrop-blur rounded-xl p-5 cursor-pointer hover:bg-white/15 transition-colors border border-white/5"
                      onClick={() => setSelectedPassage(p)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <TraditionBadge tradition={p.tradition} traditionKey={p.traditionKey} />
                        <span className="text-xs text-[#9ca3af]">{p.reference}</span>
                      </div>
                      <p className="font-sacred text-[#e8e4dc] leading-relaxed">
                        &ldquo;{p.text.length > 180 ? p.text.slice(0, 180) + '...' : p.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <p className="text-[#9ca3af]">No exact matches yet. In the full app, our AI search will find the most relevant passages across every tradition.</p>
                  <p className="text-sm text-[#6b7280] mt-2">Try: &ldquo;love&rdquo;, &ldquo;suffering&rdquo;, &ldquo;creation&rdquo;, &ldquo;peace&rdquo;</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Daily Verse */}
      <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e8e0d0] p-8 cursor-pointer passage-card" onClick={() => setSelectedPassage(daily)}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">✦ Daily Verse</span>
            <TraditionBadge tradition={daily.tradition} traditionKey={daily.traditionKey} />
          </div>
          <blockquote className="font-sacred text-xl sm:text-2xl leading-relaxed text-[#1a1a2e] mb-4">
            &ldquo;{daily.text}&rdquo;
          </blockquote>
          <p className="text-sm text-[#6b7280]">— {daily.reference}</p>
        </div>
      </section>

      {/* Tradition Library */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a1a3e] mb-3">Explore Every Tradition</h2>
          <p className="text-[#6b7280]">25+ traditions. Thousands of texts. One search bar.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {traditions.map(t => (
            <a
              key={t.key}
              href={`/library/${t.key}`}
              className="passage-card bg-white rounded-xl p-5 text-center border border-[#e8e0d0] hover:border-[#c9a84c]/50"
            >
              <div className="text-3xl mb-2">{t.emoji}</div>
              <div className="font-bold text-sm text-[#1a1a3e] mb-1">{t.name}</div>
              <div className="text-xs text-[#6b7280]">{t.textCount}+ texts</div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Cross-References */}
      <section className="bg-[#1a1a3e] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Discover Connections</h2>
            <p className="text-[#9ca3af]">The same wisdom, expressed across traditions. Tap any passage to explore.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPassages.slice(0, 6).map(p => (
              <div
                key={p.id}
                className="bg-white/5 backdrop-blur rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
                onClick={() => setSelectedPassage(p)}
              >
                <div className="flex items-center justify-between mb-3">
                  <TraditionBadge tradition={p.tradition} traditionKey={p.traditionKey} />
                  <span className="text-xs text-[#9ca3af]">{p.reference}</span>
                </div>
                <p className="font-sacred text-[#e8e4dc] leading-relaxed mb-4">
                  &ldquo;{p.text.length > 160 ? p.text.slice(0, 160) + '...' : p.text}&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.themes.slice(0, 2).map(theme => (
                    <span key={theme} className="text-xs px-2 py-0.5 bg-white/10 text-[#c9a84c] rounded-full">{theme}</span>
                  ))}
                  {p.crossRefs && p.crossRefs.length > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-[#c9a84c]/20 text-[#c9a84c] rounded-full">
                      🔗 {p.crossRefs.length} connections
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a1a3e] mb-3">How U-God Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#c9a84c]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🔍</div>
            <h3 className="font-bold text-[#1a1a3e] mb-2">Search With Meaning</h3>
            <p className="text-sm text-[#6b7280]">Type a feeling, a question, or a topic. Our AI understands what you need and finds the most relevant passages across every tradition.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#c9a84c]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🔗</div>
            <h3 className="font-bold text-[#1a1a3e] mb-2">Discover Connections</h3>
            <p className="text-sm text-[#6b7280]">Every passage links to parallels in other traditions. See the same truth expressed by different voices across 5,000 years.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#c9a84c]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">📖</div>
            <h3 className="font-bold text-[#1a1a3e] mb-2">Read Beautifully</h3>
            <p className="text-sm text-[#6b7280]">Sacred texts deserve beautiful presentation. Clean typography, original languages, audio recitation, and AI-powered commentary.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#c9a84c]">25+</div>
              <div className="text-sm text-[#6b7280]">Traditions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#c9a84c]">5,000+</div>
              <div className="text-sm text-[#6b7280]">Sacred Texts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#c9a84c]">5M+</div>
              <div className="text-sm text-[#6b7280]">Passages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#c9a84c]">5,000</div>
              <div className="text-sm text-[#6b7280]">Years of Wisdom</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#1a1a3e] mb-4">The Texts Are Always Free</h2>
        <p className="text-[#6b7280] mb-8 max-w-xl mx-auto">Sacred texts are humanity&apos;s shared heritage. Read any text in any tradition, forever free. Premium tools for deeper study.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-[#1a1a3e] text-[#c9a84c] rounded-xl font-bold hover:bg-[#2a2a5e] transition-colors">
            Start Reading — Free
          </button>
          <button className="px-8 py-3 bg-[#f5f0e8] text-[#1a1a3e] rounded-xl font-bold hover:bg-[#e8e0d0] transition-colors border border-[#e8e0d0]">
            Scholar Plan — $9.99/mo
          </button>
        </div>
        <p className="text-xs text-[#6b7280] mt-4">No ads. Ever. Sacred content deserves better.</p>
      </section>
    </>
  );
}
