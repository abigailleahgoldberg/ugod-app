import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Sacred Texts — Find Verses Across Bible, Quran, Torah & More',
  description: 'Search across Christianity, Islam, Judaism, Buddhism, and Hinduism simultaneously. Find verses about love, peace, forgiveness, wisdom, and any topic across the world\'s sacred texts. Free cross-tradition search.',
  alternates: { canonical: 'https://u-god.com/search' },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
