import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Verse — A New Sacred Text From a Different Religion Every Day',
  description: 'Get a daily verse rotating through Christianity, Islam, Judaism, Buddhism, and Sikhism. Fresh wisdom from a different world tradition every day. Share with friends. Free.',
  alternates: { canonical: 'https://u-god.com/daily' },
};

export default function DailyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
