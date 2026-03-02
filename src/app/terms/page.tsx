import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — U-God Sacred Library',
  description: 'Terms of Service and copyright notice for U-God, the free sacred texts library.',
  alternates: { canonical: 'https://u-god.com/terms' },
};

const copyrightSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service — U-God Sacred Library',
  url: 'https://u-god.com/terms',
  copyrightYear: 2026,
  copyrightHolder: { '@type': 'Organization', name: 'The Voice of Cash LLC', url: 'https://thevoiceofcash.com' },
  license: 'https://u-god.com/terms',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://u-god.com' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://u-god.com/terms' },
  ],
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(copyrightSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="text-4xl font-bold text-[#1a1a3e] mb-2 text-center">Terms of Service</h1>
      <p className="text-center text-sm text-[#6b7280] mb-10">Last updated: February 27, 2025</p>
      <div className="space-y-6 text-[#1a1a2e]">
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-xl font-bold text-[#1a1a3e] mb-3">1. Acceptance of Terms</h2>
          <p className="leading-relaxed text-[#374151]">By accessing or using U-God (u-god.com), you agree to be bound by these Terms of Service. If you do not agree, do not use this site.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-xl font-bold text-[#1a1a3e] mb-3">2. Intellectual Property &amp; Copyright</h2>
          <p className="leading-relaxed text-[#374151] mb-4">The following are the exclusive intellectual property of U-God and are protected by copyright law:</p>
          <ul className="space-y-2 mb-4">
            {[
              'The selection, arrangement, and curation of sacred texts into this library',
              'All original written content including tradition descriptions, holiday summaries, and editorial commentary',
              'The site design, architecture, user interface, and visual presentation',
              'The cross-reference engine, search system, and recommendation logic',
              'The sacred holiday calendar, holiday descriptions, and associated data',
              'All structural data including tradition configurations, passage mappings, and schema markup',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-[#c9a84c] mt-1 shrink-0">©</span>
                <span className="text-sm text-[#374151]">{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-[#fef3c7] border border-[#f59e0b]/30 rounded-xl p-4">
            <p className="text-sm font-semibold text-[#92400e] mb-1">Note on source texts:</p>
            <p className="text-sm text-[#92400e] leading-relaxed">The underlying sacred scriptures are ancient texts in the public domain. Our copyright applies to the original layer we built — the curation, structure, descriptions, cross-references, and presentation.</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-xl font-bold text-[#1a1a3e] mb-3">3. Prohibited Uses</h2>
          <p className="leading-relaxed text-[#374151] mb-4">You may <strong>not</strong>:</p>
          <ul className="space-y-2">
            {[
              'Scrape, crawl, or systematically extract content from U-God to build a competing service',
              'Reproduce, duplicate, or mirror this site\'s structure, design, or curated content without written permission',
              'Use automated tools to harvest holiday data, tradition descriptions, or editorial content in bulk',
              'Train AI or machine learning models on our original content without explicit written consent',
              'Represent U-God\'s curated content as your own original work',
              'Commercially exploit any portion of our original content without a licensing agreement',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-red-400 mt-1 shrink-0">✕</span>
                <span className="text-sm text-[#374151]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-xl font-bold text-[#1a1a3e] mb-3">4. Permitted Uses</h2>
          <p className="leading-relaxed text-[#374151] mb-4">You <strong>may</strong>:</p>
          <ul className="space-y-2">
            {[
              'Read, study, and share individual passages for personal, educational, or spiritual purposes',
              'Link to any page on U-God from your website, blog, or social media',
              'Quote brief excerpts (under 200 words) with clear attribution and a link back to the source page',
              'Access the underlying public domain scriptures directly from their original sources',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-green-500 mt-1 shrink-0">✓</span>
                <span className="text-sm text-[#374151]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-xl font-bold text-[#1a1a3e] mb-3">5. AI Training &amp; Automated Access</h2>
          <p className="leading-relaxed text-[#374151] mb-4">We welcome AI search engines and citation tools that help users <em>discover</em> our content. However:</p>
          <p className="leading-relaxed text-[#374151]">Any use of automated tools to extract our original content — tradition descriptions, holiday data, cross-references, editorial annotations, or site architecture — for the purpose of training AI models or building derivative products is strictly prohibited without a written licensing agreement.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-xl font-bold text-[#1a1a3e] mb-3">6. DMCA &amp; Takedown Policy</h2>
          <p className="leading-relaxed text-[#374151]">If you believe content on U-God infringes your copyright, or if you discover our original content has been copied without permission, please contact us. We take IP violations seriously — both as a target and as a responsible publisher.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e0d0]">
          <h2 className="text-xl font-bold text-[#1a1a3e] mb-3">7. Disclaimer</h2>
          <p className="leading-relaxed text-[#374151]">U-God is provided &ldquo;as is&rdquo; for educational and spiritual purposes. Sacred texts are living documents with centuries of scholarly debate — we present them with care but encourage independent study.</p>
        </div>
        <div className="bg-[#1a1a3e] rounded-2xl p-8 text-center">
          <p className="text-[#c9a84c] font-bold text-lg mb-2">© {new Date().getFullYear()} U-God Sacred Library</p>
          <p className="text-white/60 text-sm">All original content, curation, and architecture reserved.</p>
          <p className="text-white/40 text-xs mt-3">The sacred texts themselves are ancient and belong to all of humanity. Our work building this library is ours.</p>
        </div>
      </div>
    </div>
  );
}
