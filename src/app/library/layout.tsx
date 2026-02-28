import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Text Library — Bible, Quran, Torah, Gita Free',
  description: 'Browse sacred texts from 25+ world religions free. Read the Bible, Quran, Torah, Gita, Dhammapada, Guru Granth Sahib, Tao Te Ching, and more. No account needed.',
  alternates: { canonical: 'https://u-god.com/library' },
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
