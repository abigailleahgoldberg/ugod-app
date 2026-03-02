import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copyright Notice | U-God Sacred Library',
  description: 'Copyright information for U-God Sacred Library. Original curation, design, and features are copyright The Voice of Cash LLC.',
  robots: { index: true },
};

export default function CopyrightPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'rgba(255,255,255,0.75)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: '#D4AF37', marginBottom: 12 }}>LEGAL</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Copyright Notice</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>U-God Sacred Library | A product of The Voice of Cash LLC</p>

        <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)', padding: '28px 32px', marginBottom: 48 }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#D4AF37', marginBottom: 12 }}>© 2026 The Voice of Cash LLC</p>
          <p style={{ fontSize: 14, lineHeight: 1.8 }}>All original content, design, curation, structural organization, and proprietary features of U-God Sacred Library are copyright The Voice of Cash LLC, a Nevada limited liability company. All rights reserved.</p>
        </div>

        {[
          { h: 'What Is Protected', b: 'The following elements of U-God Sacred Library are original works protected by copyright:\n\n— Site design, layout, and visual presentation\n— Original descriptive and educational text on all pages\n— Content curation, selection, and organizational methodology\n— Cross-tradition thematic indexing and annotation system\n— The Sacred Calendar feature — its structure, format, and content\n— Holiday and observance page content\n— Tradition overview and introductory content\n— Blog articles and original written works\n— The unique combination and presentation of all features on this platform' },
          { h: 'What Is Not Protected by Us', b: 'Sacred texts, scriptures, sutras, and classical religious writings reproduced on this platform that were authored more than 95 years ago are in the public domain. Some additional texts are reproduced under fair use doctrine for educational purposes.\n\nThe public domain status of source texts does not extend to The Voice of Cash LLC\'s original work in curating, contextualizing, annotating, and presenting those texts on this platform.' },
          { h: 'Fair Use', b: 'Limited quotation of content from U-God Sacred Library for purposes of education, criticism, commentary, or news reporting is permitted under fair use doctrine, provided that:\n\n— The quotation is proportionate to the purpose\n— Attribution is given to U-God Sacred Library (u-god.com)\n— The use does not serve as a substitute for visiting the original platform\n\nFor any use beyond fair use, written permission from The Voice of Cash LLC is required.' },
          { h: 'DMCA Policy', b: 'If you believe content on U-God Sacred Library infringes your copyright, contact The Voice of Cash LLC with: identification of the copyrighted work, identification of the allegedly infringing material and its location on our site, your contact information, and a statement that you have a good faith belief that use of the material is not authorized.\n\nWe will investigate and respond promptly to good-faith DMCA notices.' },
          { h: 'Reporting Infringement', b: 'If you identify unauthorized use of U-God Sacred Library\'s original content or the Sacred Calendar concept on another platform, please report it to The Voice of Cash LLC at thevoiceofcash.com. We take intellectual property seriously and will pursue appropriate remedies.' },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#D4AF37', marginBottom: 12 }}>{s.h}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.85, whiteSpace: 'pre-line' }}>{s.b}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>A product of The Voice of Cash LLC | Las Vegas, Nevada</p>
          <a href="https://thevoiceofcash.com" style={{ fontSize: 12, color: '#D4AF37', textDecoration: 'none' }}>thevoiceofcash.com</a>
        </div>
      </div>
    </div>
  );
}
