import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Bookmarks — Saved Verses & Reading Progress',
  description: 'View your bookmarked sacred text verses and continue reading where you left off. All stored privately in your browser.',
  robots: { index: false, follow: false },
};

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
