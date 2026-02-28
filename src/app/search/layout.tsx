import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Text Search — Bible, Quran, Torah, Gita & More',
  description: 'Search 25+ sacred traditions at once. Find verses on love, peace, and wisdom in the Bible, Quran, Torah, Gita, and more. Free cross-tradition search tool.',
  alternates: { canonical: 'https://u-god.com/search' },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
