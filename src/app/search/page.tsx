'use client';
import { useState } from 'react';
import { searchPassages, traditions, Passage, getCrossRefs } from '@/data/passages';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Passage[]>([]);
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [selectedTraditions, setSelectedTraditions] = useState<string[]>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim().length > 1) {
      let res = searchPassages(q);
      if (selectedTraditions.length > 0) {
        res = res.filter(p => selectedTraditions.includes(p.traditionKey));
      }
      setResults(res);
    } else {
      setResults([]);
    }
  };

  const toggleTradition = (key: string) => {
    const next = selectedTraditions.includes(key) 
      ? selectedTraditions.filter(k => k !== key) 
      : [...selectedTraditions, key];
    setSelectedTraditions(next);
    if (query.trim().length > 1) {
      let res = searchPassages(query);
      if (next.length > 0) res = res.filter(p => next.includes(p.traditionKey));
      setResults(res);
    }
  };

  const crossRefs = selectedPassage ? getCrossRefs(selectedPassage) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#1a1a3e] mb-3">Search Sacred Texts</h1>
        <p className="text-[#6b7280]">Type a feeling, a question, or a topic. U-God understands what you need.</p>
      </div>

      {/* Search */}
      <div className="search-glow bg-white rounded-2xl border border-[#c9a84c]/30 p-1.5 mb-6">
        <div className="flex items-center">
          <span className="pl-4 text-xl">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="What does your heart need right now?"
            className="flex-1 bg-transparent px-4 py-4 outline-none text-lg text-[#1a1a2e] placeholder-[#9ca3af]"
            autoFocus
          />
          {query && <button onClick={() => handleSearch('')} className="pr-4 text-[#9ca3af]">✕</button>}
        </div>
      </div>

      {/* Tradition Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-sm text-[#6b7280] py-1">Filter:</span>
        {traditions.slice(0, 10).map(t => (
          <button
            key={t.key}
            onClick={() => toggleTradition(t.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedTraditions.includes(t.key)
                ? 'text-white'
                : 'bg-[#f5f0e8] text-[#6b7280] hover:bg-[#e8e0d0]'
            }`}
            style={selectedTraditions.includes(t.key) ? { backgroundColor: t.color } : {}}
          >
            {t.emoji} {t.name}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Results */}
        <div className="flex-1">
          {results.length > 0 ? (
            <div>
              <p className="text-sm text-[#6b7280] mb-4">
                {results.length} passages found across {new Set(results.map(r => r.tradition)).size} traditions
              </p>
              <div className="space-y-4">
                {results.map(p => (
                  <div
                    key={p.id}
                    className={`passage-card bg-white rounded-xl p-6 cursor-pointer border border-[#e8e0d0] tradition-${p.traditionKey} ${
                      selectedPassage?.id === p.id ? 'ring-2 ring-[#c9a84c]' : ''
                    }`}
                    onClick={() => setSelectedPassage(p)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: traditions.find(t => t.key === p.traditionKey)?.color }}>
                        {traditions.find(t => t.key === p.traditionKey)?.emoji} {p.tradition}
                      </span>
                      <span className="text-xs text-[#6b7280]">{p.reference}</span>
                    </div>
                    <p className="font-sacred text-[#1a1a2e] leading-relaxed">
                      &ldquo;{p.text}&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.themes.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 bg-[#f5f0e8] text-[#6b7280] rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : query.length > 1 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-[#e8e0d0]">
              <div className="text-4xl mb-4">🔮</div>
              <p className="text-[#6b7280] mb-2">No exact matches in preview data.</p>
              <p className="text-sm text-[#9ca3af]">The full app searches 5M+ passages with AI-powered semantic understanding.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['love', 'suffering', 'creation', 'peace', 'forgiveness', 'wisdom', 'death', 'prayer'].map(s => (
                  <button key={s} onClick={() => handleSearch(s)} className="px-3 py-1 bg-[#f5f0e8] rounded-full text-sm text-[#6b7280] hover:bg-[#e8e0d0]">{s}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📖</div>
              <p className="text-xl text-[#1a1a3e] font-bold mb-2">Begin your search</p>
              <p className="text-[#6b7280]">Try searching for a feeling, a question, or a theme.</p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mt-6">
                {[
                  { q: 'I feel lost and alone', icon: '💙' },
                  { q: 'What is the meaning of life?', icon: '🌟' },
                  { q: 'How to forgive someone', icon: '🕊️' },
                  { q: 'Love poems from every tradition', icon: '❤️' },
                  { q: 'What happens after death?', icon: '🌅' },
                  { q: 'Finding peace in chaos', icon: '🧘' },
                ].map(({ q, icon }) => (
                  <button key={q} onClick={() => handleSearch(q)} className="passage-card p-4 bg-white rounded-xl border border-[#e8e0d0] text-left text-sm text-[#1a1a3e]">
                    <span className="text-lg">{icon}</span>
                    <span className="block mt-1 text-[#6b7280]">{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cross-Reference Panel (Desktop) */}
        {selectedPassage && (
          <div className="hidden lg:block w-80">
            <div className="sticky top-24 bg-white rounded-xl border border-[#e8e0d0] p-6">
              <h3 className="text-sm font-bold text-[#c9a84c] mb-4">✨ Cross-References</h3>
              <p className="text-xs text-[#6b7280] mb-4">{selectedPassage.reference}</p>
              {crossRefs.length > 0 ? (
                <div className="space-y-4">
                  {crossRefs.map(ref => (
                    <div key={ref.id} className={`p-3 bg-[#fafaf7] rounded-lg border-l-2`} style={{ borderColor: traditions.find(t => t.key === ref.traditionKey)?.color }}>
                      <div className="text-xs font-medium mb-1" style={{ color: traditions.find(t => t.key === ref.traditionKey)?.color }}>
                        {traditions.find(t => t.key === ref.traditionKey)?.emoji} {ref.reference}
                      </div>
                      <p className="font-sacred text-xs text-[#1a1a2e] leading-relaxed">
                        &ldquo;{ref.text.length > 120 ? ref.text.slice(0, 120) + '...' : ref.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9ca3af]">Full cross-references available in the complete library.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
