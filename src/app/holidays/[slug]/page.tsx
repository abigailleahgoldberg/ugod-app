import { holidays, getHolidayBySlug, getHolidaysForTradition, calendarTraditions, MONTH_NAMES } from '@/data/holidays';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const holiday = getHolidayBySlug(slug);
  if (!holiday) return {};
  return {
    title: `${holiday.name} — ${holiday.tradition} Holiday`,
    description: `${holiday.description} Learn its significance, how it is observed, and the sacred scripture behind it.`,
    alternates: { canonical: `https://u-god.com/holidays/${slug}` },
    openGraph: {
      title: `${holiday.name} — ${holiday.tradition} Holiday`,
      description: holiday.description,
    },
  };
}

export async function generateStaticParams() {
  return holidays.map(h => ({ slug: h.slug }));
}

export default async function HolidayPage({ params }: Props) {
  const { slug } = await params;
  const holiday = getHolidayBySlug(slug);
  if (!holiday) notFound();

  const trad = calendarTraditions.find(t => t.key === holiday.traditionKey);
  const relatedHolidays = getHolidaysForTradition(holiday.traditionKey).filter(h => h.slug !== slug).slice(0, 4);

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: holiday.name,
    description: holiday.significance,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: {
      '@type': 'Organization',
      name: holiday.tradition,
      url: `https://u-god.com/library/${holiday.traditionKey}`,
    },
    url: `https://u-god.com/holidays/${holiday.slug}`,
    location: {
      '@type': 'VirtualLocation',
      url: `https://u-god.com/holidays/${holiday.slug}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${holiday.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: holiday.significance,
        },
      },
      {
        '@type': 'Question',
        name: `When is ${holiday.name} observed?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${holiday.name} is observed in ${holiday.month}${holiday.day ? ' on the ' + holiday.day + 'th' : ''} by followers of ${holiday.tradition}.`,
        },
      },
      ...(holiday.scriptureRef ? [{
        '@type': 'Question',
        name: `What scripture relates to ${holiday.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The primary scripture associated with ${holiday.name} is ${holiday.scriptureRef}${holiday.scriptureText ? ': "' + holiday.scriptureText + '"' : '.'}`,
        },
      }] : []),
      {
        '@type': 'Question',
        name: `Which religion or tradition observes ${holiday.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${holiday.name} is a sacred observance in ${holiday.tradition}. Learn more about ${holiday.tradition} at u-god.com/library/${holiday.traditionKey}.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://u-god.com' },
      { '@type': 'ListItem', position: 2, name: 'Calendar', item: 'https://u-god.com/calendar' },
      { '@type': 'ListItem', position: 3, name: holiday.tradition, item: `https://u-god.com/library/${holiday.traditionKey}` },
      { '@type': 'ListItem', position: 4, name: holiday.name, item: `https://u-god.com/holidays/${holiday.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="hero-gradient py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/calendar" className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 text-sm mb-6 transition-colors">
            ← Back to Sacred Calendar
          </Link>
          <div className="text-6xl sm:text-7xl mb-4">{holiday.emoji}</div>
          <div className="mb-3">
            <Link
              href={`/library/${holiday.traditionKey}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
              style={{ borderColor: `${trad?.color}60` }}
            >
              {holiday.tradition}
            </Link>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">{holiday.name}</h1>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-4">{holiday.description}</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h16M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>{MONTH_NAMES[holiday.month - 1]} {holiday.day}
              {holiday.duration && holiday.duration > 1 ? ` – ${holiday.duration} days` : ''}
            </span>
            {holiday.isLunar && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                Lunar calendar
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">

        {/* Significance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span style={{ color: trad?.color }}>✦</span> Why It Matters
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{holiday.significance}</p>
        </div>

        {/* How Observed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span style={{ color: trad?.color }}>✦</span> How It Is Observed
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{holiday.howObserved}</p>
        </div>

        {/* Scripture */}
        {holiday.scriptureText && (
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ background: `${trad?.color}08`, borderColor: `${trad?.color}25` }}
          >
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <span style={{ color: trad?.color }}>✦</span> Sacred Text
            </h2>
            <blockquote className="border-l-4 pl-5 py-1" style={{ borderColor: trad?.color }}>
              <p className="text-[var(--text-primary)] text-lg font-medium leading-relaxed italic mb-3">
                &ldquo;{holiday.scriptureText}&rdquo;
              </p>
              {holiday.scriptureRef && (
                <cite className="text-sm not-italic font-medium">
                  <Link
                    href={`/library/${holiday.traditionKey}`}
                    className="hover:opacity-80 transition-opacity"
                    style={{ color: trad?.color }}
                  >
                    — {holiday.scriptureRef} ↗
                  </Link>
                </cite>
              )}
            </blockquote>
            <div className="mt-5">
              <Link
                href={`/library/${holiday.traditionKey}`}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: trad?.color }}
              >
                Read more {holiday.tradition} texts →
              </Link>
            </div>
          </div>
        )}

        {/* Lunar notice */}
        {holiday.isLunar && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            <strong>Note on dates:</strong> This holiday follows a lunar or lunisolar calendar. The date shown is approximate for 2025–2026. Exact dates may vary by one or two days depending on moon sighting and regional tradition. Always confirm with your local community.
          </div>
        )}

        {/* Related holidays from same tradition */}
        {relatedHolidays.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4">
              More {holiday.tradition} Holidays
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedHolidays.map(h => (
                <Link
                  key={h.slug}
                  href={`/holidays/${h.slug}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[var(--gold)]/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-2xl">{h.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">{h.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{MONTH_NAMES[h.month - 1]} {h.day}</p>
                  </div>
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Learn More External Link */}
        {holiday.learnMoreUrl && (
          <div className="p-5 bg-white rounded-2xl border border-gray-100">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--text-muted)] mb-3">Learn More</p>
            <a
              href={holiday.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity"
              style={{ color: trad?.color }}
            >
              <span>🔗</span>
              <span>{holiday.learnMoreLabel || holiday.learnMoreUrl} ↗</span>
            </a>
            <p className="text-xs text-[var(--text-muted)] mt-1">Authoritative external source</p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href={`/library/${holiday.traditionKey}`}
            className="flex-1 text-center py-3 px-5 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
            style={{ background: trad?.color }}
          >
            {trad?.emoji} Explore {holiday.tradition} Texts
          </Link>
          <Link
            href="/calendar"
            className="flex-1 text-center py-3 px-5 rounded-xl font-bold text-[var(--text-secondary)] text-sm bg-white border border-gray-200 hover:border-[var(--gold)] transition-colors"
          >
            ← All Sacred Holidays
          </Link>
        </div>
      </section>
    </div>
  );
}
