import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intellectual Property Notice | U-God Sacred Library',
  description: 'Intellectual property notice and copyright statement for U-God Sacred Library and its proprietary Sacred Calendar feature.',
  robots: { index: true },
};

export default function IPNoticePage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'rgba(255,255,255,0.75)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: '#D4AF37', marginBottom: 12 }}>LEGAL</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Intellectual Property Notice</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>U-God Sacred Library | A product of The Voice of Cash LLC | Las Vegas, Nevada</p>

        <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', padding: '20px 24px', marginBottom: 48, fontSize: 14, lineHeight: 1.7 }}>
          <strong style={{ color: '#D4AF37' }}>Summary:</strong> U-God Sacred Library and its Sacred Calendar feature are original works created by The Voice of Cash LLC. The concept, design, curation methodology, cross-tradition structure, and presentation system are proprietary intellectual property. Sacred texts themselves are in the public domain or used under fair use doctrine. The original work surrounding them is not.
        </div>

        {[
          {
            h: '1. Ownership',
            b: 'U-God Sacred Library is an original work created, designed, and published by The Voice of Cash LLC, a Nevada limited liability company. All original content on this platform — including but not limited to: site design and visual presentation, content curation and selection methodology, cross-tradition thematic indexing, the Sacred Calendar system, holiday and observance page content, tradition overview pages, blog content, structural organization, and the unique combination of features constituting this platform — is the exclusive intellectual property of The Voice of Cash LLC.\n\nNo prior claim to this combination, structure, or presentation exists. This platform was independently conceived and built.'
          },
          {
            h: '2. The Sacred Calendar — Proprietary Feature',
            b: 'The Sacred Calendar (accessible at u-god.com/calendar) is an original proprietary feature of U-God Sacred Library, owned exclusively by The Voice of Cash LLC.\n\nThe Sacred Calendar is defined as: a multi-tradition religious and spiritual observance calendar that cross-references holidays, sacred days, and observances from 25+ world traditions, organized by date, linked to original educational content, and presented in a unified browsable interface.\n\nThis specific combination — multi-tradition calendar cross-referencing, original educational content per observance, cross-tradition linking, and integrated interface — is an original creative and technical work. The Voice of Cash LLC asserts full intellectual property ownership over this feature and its format, structure, and presentation.\n\nReproduction, imitation, or derivative use of the Sacred Calendar concept, structure, or content without express written permission from The Voice of Cash LLC is prohibited.'
          },
          {
            h: '3. Sacred Texts and Public Domain Content',
            b: 'Many sacred texts reproduced on this platform — including scriptures, sutras, hymns, and classical religious writings — are in the public domain due to age. Some texts are used under fair use doctrine for educational, commentary, and informational purposes.\n\nThe public domain status of the underlying texts does not extend to the original work of The Voice of Cash LLC surrounding them. The following remain exclusively proprietary:\n\n— Selection, curation, and grouping of passages\n— Original commentary, context, and framing\n— Cross-tradition annotations and thematic connections\n— All original site content, descriptions, and explanatory text\n— The organizational structure and navigation system\n— The Sacred Calendar feature\n— All design elements and visual presentation'
          },
          {
            h: '4. Trademark and Brand',
            b: '"U-God Sacred Library," the U-God brand identity as applied to this platform, and associated design marks are proprietary designations of The Voice of Cash LLC. "The Voice of Cash" is a proprietary brand of The Voice of Cash LLC.\n\nUnauthorized use of these marks in connection with any competing or related service is prohibited.'
          },
          {
            h: '5. Permitted Use',
            b: 'Users of U-God Sacred Library may:\n— Read and study the content for personal, educational, and research purposes\n— Share links to specific pages on this platform\n— Quote limited passages for educational, commentary, or journalistic purposes with attribution to u-god.com\n\nUsers may not:\n— Reproduce substantial portions of original content without permission\n— Create derivative works based on the Sacred Calendar structure or format\n— Scrape, mirror, or republish content at scale\n— Use the platform\'s design, structure, or features as the basis for a competing service'
          },
          {
            h: '6. Copyright Notice',
            b: '© 2026 The Voice of Cash LLC. All original content, curation, design, and features reserved.\n\nSacred texts used herein may be in the public domain or used under fair use. Original works surrounding those texts are copyright The Voice of Cash LLC. All rights reserved.'
          },
          {
            h: '7. Contact for Licensing',
            b: 'For licensing inquiries, permissions requests, partnership discussions, or to report unauthorized use of intellectual property owned by The Voice of Cash LLC, contact:\n\nThe Voice of Cash LLC\nLas Vegas, Nevada, United States\nthevoiceofcash.com'
          },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#D4AF37', marginBottom: 12 }}>{s.h}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.85, whiteSpace: 'pre-line' }}>{s.b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
