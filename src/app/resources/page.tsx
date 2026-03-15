import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recommended Books & Resources | U-God Sacred Texts',
  description: 'Curated books, study guides, and resources across world religions and spiritual traditions. Handpicked for sincere seekers.',
  alternates: { canonical: 'https://u-god.com/resources' },
};

const GOLD = '#c9a84c';
const DARK = '#1a1a3e';

const categories = [
  {
    name: 'Judaism', emoji: '✡️', color: '#1a3a6b',
    books: [
      { title: 'The Koren Talmud Bavli', desc: 'The most accessible English Talmud translation. Essential for serious study.', link: 'https://www.amazon.com/s?k=koren+talmud+bavli&tag=theclantv20-20', price: '$39+' },
      { title: 'To Be a Jew — Rabbi Hayim Donin', desc: 'The definitive guide to Jewish practice for modern life.', link: 'https://www.amazon.com/s?k=to+be+a+jew+donin&tag=theclantv20-20', price: '$18' },
      { title: 'The Jewish Study Bible', desc: 'Tanakh translation with scholarly commentary. Used in universities worldwide.', link: 'https://www.amazon.com/s?k=jewish+study+bible&tag=theclantv20-20', price: '$45' },
    ],
  },
  {
    name: 'Islam', emoji: '☪️', color: '#1a4a2e',
    books: [
      { title: 'The Study Quran — Seyyed Nasr', desc: 'The most comprehensive English Quran with traditional commentary.', link: 'https://www.amazon.com/s?k=study+quran+nasr&tag=theclantv20-20', price: '$55' },
      { title: 'In the Footsteps of the Prophet — Tariq Ramadan', desc: 'A modern biography of the Prophet Muhammad accessible to all readers.', link: 'https://www.amazon.com/s?k=footsteps+prophet+ramadan&tag=theclantv20-20', price: '$16' },
      { title: 'The Heart of Islam — Seyyed Nasr', desc: 'Core values, compassion, and beauty in Islamic teaching.', link: 'https://www.amazon.com/s?k=heart+of+islam+nasr&tag=theclantv20-20', price: '$17' },
    ],
  },
  {
    name: 'Christianity', emoji: '✝️', color: '#3a1a1a',
    books: [
      { title: 'The New Oxford Annotated Bible', desc: 'Scholarly NRSV translation with extensive historical and cultural notes.', link: 'https://www.amazon.com/s?k=new+oxford+annotated+bible&tag=theclantv20-20', price: '$49' },
      { title: 'Mere Christianity — C.S. Lewis', desc: 'The most widely read Christian apologetic of the 20th century.', link: 'https://www.amazon.com/s?k=mere+christianity+cs+lewis&tag=theclantv20-20', price: '$14' },
      { title: 'The Cost of Discipleship — Bonhoeffer', desc: 'What it actually means to follow Christ. Profound and challenging.', link: 'https://www.amazon.com/s?k=cost+of+discipleship+bonhoeffer&tag=theclantv20-20', price: '$15' },
    ],
  },
  {
    name: 'Buddhism', emoji: '☸️', color: '#3a2a0a',
    books: [
      { title: "In the Buddha's Words — Bhikkhu Bodhi", desc: 'Direct translations from the Pali Canon. The most authoritative anthology.', link: 'https://www.amazon.com/s?k=in+the+buddhas+words+bodhi&tag=theclantv20-20', price: '$22' },
      { title: "The Heart of the Buddha's Teaching — Thich Nhat Hanh", desc: 'Accessible introduction to Buddhist practice for modern readers.', link: 'https://www.amazon.com/s?k=heart+of+buddhas+teaching+thich&tag=theclantv20-20', price: '$16' },
      { title: 'Why Buddhism is True — Robert Wright', desc: 'The science behind mindfulness and Buddhist philosophy.', link: 'https://www.amazon.com/s?k=why+buddhism+is+true+wright&tag=theclantv20-20', price: '$15' },
    ],
  },
  {
    name: 'Hinduism', emoji: '🕉️', color: '#4a1a0a',
    books: [
      { title: 'The Bhagavad Gita — Eknath Easwaran', desc: 'The most beloved English translation. Clear, poetic, and deeply readable.', link: 'https://www.amazon.com/s?k=bhagavad+gita+easwaran&tag=theclantv20-20', price: '$14' },
      { title: 'The Upanishads — Eknath Easwaran', desc: 'Core philosophical texts of Hindu thought in accessible translation.', link: 'https://www.amazon.com/s?k=upanishads+easwaran&tag=theclantv20-20', price: '$16' },
      { title: 'The Yoga Sutras — Patanjali (Satchidananda)', desc: 'Classical text on the philosophy and practice of yoga.', link: 'https://www.amazon.com/s?k=yoga+sutras+satchidananda&tag=theclantv20-20', price: '$13' },
    ],
  },
  {
    name: 'Interfaith & Comparative', emoji: '🌍', color: '#1a2a4a',
    books: [
      { title: "The World's Religions — Huston Smith", desc: 'The gold standard introduction to world religions. Respectful and thorough.', link: 'https://www.amazon.com/s?k=worlds+religions+huston+smith&tag=theclantv20-20', price: '$17' },
      { title: 'God Is Not One — Stephen Prothero', desc: "Why the world's religions are genuinely different and why that matters.", link: 'https://www.amazon.com/s?k=god+is+not+one+prothero&tag=theclantv20-20', price: '$16' },
      { title: 'The Perennial Philosophy — Aldous Huxley', desc: 'The common mystical thread across all major traditions.', link: 'https://www.amazon.com/s?k=perennial+philosophy+huxley&tag=theclantv20-20', price: '$18' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #1a1a3e 0%, #2a1a4e 100%)', padding: '64px 5vw 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, letterSpacing: '3px', color: GOLD, marginBottom: 16, fontWeight: 700 }}>CURATED LIBRARY</div>
        <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#f5f0e8', margin: '0 0 16px', letterSpacing: '-1px' }}>
          Books for Sincere Seekers
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(245,240,232,0.6)', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
          Handpicked texts across every major tradition. Whether beginning a journey or going deeper, these are the books worth your time.
        </p>
      </div>

      <div style={{ background: '#f0ede6', borderBottom: '1px solid #e8e0d0', padding: '12px 5vw', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
          Some links are affiliate links. If you purchase through them, U-God earns a small commission at no extra cost to you. We only recommend books we genuinely endorse.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 5vw' }}>
        {categories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: cat.color, flexShrink: 0, border: '2px solid rgba(0,0,0,0.2)' }} />
              <h2 style={{ fontSize: 28, fontWeight: 900, color: cat.color, margin: 0 }}>{cat.name}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {cat.books.map((book) => (
                <a key={book.title} href={book.link} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: '#fff', border: '1px solid #e8e0d0', padding: '22px 20px', textDecoration: 'none' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: DARK, marginBottom: 8, lineHeight: 1.3 }}>{book.title}</div>
                  <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 14 }}>{book.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: cat.color }}>{book.price}</span>
                    <span style={{ fontSize: 12, color: GOLD, fontWeight: 700 }}>VIEW ON AMAZON →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: DARK, padding: '48px 5vw', textAlign: 'center' }}>
        <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: 15, marginBottom: 20 }}>
          Explore sacred texts directly on U-God. Thousands of passages free, no purchase needed.
        </p>
        <a href="/library" style={{ display: 'inline-block', background: GOLD, color: DARK, fontWeight: 900, fontSize: 14, padding: '14px 36px', textDecoration: 'none', letterSpacing: '1px' }}>
          BROWSE THE LIBRARY
        </a>
      </div>
    </div>
  );
}
