import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advertise With Us | U-God Sacred Texts',
  description: 'Partner with U-God. Reach a spiritually engaged audience across world religions through sponsored content and editorial link placements.',
  robots: 'noindex',
}

export default function AdvertisePage() {
  const GOLD = '#c9a84c'
  const DARK = '#1a1a3e'
  const options = [
    { name: 'Sponsored Post', price: '$300', desc: 'Editorial article covering religion, spirituality, interfaith topics, or spiritual wellness. One dofollow link. Permanent placement.', tags: ['800-1,200 words', '1 dofollow link', 'Permanent'] },
    { name: 'Link Insertion', price: '$125', desc: 'Contextual link added to an existing U-God article or resources page. Relevant anchor text, permanent placement.', tags: ['Existing content', '1 dofollow link', 'Permanent'] },
    { name: 'Resource Feature', price: '$200', desc: 'Add your book, course, or product to our /resources page alongside our curated recommendations. Ideal for publishers, authors, and spiritual educators.', tags: ['Resources page', 'Affiliate or flat fee', 'Permanent'] },
  ]
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: `linear-gradient(135deg, ${DARK} 0%, #2a1a4e 100%)`, padding: '72px 5vw 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: '3px', color: GOLD, fontWeight: 700, marginBottom: 20 }}>PARTNERSHIPS</div>
        <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, color: '#f5f0e8', margin: '0 0 20px', letterSpacing: '-1px' }}>Advertise on U-God</h1>
        <p style={{ fontSize: 17, color: 'rgba(245,240,232,0.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>Reach a spiritually engaged audience across Judaism, Islam, Christianity, Buddhism, Hinduism, and interfaith traditions.</p>
      </div>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 5vw' }}>
        <div style={{ display: 'grid', gap: 20 }}>
          {options.map(o => (
            <div key={o.name} style={{ border: `1px solid ${GOLD}30`, padding: '32px', background: `${GOLD}08` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: DARK, margin: 0 }}>{o.name}</h3>
                <span style={{ fontSize: 26, fontWeight: 900, color: GOLD }}>{o.price}</span>
              </div>
              <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 16 }}>{o.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {o.tags.map(t => <span key={t} style={{ fontSize: 11, padding: '5px 10px', background: `${GOLD}18`, color: GOLD, fontWeight: 600 }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: DARK, padding: '56px 5vw', textAlign: 'center' }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#f5f0e8', marginBottom: 12 }}>Get in Touch</h2>
        <p style={{ color: 'rgba(245,240,232,0.5)', marginBottom: 28, fontSize: 15 }}>Email us with your site, target URL, and preferred option.</p>
        <a href="mailto:hello@thevoiceofcash.com?subject=U-God%20Advertising%20Inquiry"
          style={{ display: 'inline-block', background: GOLD, color: DARK, fontWeight: 900, fontSize: 14, padding: '16px 40px', textDecoration: 'none', letterSpacing: '1px' }}>
          EMAIL TO GET STARTED
        </a>
      </div>
    </div>
  )
}
