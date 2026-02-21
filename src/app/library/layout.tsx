import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Text Library — Read Bible, Quran, Torah, Gita Online Free',
  description: 'Browse sacred texts from 25+ world religions. Read the Bible (KJV), Quran, Torah, Bhagavad Gita, Dhammapada, Guru Granth Sahib, Tao Te Ching, Analects of Confucius, and Zoroastrian Gathas. All free, no account needed.',
  alternates: { canonical: 'https://u-god.com/library' },
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
