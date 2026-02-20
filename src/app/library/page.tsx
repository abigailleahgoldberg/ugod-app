'use client';
import { traditions } from '@/data/passages';

export default function LibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1a1a3e] mb-3">Sacred Library</h1>
        <p className="text-[#6b7280] max-w-xl mx-auto">Every major world tradition. Thousands of texts. One library.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {traditions.map(t => (
          <a
            key={t.key}
            href={`/library/${t.key}`}
            className="passage-card bg-white rounded-xl p-6 border border-[#e8e0d0] hover:border-[#c9a84c]/50 flex gap-4"
          >
            <div className="text-4xl">{t.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1a1a3e] text-lg mb-1">{t.name}</h3>
              <p className="text-sm text-[#6b7280] mb-2">{t.description}</p>
              <div className="flex gap-3 text-xs text-[#6b7280]">
                <span>{t.textCount}+ texts</span>
                <span>•</span>
                <span>{t.passageCount.toLocaleString()}+ passages</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 text-center p-10 bg-[#f5f0e8] rounded-2xl">
        <h3 className="text-xl font-bold text-[#1a1a3e] mb-3">Powered by Open Sources</h3>
        <p className="text-sm text-[#6b7280] max-w-lg mx-auto mb-4">
          U-God aggregates sacred texts from the world&apos;s best open APIs and public domain sources:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Sefaria', 'Quran.com', 'API.Bible', 'SuttaCentral', 'SikhiToTheMax', 'Sacred-Texts.com', 'Project Gutenberg'].map(s => (
            <span key={s} className="px-3 py-1.5 bg-white rounded-lg text-xs text-[#1a1a3e] border border-[#e8e0d0]">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
