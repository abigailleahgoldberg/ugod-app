import { holidays, getHolidaysForMonth, calendarTraditions, MONTH_NAMES } from '@/data/holidays';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Calendar — Religious Holidays From All Traditions',
  description: 'Religious holidays from 17 world traditions — Judaism, Christianity, Islam, Buddhism, Hinduism, Sikhism, Shinto, and more. A complete 12-month sacred calendar.',
  alternates: { canonical: 'https://u-god.com/calendar' },
  openGraph: {
    title: 'Sacred Calendar — All World Religious Holidays | U-God',
    description: 'A 12-month calendar of sacred observances from 17 world traditions.',
  },
};

const DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];

function getDayOfWeek(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getDay();
}

export default function CalendarPage() {
  const currentYear = 2026;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <section className="hero-gradient py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-4 flex justify-center"><svg width="48" height="48" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h16M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-3">
            Sacred Calendar
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
            Religious holidays and sacred observances from 17 world traditions — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {calendarTraditions.slice(0,8).map(t => (
              <span key={t.key} className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                {t.name}
              </span>
            ))}
            <span className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
              +{calendarTraditions.length - 8} more
            </span>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {calendarTraditions.map(t => (
            <Link
              key={t.key}
              href={`/library/${t.key}`}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 hover:border-[var(--gold)] transition-colors bg-white"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
              <span className="text-[var(--text-secondary)]">{t.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 12-Month Calendar Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="space-y-12">
          {MONTH_NAMES.map((monthName, idx) => {
            const monthNum = idx + 1;
            const monthHolidays = getHolidaysForMonth(monthNum);
            const daysInMonth = DAYS_IN_MONTH[idx];
            const firstDay = getDayOfWeek(currentYear, monthNum, 1);

            return (
              <div key={monthNum} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Month Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">{monthName} {currentYear}</h2>
                  <span className="text-sm text-[var(--text-muted)] font-medium">
                    {monthHolidays.length} {monthHolidays.length === 1 ? 'holiday' : 'holidays'}
                  </span>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                      <div key={d} className="text-center text-xs font-bold text-[var(--text-muted)] py-1">{d}</div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells before month start */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-10 sm:h-12" />
                    ))}
                    {/* Day cells */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dayHolidays = monthHolidays.filter(h => h.day === day);
                      const isToday = false;

                      return (
                        <div
                          key={day}
                          className={`relative h-10 sm:h-14 rounded-lg flex flex-col items-center justify-start pt-1 ${dayHolidays.length > 0 ? 'bg-[var(--cream-warm)]' : 'hover:bg-gray-50'} transition-colors`}
                        >
                          <span className={`text-xs sm:text-sm font-medium ${dayHolidays.length > 0 ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'}`}>
                            {day}
                          </span>
                          {dayHolidays.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-0.5 mt-0.5">
                              {dayHolidays.slice(0,3).map(h => {
                                const trad = calendarTraditions.find(t => t.key === h.traditionKey);
                                return (
                                  <Link key={h.slug} href={`/holidays/${h.slug}`} title={h.name}>
                                    <span
                                      className="w-2 h-2 rounded-full block hover:scale-125 transition-transform"
                                      style={{ background: trad?.color || '#999' }}
                                    />
                                  </Link>
                                );
                              })}
                              {dayHolidays.length > 3 && (
                                <span className="text-[9px] text-[var(--text-muted)] leading-none">+{dayHolidays.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Holiday list for month */}
                  {monthHolidays.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                      {monthHolidays.sort((a,b) => a.day - b.day).map(h => {
                        const trad = calendarTraditions.find(t => t.key === h.traditionKey);
                        return (
                          <Link
                            key={h.slug}
                            href={`/holidays/${h.slug}`}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--cream-warm)] transition-colors group"
                          >
                            <div
                              className="w-1 rounded-full flex-shrink-0 mt-1 self-stretch"
                              style={{ background: trad?.color || '#999', minHeight: '20px' }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                                  {h.emoji} {h.name}
                                </span>
                                {h.isLunar && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200 font-medium">lunar</span>
                                )}
                                {h.duration && h.duration > 1 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 font-medium">{h.duration} days</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-[var(--text-muted)]">
                                  {monthName} {h.day}{h.endDay && h.month === h.endMonth ? `–${h.endDay}` : ''} · {trad?.emoji} {trad?.name}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">{h.description}</p>
                            </div>
                            <span className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors flex-shrink-0 text-sm">→</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 text-center">
          <strong>Note on dates:</strong> Lunar-based holidays (marked with "lunar") have approximate Gregorian dates for 2025–2026. Exact dates may vary by one day depending on moon sighting and regional tradition. Always verify with your local religious community.
        </div>
      </section>
    </div>
  );
}
