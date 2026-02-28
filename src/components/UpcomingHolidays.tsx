import { holidays, calendarTraditions, MONTH_NAMES } from '@/data/holidays';
import Link from 'next/link';

function getUpcomingHolidays(count = 4) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  // Score each holiday by how soon it comes
  const scored = holidays.map(h => {
    let monthDiff = h.month - currentMonth;
    if (monthDiff < 0) monthDiff += 12;
    else if (monthDiff === 0 && h.day < currentDay) monthDiff = 12;
    const dayDiff = monthDiff * 31 + h.day;
    return { ...h, dayDiff };
  });

  return scored
    .sort((a, b) => a.dayDiff - b.dayDiff)
    .slice(0, count);
}

export function UpcomingHolidays() {
  const upcoming = getUpcomingHolidays(4);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-1">Sacred Calendar</p>
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Upcoming Observances</h2>
        </div>
        <Link
          href="/calendar"
          className="text-sm font-semibold text-[var(--gold)] hover:opacity-80 transition-opacity hidden sm:block"
        >
          View all holidays →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcoming.map(h => {
          const trad = calendarTraditions.find(t => t.key === h.traditionKey);
          return (
            <Link
              key={h.slug}
              href={`/holidays/${h.slug}`}
              className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-[var(--gold)]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{h.emoji}</span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: trad?.color }}
                >
                  {MONTH_NAMES[h.month - 1].slice(0, 3)} {h.day}
                </span>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors leading-tight mb-1">
                {h.name}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{trad?.emoji} {trad?.name}</p>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-4 sm:hidden">
        <Link href="/calendar" className="text-sm font-semibold text-[var(--gold)]">
          View all holidays →
        </Link>
      </div>
    </section>
  );
}
