import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Sacred Verse — New World Religion Text Every Day',
  description: 'A new sacred verse daily, rotating through Christianity, Islam, Judaism, Buddhism, and Sikhism. Fresh wisdom from a different world tradition each day. Free.',
  alternates: { canonical: 'https://u-god.com/daily' },
};

export default function DailyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
