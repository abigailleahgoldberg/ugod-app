'use client';
import { featuredPassages, traditions, getCrossRefs } from '@/data/passages';

export default function DailyPage() {
  const day = new Date().getDate();
  const verse = featuredPassages[day % featuredPassages.length];
  const crossRefs = getCrossRefs(verse);
  const t = traditions.find(tr => tr.key === verse.traditionKey);

  // Generate a week of daily verses
  const weekVerses = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const idx = d.getDate() % featuredPassages.length;
    return { date: d, passage: featuredPassages[idx] };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Today's Verse */}
      <div className="text-center mb-4">
        <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest">✦ Daily Verse ✦</span>
        <h1 className="text-3xl font-bold text-[#1a1a3e] mt-2">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-[#e8e0d0] p-10 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: t?.color }}>
            {t?.emoji} {verse.tradition}
          </span>
        </div>
        <blockquote className="font-sacred text-2xl sm:text-3xl leading-relaxed text-[#1a1a2e] border-l-4 border-[#c9a84c] pl-8 mb-8">
          {verse.text}
        </blockquote>
        <p className="text-[#6b7280] text-lg">— {verse.reference}</p>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {verse.themes.map(theme => (
            <span key={theme} className="px-3 py-1 bg-[#f5f0e8] text-[#6b7280] rounded-full text-sm">{theme}</span>
          ))}
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-[#e8e0d0]">
          <button className="flex-1 py-3 bg-[#1a1a3e] text-[#c9a84c] rounded-xl font-medium hover:bg-[#2a2a5e] transition-colors">
            📖 Read Full Text
          </button>
          <button className="flex-1 py-3 bg-[#f5f0e8] text-[#1a1a3e] rounded-xl font-medium hover:bg-[#e8e0d0] transition-colors">
            🔊 Listen
          </button>
          <button className="py-3 px-5 bg-[#f5f0e8] text-[#1a1a3e] rounded-xl font-medium hover:bg-[#e8e0d0] transition-colors">
            📤 Share
          </button>
        </div>
      </div>

      {/* Cross-References */}
      {crossRefs.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-bold text-[#1a1a3e] mb-4">✨ The same truth, across traditions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {crossRefs.map(ref => {
              const rt = traditions.find(tr => tr.key === ref.traditionKey);
              return (
                <div key={ref.id} className={`bg-white rounded-xl p-6 border border-[#e8e0d0] tradition-${ref.traditionKey} passage-card cursor-pointer`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: rt?.color }}>
                      {rt?.emoji} {ref.tradition}
                    </span>
                    <span className="text-xs text-[#6b7280]">{ref.reference}</span>
                  </div>
                  <p className="font-sacred text-[#1a1a2e] leading-relaxed">
                    &ldquo;{ref.text.length > 200 ? ref.text.slice(0, 200) + '...' : ref.text}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* This Week */}
      <div>
        <h2 className="text-lg font-bold text-[#1a1a3e] mb-4">📅 This Week&apos;s Verses</h2>
        <div className="space-y-3">
          {weekVerses.slice(1).map(({ date, passage }) => {
            const pt = traditions.find(tr => tr.key === passage.traditionKey);
            return (
              <div key={date.toISOString()} className="bg-white rounded-xl p-4 border border-[#e8e0d0] passage-card cursor-pointer flex gap-4 items-start">
                <div className="text-center min-w-[50px]">
                  <div className="text-xs text-[#6b7280]">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="text-lg font-bold text-[#1a1a3e]">{date.getDate()}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs" style={{ color: pt?.color }}>{pt?.emoji} {passage.tradition}</span>
                    <span className="text-xs text-[#6b7280]">• {passage.reference}</span>
                  </div>
                  <p className="font-sacred text-sm text-[#1a1a2e] leading-relaxed">
                    &ldquo;{passage.text.length > 120 ? passage.text.slice(0, 120) + '...' : passage.text}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
