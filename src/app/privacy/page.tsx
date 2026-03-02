import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | U-God Sacred Library',
  description: 'Privacy policy for U-God Sacred Library, a product of The Voice of Cash LLC.',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'rgba(255,255,255,0.75)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: '#D4AF37', marginBottom: 12 }}>LEGAL</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>Effective date: January 1, 2026 | U-God Sacred Library | A product of The Voice of Cash LLC</p>

        {[
          { h: '1. Who We Are', b: 'U-God Sacred Library (u-god.com) is a product of The Voice of Cash LLC, a Nevada limited liability company. The Voice of Cash LLC is the data controller for this website. References to "we," "us," or "our" refer to The Voice of Cash LLC.\n\nContact: thevoiceofcash.com | Las Vegas, Nevada' },
          { h: '2. Information We Collect', b: 'U-God Sacred Library is designed as a read-only reference resource. We do not require account creation or personal registration.\n\nWe may collect limited technical data automatically:\n— IP address (anonymized where feasible)\n— Browser type and version\n— Pages visited and time spent\n— Referring URL\n— Device type and operating system\n\nWe do not collect names, email addresses, phone numbers, or financial information.' },
          { h: '3. Cookies and Tracking', b: 'We may use minimal session cookies for functionality such as bookmarks stored locally via localStorage. No cross-site tracking cookies are used. No advertising networks receive your data through this site.\n\nYou may disable cookies in your browser without losing access to content.' },
          { h: '4. How We Use Information', b: 'Technical data is used solely for:\n— Understanding site navigation to improve content\n— Diagnosing technical issues\n— Security monitoring\n\nWe do not sell, rent, or trade any collected data to third parties.' },
          { h: '5. Third-Party Services', b: 'This website is hosted on Vercel. Vercel may collect limited technical data as part of infrastructure operation. Their privacy policy is available at vercel.com/legal/privacy-policy.\n\nWe do not embed third-party advertising, social tracking pixels, or analytics that profile individual users.' },
          { h: '6. Data Retention', b: 'Server log data is retained for up to 90 days for security and diagnostic purposes, then deleted. No personal profile data is retained because none is collected.' },
          { h: '7. Your Rights', b: 'Depending on your jurisdiction, you may have rights including: access to data held about you, deletion of data, and the right to opt out of data sales (we do not sell data). Contact us at thevoiceofcash.com. We respond within 30 days.' },
          { h: "8. Children's Privacy", b: 'U-God Sacred Library is an educational reference resource for general audiences. We do not knowingly collect personal information from children under 13. Contact us immediately if you believe a child has provided personal information through this site.' },
          { h: '9. Changes to This Policy', b: 'We may update this policy to reflect changes in practice or law. Changes will be posted here with a revised effective date. Continued use after changes constitutes acceptance of the updated policy.' },
          { h: '10. Contact', b: 'The Voice of Cash LLC\nLas Vegas, Nevada, United States\nthevoiceofcash.com' },
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
