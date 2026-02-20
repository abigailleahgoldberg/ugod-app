export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#1a1a3e] mb-8 text-center">About U-God</h1>
      
      <div className="prose prose-lg mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0] mb-8">
          <h2 className="text-2xl font-bold text-[#1a1a3e] mb-4">The Vision</h2>
          <p className="font-sacred text-lg text-[#1a1a2e] leading-relaxed mb-4">
            Bible apps serve Christians. Quran apps serve Muslims. Sefaria serves Jews. 
            Nobody serves the <strong>seeker</strong> — the person who wants to read across traditions, 
            discover connections, and go deep without switching between ten different apps.
          </p>
          <p className="font-sacred text-lg text-[#1a1a2e] leading-relaxed mb-4">
            U-God is the world&apos;s first sacred text platform that connects every major spiritual tradition 
            in one beautiful, searchable library. Not to flatten their differences — but to reveal their conversation.
          </p>
          <p className="font-sacred text-lg text-[#1a1a2e] leading-relaxed">
            <em>U-God doesn&apos;t argue that all religions are the same. It shows that all religions are in conversation. The user listens to that conversation.</em>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0] mb-8">
          <h2 className="text-2xl font-bold text-[#1a1a3e] mb-4">What We Believe</h2>
          <ul className="space-y-3">
            {[
              'Sacred texts are humanity\'s shared heritage. They should be free to read. Always.',
              'Every tradition deserves respect. Even ones you disagree with.',
              'Questions are welcome; mockery is not.',
              'Parallels are fascinating. Differences are equally important.',
              'The best technology disappears. The reader should see the text, not the app.',
              'No ads on sacred content. This is a principle, not a tactic.',
              'Accessibility is not optional. A platform that excludes anyone isn\'t sacred.',
            ].map((belief, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-[#c9a84c] mt-1">✦</span>
                <span className="font-sacred text-[#1a1a2e]">{belief}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0] mb-8">
          <h2 className="text-2xl font-bold text-[#1a1a3e] mb-4">The Technology</h2>
          <p className="font-sacred text-[#1a1a2e] leading-relaxed mb-4">
            U-God uses AI-powered semantic search to understand what you&apos;re looking for — not just matching keywords, 
            but understanding meaning. When you type &ldquo;I feel lost and alone,&rdquo; U-God finds Psalm 23, 
            the Quran&apos;s promise of nearness, the Bhagavad Gita&apos;s assurance, and Rumi&apos;s wisdom — 
            even though none of those passages contain the words &ldquo;lost&rdquo; or &ldquo;alone.&rdquo;
          </p>
          <p className="font-sacred text-[#1a1a2e] leading-relaxed">
            Our cross-reference engine connects passages across traditions through explicit references, 
            thematic parallels, and AI-detected similarities. The result: a library that feels alive.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0] mb-8">
          <h2 className="text-2xl font-bold text-[#1a1a3e] mb-4">The Mission</h2>
          <p className="font-sacred text-[#1a1a2e] leading-relaxed mb-4">
            U-God is built by the Wu-Tang AI Clan, a collective dedicated to using AI for genuine human good. 
            A portion of all revenue supports <strong>WeBearish</strong> — an autism acceptance initiative 
            building sensory-friendly play centers for autistic children.
          </p>
          <div className="bg-[#f5f0e8] rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">♾️</span>
            <div>
              <p className="font-bold text-[#1a1a3e] text-sm">WeBearish — Acceptance, Not Awareness</p>
              <p className="text-xs text-[#6b7280]">Every dollar serves the mission. The mission is the children.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-2xl font-bold text-[#1a1a3e] mb-4">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#fafaf7] rounded-xl border border-[#e8e0d0]">
              <h3 className="font-bold text-[#1a1a3e] mb-1">Free</h3>
              <p className="text-2xl font-bold text-[#c9a84c] mb-2">$0</p>
              <p className="text-xs text-[#6b7280]">Read any text. Basic search. Daily verse. Bookmarks. Forever free.</p>
            </div>
            <div className="p-4 bg-[#1a1a3e] rounded-xl text-white">
              <h3 className="font-bold text-[#c9a84c] mb-1">Scholar</h3>
              <p className="text-2xl font-bold text-[#c9a84c] mb-2">$9.99<span className="text-sm">/mo</span></p>
              <p className="text-xs text-[#9ca3af]">AI commentary. Cross-references. Audio. Study plans. Offline access.</p>
            </div>
            <div className="p-4 bg-[#fafaf7] rounded-xl border border-[#e8e0d0]">
              <h3 className="font-bold text-[#1a1a3e] mb-1">Seminary</h3>
              <p className="text-2xl font-bold text-[#c9a84c] mb-2">$29.99<span className="text-sm text-[#6b7280]">/mo</span></p>
              <p className="text-xs text-[#6b7280]">API access. Textual criticism. Bulk export. Student management.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
