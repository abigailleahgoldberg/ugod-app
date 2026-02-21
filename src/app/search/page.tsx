'use client';
import { useState, useCallback, useRef } from 'react';
import { traditions } from '@/data/passages';

interface SearchResult {
  id: string;
  text: string;
  reference: string;
  tradition: string;
  traditionKey: string;
  emoji: string;
  color: string;
  book?: string;
  url: string;
}

interface SearchResponse {
  results: SearchResult[];
  query: string;
  traditions: Record<string, number>;
  total: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [tradCounts, setTradCounts] = useState<Record<string, number>>({});
  const [filterTradition, setFilterTradition] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: SearchResponse = await res.json();
      setResults(data.results || []);
      setTradCounts(data.traditions || {});
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  const handleInput = (q: string) => {
    setQuery(q);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(q), 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    search(query);
  };

  const filteredResults = filterTradition
    ? results.filter(r => r.traditionKey === filterTradition)
    : results;

  const activeTraditions = Array.from(new Set(results.map(r => r.traditionKey)));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">Search Sacred Texts</h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base">Search across Christianity, Islam, Judaism, and Hinduism — live from sacred text APIs.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="search-container mb-6">
        <div className="bg-white rounded-2xl border border-[var(--gold)]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center px-4 sm:px-6">
            <svg className="w-5 h-5 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              value={query}
              onChange={e => handleInput(e.target.value)}
              placeholder="Search for love, forgiveness, creation, peace..."
              className="flex-1 bg-transparent px-4 py-4 sm:py-5 outline-none text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] min-w-0"
              autoFocus
            />
            {loading && (
              <div className="w-5 h-5 border-2 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin" />
            )}
            {query && !loading && (
              <button type="button" onClick={() => { setQuery(''); setResults([]); setSearched(false); }} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">✕</button>
            )}
          </div>
        </div>
      </form>

      {/* Quick suggestions */}
      {!searched && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['love', 'forgiveness', 'peace', 'death', 'wisdom', 'creation', 'prayer', 'suffering', 'mercy', 'truth'].map(s => (
            <button key={s} onClick={() => { setQuery(s); search(s); }} className="px-3 py-1.5 rounded-full text-sm bg-[var(--cream-warm)] text-[var(--text-secondary)] hover:bg-[var(--parchment)] border border-transparent hover:border-[var(--gold)]/20 transition-all">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Tradition filter pills */}
      {activeTraditions.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterTradition(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!filterTradition ? 'bg-[var(--gold)] text-white' : 'bg-[var(--cream-warm)] text-[var(--text-muted)]'}`}
          >
            All ({results.length})
          </button>
          {activeTraditions.map(tk => {
            const t = traditions.find(tr => tr.key === tk);
            if (!t) return null;
            const count = tradCounts[tk] || results.filter(r => r.traditionKey === tk).length;
            return (
              <button
                key={tk}
                onClick={() => setFilterTradition(filterTradition === tk ? null : tk)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterTradition === tk ? 'text-white' : 'bg-[var(--cream-warm)] text-[var(--text-muted)]'}`}
                style={filterTradition === tk ? { backgroundColor: t.color } : {}}
              >
                {t.emoji} {t.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Results */}
      {loading && results.length === 0 && (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-muted)] text-sm">Searching across traditions...</p>
        </div>
      )}

      {searched && !loading && results.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="text-4xl mb-4">🔮</div>
          <p className="text-[var(--text-secondary)] mb-2">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-[var(--text-muted)]">Try a simpler keyword like &ldquo;love&rdquo;, &ldquo;peace&rdquo;, or &ldquo;mercy&rdquo;</p>
        </div>
      )}

      {filteredResults.length > 0 && (
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-4 font-medium tracking-wider uppercase">
            {filteredResults.length} passages across {activeTraditions.length} tradition{activeTraditions.length > 1 ? 's' : ''}
          </p>
          <div className="space-y-4">
            {filteredResults.map(r => (
              <a
                key={r.id}
                href={r.url}
                className="block bg-white rounded-xl p-5 sm:p-6 border border-gray-100 hover:border-[var(--gold)]/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white tracking-wide uppercase" style={{ backgroundColor: r.color }}>
                    {r.emoji} {r.tradition}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-[var(--text-muted)]">{r.reference}</span>
                </div>
                <p className="font-sacred text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
                  &ldquo;{r.text.length > 300 ? r.text.slice(0, 300) + '...' : r.text}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-[var(--gold)]">Read full text →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!searched && (
        <div className="text-center py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            {[
              { q: 'What is love?', icon: '❤️' },
              { q: 'Finding peace', icon: '🕊️' },
              { q: 'Creation of the world', icon: '🌍' },
              { q: 'Life after death', icon: '🌅' },
              { q: 'Forgiveness', icon: '🙏' },
              { q: 'Wisdom and knowledge', icon: '📖' },
            ].map(({ q, icon }) => (
              <button key={q} onClick={() => { setQuery(q); search(q); }} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-[var(--gold)]/30 hover:shadow-sm text-left transition-all">
                <span className="text-xl">{icon}</span>
                <span className="block mt-1.5 text-sm text-[var(--text-secondary)]">{q}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
